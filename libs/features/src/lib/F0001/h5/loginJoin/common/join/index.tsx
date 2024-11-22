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
import { useCaptchaContext } from '@nx-next-app/operations'
import {
	CaptchaTypeEnum,
	useGetSiteCurrencyListQuery,
	useLazyAffiliateCheckQuery,
	useLazyGetAffiliateAgentQuery,
	useRegisterRejectClickMutation,
	useSignupMutation,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	MetaPixelTracker,
	OperaPixelTracker,
	getQueryParam,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { isNumber } from 'lodash'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Features, LineRegister, Step1, Step2, Step3, StepBar } from './form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const RegionCloseRegisterModal = dynamic(
	() => import('../../../modal/RegionCloseRegisterModal'),
	{
		ssr: false,
	}
)

const Join = ({ cookies }: IJoinProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router

	const { LANG_GROUPS } = useStaticData()
	const { modal } = useGlobalModal()
	const { getToken, captchaType } = useCaptchaContext()

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

	const [registerRejectClick] = useRegisterRejectClickMutation()

	// TODO 日本語系上限需移除
	const filterSiteCurrencyList = () => {
		// 巴西，韓國，日本 沒有 enums
		// 32 日幣 / 13 人民幣
		const filterCurrency = [32, 13]
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

	const handleSubmitForm = async () => {
		if (initNationality === 'China') {
			return
		}
		// opera and meta pixel tracker
		OperaPixelTracker('register')

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
		MetaPixelTracker(
			'registerSubmit',
			undefined,
			undefined,
			undefined,
			username
		)
		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()

		// 目前只有 nova 需要 google recaptcha，因為 Yashbet 外面沒有包ㄧ層 GReCaptchaProviders
		// 會找不到 executeRecaptcha 壞掉 需要在此排除
		// 中國地區不需驗證
		let reCaptchaToken
		if (captchaType === CaptchaTypeEnum.Number) {
			reCaptchaToken = getValues('reCaptchaToken')
		} else {
			reCaptchaToken = await getToken()
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
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				langId: userLang,
				lineUserId: cookieLineUserId as string,
				reCaptchaToken,
				captchaType,
			}).unwrap()
			setStep(3)
			MetaPixelTracker(
				'CompleteRegistration',
				undefined,
				undefined,
				undefined,
				username
			)
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

	useEffect(() => {
		if (initNationality === 'China') {
			// GA 紀錄
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({
				event: 'China_Register_Blocked',
			})
			// api 紀錄
			registerRejectClick({
				siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
				domain: window.location.origin,
			})
			modal.open(<RegionCloseRegisterModal />)
		}
	}, [initNationality])

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
								siteCurrencyList={siteCurrencyList}
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
