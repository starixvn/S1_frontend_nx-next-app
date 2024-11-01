import { ISelectProps } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AREA_CODE_BY_CURRENCY,
	CURRENCY_TO_LANG_KEY,
	ENV_COOKIE_NAMES,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	paths,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useJoin } from '@nx-next-app/features/F0001/hooks'
import {
	useGetRecaptchaInfoQuery,
	useGetSiteCurrencyListQuery,
	useLazyAffiliateCheckQuery,
	useLazyGetAffiliateAgentQuery,
	useSignupMutation,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	MetaPixelTracker,
	OperaPixelTracker,
	getQueryParam,
	isInApp,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { isNumber } from 'lodash'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { FormProvider, useForm } from 'react-hook-form'
import { Features, LineRegister, Step1, Step2, Step3, StepBar } from './form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router

	const { LANG_GROUPS } = useStaticData()
	const { modal } = useGlobalModal()
	const { data: { data: recaptchaInfoData } = {} } = useGetRecaptchaInfoQuery()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { initNationality } = useJoin()

	const [step, setStep] = useState<number>(1)
	const [currencyOptions, setCurrencyOptions] = useState<
		ISelectProps['options']
	>([])

	const formMethods = useForm()
	const { setError, setValue, getValues, clearErrors, handleSubmit } =
		formMethods

	const affId = getQueryParam(query, 'affId')
	const affCode = getQueryParam(query, 'affCode')

	const urlAffId = affId || cookies['AffId']
	const urlAffCode = affCode || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode
	const cookieLineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]

	const { data: { data: siteCurrencyList = [] } = {} } =
		useGetSiteCurrencyListQuery()
	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [getAffiliateAgent] = useLazyGetAffiliateAgentQuery()
	const [signUp] = useSignupMutation()
	const { executeRecaptcha } = useGoogleReCaptcha()

	// TODO 日本語系上限需移除
	const filterSiteCurrencyList = () => {
		// 巴西，韓國，日本 沒有 enums
		const filterCurrency = [32]
		return siteCurrencyList.filter(
			currencyId => !includes(filterCurrency, currencyId)
		)
	}

	const currencySelectOptions = filterSiteCurrencyList()
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

	const checkLineRegister = () => {
		if (!cookieLineUserId) return

		if (filterSiteCurrencyList().length > 0) {
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
			clearErrors('affiliate')

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
			email,
			formBirthMonth,
			formBirthDay,
			formBirthYear,
			nationality,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
		} = getValues()
		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()

		// 目前只有 nova 需要 google recaptcha，因為 Yashbet 外面沒有包ㄧ層 GReCaptchaProviders
		// 會找不到 executeRecaptcha 壞掉 需要在此排除
		// 中國地區不需驗證
		const reCaptchaAction = 'signup'
		let reCaptchaToken
		if (
			(process.env['NEXT_PUBLIC_SITE_ID'] === '1' &&
				recaptchaInfoData?.country !== 'CN') ||
			!isInApp()
		) {
			if (!executeRecaptcha) return
			reCaptchaToken = await executeRecaptcha(reCaptchaAction)
		}

		// currency & recaptcha & affiliate cannot use form required check
		if (!currencyCheck || !affCodeCheck) return

		const affId = affiliate && urlAffId ? affiliate : null
		const affCode = !urlAffId && affCodeCheck ? affiliate : null

		// use register currency to get langId, if not exist, use default en
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[formCurrencyId] as string].find(
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
				email,
				Birth_d: formBirthDay ?? 0,
				Birth_m: formBirthMonth ?? 0,
				Birth_y: formBirthYear ?? 0,
				nationality: nationality ?? initNationality,
				reCaptchaToken,
				reCaptchaAction,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId: userLang,
				lineUserId: cookieLineUserId as string,
			}).unwrap()
			setStep(3)

			// opera and meta pixel tracker
			OperaPixelTracker('register')
			MetaPixelTracker('registerSubmit')
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

	return (
		<>
			<StepBar step={step} />
			{currencyId === CurrenciesEnum.THB && <LineRegister />}
			<div className='Join'>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						{step === 1 && (
							<Step1
								cookies={cookies}
								siteCurrencyList={filterSiteCurrencyList()}
								setStep={setStep}
								selectCurrency={selectCurrency}
								setCurrencyOptions={setCurrencyOptions}
							/>
						)}
						{step === 2 && (
							<Step2
								// * 如果 Aff Input 有相對應的幣別，則使用 currencyOptions（Aff 過濾的幣別選項）
								currencySelectOptions={
									currencyOptions.length === 0
										? currencySelectOptions
										: currencyOptions
								}
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
