import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import {
	IAxiosError,
	IPaymentAutoDepositData,
	useLazyCheckDepositSpecialCodeQuery,
} from '@nx-next-app/service'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { useDepositContext } from './DepositContext'

interface IAutoDepositForm {
	amount: number
	sysId?: number
	minAmount?: number
	maxAmount?: number
	bonusCode?: string
	promoCode?: string
}

const useAutoDepositForm = ({
	dataSource,
}: {
	dataSource: IPaymentAutoDepositData[]
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { modal } = useGlobalModal()
	const { value: isFirstEffect, toggle: toggleIsFirstEffect } = useBoolean(true)
	const { query, pathname, push } = useRouter()
	const { paymentType: queryPaymentType, sysId: querySysId } = query

	const {
		loading: contextLoading,
		refetchPaymentAutoDepositList,
		handleYuriPurchaseClick,
	} = useDepositContext()

	const formMethods = useForm<IAutoDepositForm>()

	const { setValue, resetField } = formMethods

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSavedDepositLocalStorageSavedInfo,
	} = useDepositSavedLocalStorage()

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. window.open() only
	// * 3. savedChecked = true 時記住銀行資訊
	const onAutoDepositFormSubmit = async (values: IAutoDepositForm) => {
		handleYuriPurchaseClick()
		try {
			const {
				amount = 0,
				sysId,
				bonusCode: originBonusCode = '',
				promoCode,
			} = values

			const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

			let bonusCode: string = originBonusCode
			// * 如果有 promoCode，必須先透過 promoCode 來取得 bonusCode
			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
					specialCode: promoCode,
				}).unwrap()
				if (data?.bonusCode) {
					bonusCode = data?.bonusCode
				}
			}

			const errorUrl = `${dbHost}/404/index_${langId}.html`
			const searchParams = new URLSearchParams({
				SysId: String(sysId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
				errorUrl,
			})
			const paramsUrl = searchParams.toString()

			// * window.open only
			const baseUrl = `${dbHost}/${langId}/Cashier/DepositReqBankAutoChannel`
			window.open(`${baseUrl}?${paramsUrl}`)

			resetField('amount')
			scrollToTop()
			refetchPaymentAutoDepositList()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					sysId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	const loading = isCheckDepositSpecialCodeFetching || contextLoading

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 清空 amount
		resetField('amount')

		const {
			sysId,
			minAmount = 0,
			maxAmount = 0,
		} = find(dataSource, { sysId: Number(querySysId) }) ||
		head(dataSource) ||
		{}

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)

		setValue('sysId', sysId)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				sysId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([queryPaymentType, querySysId])
		if (
			isPrepared &&
			isFirstEffect &&
			every([
				isDepositLocalStorageSavedChecked,
				!isEmpty(depositLocalStorageSavedInfo),
			])
		) {
			url = {
				pathname,
				query: {
					paymentType: queryPaymentType,
					sysId: depositLocalStorageSavedInfo.sysId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, { shallow: true })
	}, [debouncedLoading, queryPaymentType, querySysId])

	return { formMethods, loading: debouncedLoading, onAutoDepositFormSubmit }
}

export { useAutoDepositForm }
