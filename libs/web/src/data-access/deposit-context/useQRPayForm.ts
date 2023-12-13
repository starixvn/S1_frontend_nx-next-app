import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	IDepositMobilePayBankQRModalProps,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import {
	IAxiosError,
	IPaymentQRPayData,
	useGetChannelQrPayListQuery,
	useLazyCheckDepositSpecialCodeQuery,
	usePostDepositLocalPayReqMutation,
} from '@nx-next-app/service'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import { useDepositContext } from './DepositContext'

export interface IQRPayForm {
	amount?: number
	groupName?: string
	channelId?: number
	channelName?: string
	bonusCode?: string
	promoCode?: string
	minAmount?: number
	maxAmount?: number
}

const useQRPayForm = ({
	dataSource,
	onDepositMobilePayBankQRModalCallback,
}: {
	dataSource: IPaymentQRPayData[]
	onDepositMobilePayBankQRModalCallback: (
		props: IDepositMobilePayBankQRModalProps
	) => void
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { modal } = useGlobalModal()
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

	const { loading: contextLoading, refetchPaymentQRPayList } =
		useDepositContext()

	const formMethods = useForm<IQRPayForm>({ mode: 'all' })

	const { setValue, resetField } = formMethods

	// * 當 groupId 已選擇才 call api
	const groupId = Number(
		find(dataSource, { groupName: String(queryPaymentName) })?.groupId
	)

	const {
		data: { data: channelQrPayList } = {},
		isFetching: isGetChannelQrPayListFetching,
	} = useGetChannelQrPayListQuery({ groupId }, { skip: !groupId })

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [
		postDepositLocalPayReq,
		{ isLoading: isPostDepositLocalPayReqLoading },
	] = usePostDepositLocalPayReqMutation()

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. channelId = -1 (假渠道), fetch postDepositLocalPayReq 並打開 QRcode 彈窗
	// * 3. mode = 其他，window.open()
	// * 4. savedChecked = true 時記住銀行資訊
	const onQRPayFormSubmit = async (values: IQRPayForm) => {
		try {
			const {
				amount = 0,
				groupName,
				channelId,
				channelName,
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
				ChannelId: String(channelId),
				Amount: String(convertedAmount),
				BonusCode: bonusCode,
				errorUrl,
			})
			const paramsUrl = searchParams.toString()

			if (
				channelId === -1 // * -1:假渠道
			) {
				const {
					data: { returnUrl },
				} = await postDepositLocalPayReq({
					groupId,
					amount: convertedAmount,
					bonusCode,
				}).unwrap()

				onDepositMobilePayBankQRModalCallback({
					convertedAmount,
					qrUrl: returnUrl,
					channelName,
				})
			} else {
				const baseUrl = `${dbHost}/${langId}/Cashier/DepositReqQRPay`
				window.open(`${baseUrl}?${paramsUrl}`)
			}

			resetField('amount')
			scrollToTop()
			refetchPaymentQRPayList()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					groupName,
					channelId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage, message } = error as IAxiosError

			modal.error(rawMessage || message)
		}
	}

	const loading =
		contextLoading ||
		isGetChannelQrPayListFetching ||
		isCheckDepositSpecialCodeFetching ||
		isPostDepositLocalPayReqLoading

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		if (
			!debouncedLoading &&
			queryPaymentType &&
			isEmpty(depositLocalStorageSavedInfo)
		) {
			// * 清空 amount
			resetField('amount')

			const { groupName } =
				find(dataSource, { groupName: String(queryPaymentName) }) ||
				head(dataSource) ||
				{}

			const {
				channelId,
				channelName,
				minAmount = 0,
				maxAmount = 0,
			} = find(channelQrPayList, { channelId: Number(queryChannelId) }) ||
			head(channelQrPayList) ||
			{}

			// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
			const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
			const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)

			setValue('groupName', groupName)
			setValue('channelId', channelId)
			setValue('channelName', channelName)
			setValue('minAmount', convertMinAmount)
			setValue('maxAmount', convertMaxAmount)

			const url = {
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: groupName,
					channelId,
				},
			}

			push(url, undefined, {
				shallow: true,
			})
		}
	}, [debouncedLoading, queryPaymentType, queryPaymentName])

	// * 初始優先導向 local storage 的值
	useEffectOnce(() => {
		if (!isEmpty(depositLocalStorageSavedInfo)) {
			return
		}
		const { groupName, channelId } = depositLocalStorageSavedInfo

		push(
			{
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: groupName,
					channelId,
				},
			},
			undefined,
			{ shallow: true }
		)
	})

	return {
		formMethods,
		loading: debouncedLoading,
		channelQrPayList,
		onQRPayFormSubmit,
	}
}

export { useQRPayForm }
