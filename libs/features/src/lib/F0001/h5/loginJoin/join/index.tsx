import Link from 'next/link'
import classNames from 'classnames'
import { isNumber } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import {
	paths,
	ENV_COOKIE_NAMES,
	CURRENCY_TO_LANG_KEY,
	AREA_CODE_BY_CURRENCY,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
} from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISelectProps } from '@nx-next-app/components/H0001'
import {
	useSignupMutation,
	useGetRecaptchaInfoQuery,
	useLazyAffiliateCheckQuery,
	useGetSiteCurrencyListQuery,
	useLazyGetAffiliateAgentQuery,
} from '@nx-next-app/service'
import { Step1, Step2, Step3, StepBar, Features, LineRegister } from './form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router

	const { LANG_GROUPS } = useStaticData()
	const { modal } = useGlobalModal()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const [step, setStep] = useState<number>(1)

	const formMethods = useForm()
	const { setError, setValue, getValues, clearErrors, handleSubmit } =
		formMethods

	const urlAffId = query['AffId'] || cookies['AffId']
	const urlAffCode = query['AffCode'] || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode
	const cookieLineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]

	const { data: { data: siteCurrencyList = [] } = {} } =
		useGetSiteCurrencyListQuery()
	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [getAffiliateAgent] = useLazyGetAffiliateAgentQuery()
	const [signUp] = useSignupMutation()

	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()

	const checkLineRegister = () => {
		if (!cookieLineUserId) return

		if (siteCurrencyList.length > 0) {
			selectCurrency(CurrenciesEnum.THB)
		}
	}

	const checkUrlAffiliate = async () => {
		if (!urlAffiliate) return

		try {
			if (urlAffId) {
				const {
					data: { currencyId },
				} = await getAffiliateAgent({ affId: urlAffId as string }).unwrap()

				if (currencyId) {
					selectCurrency(currencyId)
					setValue('affiliate', urlAffId)
				}
			} else if (urlAffCode) {
				const { errorCode } = await affiliateCheck({
					affCode: urlAffCode as string,
				}).unwrap()

				if (errorCode === 0) {
					setValue('affiliate', urlAffCode)
				}
			}
		} catch (error) {
			// error
		}
	}

	const selectCurrency = (newCurrencyId: ISelectProps['value']) => {
		const formCurrencyId = getValues('currencyId')

		if (isNumber(newCurrencyId) && newCurrencyId !== formCurrencyId) {
			setValue('currencyId', newCurrencyId)
			clearErrors('currencyId')

			const areaCode = AREA_CODE_BY_CURRENCY[newCurrencyId]

			if (areaCode) {
				setValue('areaCode', areaCode)
			} else {
				setValue('areaCode', undefined)
			}

			// reset phone input
			setValue('phone', '')
			clearErrors('phone')
		}
	}

	const checkAffiliate = async () => {
		const formAffiliate = getValues('affiliate')
		if (!formAffiliate || urlAffiliate) return true

		// check affiliate is qualified from api
		try {
			await affiliateCheck({ affCode: formAffiliate }).unwrap()
			return true
		} catch (error) {
			// error
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong') || '',
			})
			return false
		}
	}

	const checkCurrency = () => {
		const formCurrencyId = getValues('currencyId')

		if (!formCurrencyId) {
			setError('currencyId', {
				type: 'required',
				message: t('Label_Join_RemindPrefferedCurrency') || '',
			})

			// return for submit checking
			return false
		}

		clearErrors('currencyId')
		return true
	}

	const getBlackbox = async () => {
		let blackbox = ''
		if (
			typeof window !== undefined &&
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			typeof (window as any).IGLOO.getBlackbox === 'function'
		) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result = await (window as any).IGLOO.getBlackbox()
				blackbox = result?.blackbox || ''
			} catch (error) {
				// error
			}
		}

		return blackbox
	}

	const handleSubmitForm = async () => {
		const {
			username,
			password,
			realName,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
			reCaptchaToken,
		} = getValues()

		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()

		// currency & recaptcha & affiliate cannot use form required check
		if (
			!reCaptchaToken ||
			recaptchaInfo?.country === 'CN' ||
			!currencyCheck ||
			!affCodeCheck
		)
			return

		const affId = affiliate && urlAffId ? affiliate : null
		const affCode = !urlAffId && affCodeCheck ? affiliate : null

		// use register currency to get langId, if not exist, use default en
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[currencyId] as string].find(
				({ value }) => value === langId
			)?.value ?? 'en'

		const blackbox = await getBlackbox()

		try {
			await signUp({
				// 因 cookies 有機會是 string[] 導致錯誤
				affCode: affCode as string,
				affId: affId as string,
				areaCode,
				currencyId: formCurrencyId,
				phoneNo: phone,
				realName,
				reCaptchaToken,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId,
				lineUserId: cookieLineUserId as string,
			}).unwrap()

			setStep(3)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	useEffect(() => {
		checkUrlAffiliate()
	}, [])

	useEffect(() => {
		checkLineRegister()
	}, [siteCurrencyList])

	const currencySelectOptions = siteCurrencyList
		.filter(currencyId => {
			const affiliate = getValues('affiliate')
			const formCurrencyId = getValues('currencyId')

			// If affId qualified, only show currencyId from api in select
			return urlAffId && affiliate ? currencyId === formCurrencyId : true
		})
		.map(currencyId => ({
			value: currencyId,
			label: t(`Label_General_Currency_${currencyId}`),
			prefixOptionIcon: (
				<div
					className={classNames(
						'flag',
						FLAG_PREFIX_ICON_BY_CURRENCIES[currencyId]
					)}
				/>
			),
		}))

	return (
		<>
			<StepBar step={step} />
			{currencyId === CurrenciesEnum.THB && <LineRegister />}
			<div className='Join'>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						{step === 1 && <Step1 cookies={cookies} setStep={setStep} />}
						{step === 2 && (
							<Step2
								currencySelectOptions={currencySelectOptions}
								selectCurrency={selectCurrency}
							/>
						)}
					</form>
				</FormProvider>
				{step === 3 && <Step3 />}
				<Link href={paths.home.root}>
					<a>
						<div className='visit'>
							{t('Label_Join_IWouldLikeToVisit')}
							<i className='icon icon-visit' />
						</div>
					</a>
				</Link>
			</div>
			{step !== 3 && <Features />}
		</>
	)
}

export default Join
