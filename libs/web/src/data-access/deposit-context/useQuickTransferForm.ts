import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import {
	cashierApiUrl,
	IAxiosError,
	IDepositQuickTransferData,
	useLazyCheckDepositSpecialCodeQuery,
} from '@nx-next-app/service'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty } from 'lodash-es'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDepositContext } from './DepositContext'

export interface IQuickTransferForm {
	amount?: number
	channelId?: number
	sysId?: number
	bonusCode?: string
	promoCode?: string
	minAmount?: number
	maxAmount?: number
}

const useQuickTransferForm = ({
	dataSource,
}: {
	dataSource: IDepositQuickTransferData[]
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { modal } = useGlobalModal()
	const { value: isFirstEffect, toggle: toggleIsFirstEffect } = useBoolean(true)
	const {
		query: {
			channelId: queryChannelId,
			paymentType: queryPaymentType,
			sysId: querySysId,
		},
		pathname,
		push,
	} = useRouter()

	const {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSavedDepositLocalStorageSavedInfo,
	} = useDepositSavedLocalStorage()

	const {
		loading: contextLoading,
		refetchDepositQuickTransfer,
		handleDepositTracker,
	} = useDepositContext()

	const formMethods = useForm<IQuickTransferForm>({ mode: 'all' })

	const {
		setValue,
		resetField,
		getValues,
		formState: { isValid },
	} = formMethods

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. window.open()
	// * 3. fetch refetchDepositQuickTransfer
	// * 4. savedChecked = true 時記住銀行資訊
	const onFormSubmit = async (values: IQuickTransferForm) => {
		handleDepositTracker()
		try {
			const {
				amount = 0,
				sysId = '',
				channelId = '',
				bonusCode: originBonusCode = '',
				promoCode = '',
			} = values

			const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

			let bonusCode: string = originBonusCode

			// * 如果有 promoCode，必須先透過 promoCode 來取得 bonusCode
			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					specialCode: promoCode,
				}).unwrap()
				if (data?.bonusCode) {
					bonusCode = data?.bonusCode
				}
			}

			const searchParams = new URLSearchParams({
				ChannelId: String(channelId),
				SysId: String(sysId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
			})

			const paramsUrl = searchParams.toString()
			const baseUrl = `${dbHost}/${langId}/${cashierApiUrl.postDepositReq}`
			window.open(`${baseUrl}?${paramsUrl}`)

			resetField('amount')
			scrollToTop()
			refetchDepositQuickTransfer()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					channelId,
					sysId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	const { supportBanks = [] } =
		find(dataSource, {
			channelId: Number(queryChannelId),
		}) ?? {}

	const loading = contextLoading || isCheckDepositSpecialCodeFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值

		// * 清空 amount
		resetField('amount')

		const {
			channelId,
			minAmount = 0,
			maxAmount = 0,
			supportBanks,
		} = find(dataSource, {
			channelId: Number(queryChannelId),
		}) ||
		head(dataSource) ||
		{}
		const banksInfo =
			find(supportBanks, { sysId: Number(querySysId) }) || head(supportBanks)

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		// * minAmount 與 maxAmount優先使用 banksInfo > dataSource
		const convertMinAmount =
			(banksInfo?.minAmount || minAmount) / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount =
			(banksInfo?.maxAmount || maxAmount) / (isConvert(currencyId) ? 1000 : 1)

		setValue('channelId', channelId)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('sysId', banksInfo?.sysId)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				channelId,
				sysId: banksInfo?.sysId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([queryPaymentType, queryChannelId])
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
					channelId: depositLocalStorageSavedInfo?.channelId,
					sysId: depositLocalStorageSavedInfo?.sysId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, {
			shallow: true,
		})
	}, [debouncedLoading, queryPaymentType, queryChannelId, querySysId])

	const isFormValid = isValid && !!getValues('amount')

	return {
		formMethods,
		loading,
		isFormValid,
		supportBanks,
		onFormSubmit,
	}
}

export { useQuickTransferForm }
