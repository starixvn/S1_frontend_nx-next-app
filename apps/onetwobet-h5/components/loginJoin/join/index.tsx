import { ISelectProps } from '@apps/onetwobet-h5/components/common/select'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	CURRENCY_TO_LANG_KEY,
	ENV_COOKIE_NAMES,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	paths,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
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
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { getCookies } from 'cookies-next'
import { isNumber } from 'lodash'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Header } from '../../common'
import Banner from './Banner'
import { JoinForm, LineRegister } from './form'
import JoinSuccessModal from './form/JoinSuccesModal'

export enum JoinMethod {
	'Email' = 'email',
	'Number' = 'number',
}

const Join = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router

	const { LANG_GROUPS } = useStaticData()
	const { modal } = useGlobalModal()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const [currencyOptions, setCurrencyOptions] = useState<
		ISelectProps['options']
	>([])

	const formMethods = useForm()
	const { setError, setValue, getValues, clearErrors, handleSubmit } =
		formMethods

	const affId = getQueryParam(query, 'affId')
	const affCode = getQueryParam(query, 'affCode')

	const cookies = getCookies()

	const urlAffId = affId || cookies['AffId']
	const urlAffCode = affCode || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode
	const cookieLineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]

	const { data: { data: siteCurrencyList = [] } = {} } =
		useGetSiteCurrencyListQuery()
	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [getAffiliateAgent] = useLazyGetAffiliateAgentQuery()
	const [signUp] = useSignupMutation()

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

			// const areaCode = AREA_CODE_BY_CURRENCY[newCurrencyId]

			// if (areaCode) {
			// 	setValue('areaCode', areaCode)
			// } else {
			// 	setValue('areaCode', undefined)
			// }
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
			email,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
		} = getValues()
		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()

		// currency & recaptcha & affiliate cannot use form required check
		if (
			// !reCaptchaToken ||
			// recaptchaInfo?.country === 'CN' ||
			!currencyCheck ||
			!affCodeCheck
		)
			return

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
				affCode: String(affCode),
				affId: String(affId),
				currencyId: formCurrencyId,
				...(joinBy === JoinMethod.Email
					? { email }
					: { areaCode, phoneNo: phone }),
				// reCaptchaToken,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId: userLang,
				lineUserId: cookieLineUserId as string,
			}).unwrap()

			// opera and meta pixel tracker
			OperaPixelTracker('register')
			MetaPixelTracker('registerSubmit')
			modal.open(<JoinSuccessModal />)
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

	const { by: joinBy } = query

	useEffect(() => {
		if (![JoinMethod.Email, JoinMethod.Number].includes(joinBy as JoinMethod)) {
			router.replace({
				pathname: paths.join.root,
				query: { by: JoinMethod.Number },
			})
		}
	}, [joinBy])

	return (
		<>
			<Header className='header' style={{ zIndex: '4' }}>
				<Header.Tag
					title={t('Label_Join_RegisterInSeconds')}
					back={paths.home.root}
				/>
			</Header>
			<main className='main registration'>
				<Banner />
				{currencyId === CurrenciesEnum.THB && <LineRegister />}
				<div className='tab' style={{ textTransform: 'uppercase' }}>
					{/* inner <a /> are for css selectors (a.active) to work */}
					<Link href={`?by=${JoinMethod.Number}`}>
						<a className={joinBy === JoinMethod.Number ? 'active' : ''}>
							{t('Label_Join_ByNumber')}
						</a>
					</Link>
					<Link href={`?by=${JoinMethod.Email}`}>
						<a className={joinBy === JoinMethod.Email ? 'active' : ''}>
							{t('Label_Join_ByEmail')}
						</a>
					</Link>
				</div>
				<div className='Join'>
					<FormProvider {...formMethods}>
						<form onSubmit={handleSubmit(handleSubmitForm)}>
							<JoinForm
								siteCurrencyList={siteCurrencyList}
								selectCurrency={selectCurrency}
								setCurrencyOptions={setCurrencyOptions}
								currencySelectOptions={
									currencyOptions.length === 0
										? currencySelectOptions
										: currencyOptions
								}
							/>
						</form>
					</FormProvider>
				</div>
			</main>
		</>
	)
}

export default Join
