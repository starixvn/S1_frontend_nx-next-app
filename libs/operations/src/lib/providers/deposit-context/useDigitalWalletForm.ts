import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import {
	IAxiosError,
	IPayInfoDigitalWalletData,
	cashierApiUrl,
	useLazyCheckDepositSpecialCodeQuery,
} from '@nx-next-app/service'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { useDepositContext } from './DepositContext'

export interface IDigitalWalletForm {
	mode?: number
	amount?: number
	channelId?: number
	channelName?: string
	groupId?: number
	groupName?: string
	bonusCode?: string
	promoCode?: string
	minAmount?: number
	maxAmount?: number
	amountRule?: number
}

const useDigitalWalletForm = ({
	dataSource,
}: {
	dataSource: IPayInfoDigitalWalletData[]
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { modal } = useGlobalModal()

	const { value: isFirstEffect, toggle: toggleIsFirstEffect } = useBoolean(true)
	const {
		query: { paymentType: queryPaymentType, groupId: queryGroupId },
		pathname,
		push,
	} = useRouter()

	const {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSavedDepositLocalStorageSavedInfo,
	} = useDepositSavedLocalStorage()

	const { supportChannels = [] } =
		find(dataSource, { groupId: Number(queryGroupId) }) ||
		head(dataSource) ||
		{}

	const formMethods = useForm<IDigitalWalletForm>({
		mode: 'all',
	})

	const { setValue, resetField } = formMethods

	const {
		loading: contextLoading,
		refetchDepositDigitalWallet,
		handleDepositTracker,
	} = useDepositContext()

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const loading = contextLoading || isCheckDepositSpecialCodeFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. mode = 3，開啟 QR CODE modal
	// * 3. mode = 其他，window.open()
	// * 4. savedChecked = true 時記住銀行資訊
	const onDigitalWalletFormSubmit = async (values: IDigitalWalletForm) => {
		handleDepositTracker()
		try {
			const {
				amount = 0,
				channelId,
				bonusCode: originBonusCode = '',
				promoCode = '',
				groupId,
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
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
			})

			const paramsUrl = searchParams.toString()
			const baseUrl = `${dbHost}/${langId}/${cashierApiUrl.postDepositReq}`
			window.open(`${baseUrl}?${paramsUrl}`)

			resetField('amount')
			scrollToTop()
			refetchDepositDigitalWallet()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					groupId,
					channelId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值

		// * 清空 amount
		resetField('amount')

		const {
			groupId,
			groupName,
			minAmount = 0,
			maxAmount = 0,
			supportChannels,
		} = find(dataSource, { groupId: Number(queryGroupId) }) ||
		head(dataSource) ||
		{}

		const channelInfo =
			find(supportChannels, { groupId: Number(queryGroupId) }) ||
			head(supportChannels)

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount =
			(channelInfo?.minAmount || minAmount) / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount =
			(channelInfo?.maxAmount || maxAmount) / (isConvert(currencyId) ? 1000 : 1)

		setValue('groupId', groupId)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('groupName', groupName)
		setValue('channelId', channelInfo?.channelId)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				groupId,
				channelId: channelInfo?.channelId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([queryPaymentType, queryGroupId])
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
					groupId: depositLocalStorageSavedInfo?.groupId,
					channelId: depositLocalStorageSavedInfo?.channelId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, {
			shallow: true,
		})
	}, [debouncedLoading, queryPaymentType, queryGroupId])

	return {
		formMethods,
		loading: debouncedLoading,
		supportChannels,
		onDigitalWalletFormSubmit,
	}
}

export { useDigitalWalletForm }
