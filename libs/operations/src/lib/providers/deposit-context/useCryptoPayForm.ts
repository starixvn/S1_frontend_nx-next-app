import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IDepositQRCodeModalProps,
	useAuth,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import {
	IAxiosError,
	IPaymentCryptoPayData,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositReqCryptoLocalPayInfoQuery,
	useLazyGetDepositReqCryptoPayInfoQuery,
} from '@nx-next-app/service'
import { DepositActionModeEnum } from '@nx-next-app/types'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty, reduce } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { useDepositContext } from './DepositContext'

interface ICryptoPaymentData {
	groupName: string
	displayGroupName: string
	maxAmount: number
	minAmount: number
}

export interface ICryptoForm {
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

const useCryptoPayForm = ({
	dataSource,
	onQRCodeModalCallback,
}: {
	dataSource: IPaymentCryptoPayData[]
	onQRCodeModalCallback: (props: IDepositQRCodeModalProps) => void
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { value: isFirstEffect, toggle: toggleIsFirstEffect } = useBoolean(true)
	const {
		query: {
			paymentType: queryPaymentType,
			paymentName: queryPaymentName,
			channelId: queryChannelId,
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
		refetchPaymentCryptoPayList,
		handleDepositTracker,
	} = useDepositContext()

	const formMethods = useForm<ICryptoForm>({ mode: 'all' })

	const { setValue, resetField } = formMethods

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [getDepositReqCryptoPayInfo] = useLazyGetDepositReqCryptoPayInfoQuery()

	const [
		getDepositReqCryptoLocalPayInfo,
		{ isFetching: isGetDepositReqCryptoLocalPayInfoFetching },
	] = useLazyGetDepositReqCryptoLocalPayInfoQuery()

	// * 從 前端 自定義的 payment 列表：從 Crypto Payment Method 中找可填金額的最大值與最小值範圍
	const cryptoPaymentList: ICryptoPaymentData[] = useMemo(() => {
		const newData = reduce(
			dataSource,
			(acc, cur) => {
				const result = { ...acc }
				const { groupName, displayGroupName, maxAmount, minAmount } = cur

				result[groupName] = result[groupName]
					? {
							groupName,
							displayGroupName,
							maxAmount: Math.max(maxAmount, result[groupName]?.maxAmount),
							minAmount: Math.min(minAmount, result[groupName]?.minAmount),
					  }
					: { groupName, minAmount, maxAmount, displayGroupName }
				return result
			},
			{} as { [key: string]: ICryptoPaymentData }
		)
		return Object.values(newData)
	}, [])

	// * 從原始資料過濾出來的 cryptoChannelList
	const cryptoChannelList: IPaymentCryptoPayData[] = useMemo(() => {
		return dataSource.filter(({ groupName }) => groupName === queryPaymentName)
	}, [queryPaymentName])

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. channelId = -1 (假渠道), fetch getDepositReqCryptoLocalPayInfo 並打開 QRcode 彈窗
	// * 3. mode = 3，開啟 QR CODE modal
	// * 4. mode = 其他，window.open()
	// * 5. savedChecked = true 時記住銀行資訊
	const onCryptoPayFormSubmit = async (values: ICryptoForm) => {
		handleDepositTracker()
		try {
			const {
				mode,
				amount = 0,
				channelId,
				groupId,
				groupName,
				bonusCode: originBonusCode = '',
				promoCode,
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

			const errorUrl = `${dbHost}/404/index_${langId}.html`

			const searchParams = new URLSearchParams({
				ChannelId: String(channelId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
				errorUrl,
			})
			const paramsUrl = searchParams.toString()

			if (
				groupId === -1 // * -1:假渠道
			) {
				const { data: depositReqCryptoLocalPayInfo } =
					await getDepositReqCryptoLocalPayInfo({ langId, paramsUrl }).unwrap()

				onQRCodeModalCallback({
					title: t('Label_DepositType8'),
					convertedAmount,
					info: depositReqCryptoLocalPayInfo,
				})
			} else if (mode === DepositActionModeEnum.QrCode) {
				const { data: depositReqCryptoPayInfo } =
					await getDepositReqCryptoPayInfo({ langId, paramsUrl }).unwrap()

				onQRCodeModalCallback({
					title: t('Label_DepositType4'),
					convertedAmount,
					info: depositReqCryptoPayInfo,
				})

				resetField('amount')
				scrollToTop()
				refetchPaymentCryptoPayList()
				if (isDepositLocalStorageSavedChecked) {
					onSavedDepositLocalStorageSavedInfo({
						paymentType: queryPaymentType,
						groupName,
						channelId,
					})
				}
			} else {
				const baseUrl = `${dbHost}/${langId}/Cashier/DepositReqCryptoPay`
				window.open(`${baseUrl}?${paramsUrl}`)
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	const loading =
		contextLoading ||
		isCheckDepositSpecialCodeFetching ||
		isGetDepositReqCryptoLocalPayInfoFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 清空 amount
		resetField('amount')

		const { mode, groupName } =
			find(dataSource, { groupName: String(queryPaymentName) }) ||
			head(dataSource) ||
			{}

		const {
			channelId,
			groupId,
			minAmount = 0,
			maxAmount = 0,
			amountRule,
			channelName,
		} = find(cryptoChannelList, { channelId: Number(queryChannelId) }) ||
		head(cryptoChannelList) ||
		{}

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)

		setValue('mode', mode)
		setValue('groupId', groupId)
		setValue('groupName', groupName)
		setValue('channelId', channelId)
		setValue('channelName', channelName)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('amountRule', amountRule)

		let url = {
			pathname,
			query: {
				paymentType: queryPaymentType,
				paymentName: groupName,
				channelId,
			},
		}

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值
		// * isFirstEffect: 設定過一次後將 isFirstEffect 由 true 變為 false
		// * isPrepared: url 都有值，才算準備好，如果進到 localStorage 裡要把初始值蓋過去
		const isPrepared = every([
			queryPaymentType,
			queryPaymentName,
			queryChannelId,
		])
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
					paymentName: depositLocalStorageSavedInfo.groupName,
					channelId: depositLocalStorageSavedInfo.channelId,
				},
			}
			toggleIsFirstEffect()
		}

		push(url, undefined, { shallow: true })
	}, [debouncedLoading, queryPaymentType, queryPaymentName, queryChannelId])

	return {
		formMethods,
		loading: debouncedLoading,
		cryptoPaymentList,
		cryptoChannelList,
		onCryptoPayFormSubmit,
	}
}

export { useCryptoPayForm }
