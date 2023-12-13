import { useEffect } from 'react'
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import {
	IAxiosError,
	IPaymentBankTransferData,
	useGetBankAccountInfoQuery,
	useGetCustBankInfoQuery,
	useLazyCheckDepositSpecialCodeQuery,
	usePostDepositBankTransferReqMutation,
	useSetDepositPromotionQueueMutation,
	useUploadReceiptMutation,
} from '@nx-next-app/service'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { DepositChannelIdEnum, SelectOptionType } from '@nx-next-app/types'
import { every, find, head, includes, isEmpty } from 'lodash-es'
import { useAuth, useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useDepositContext } from './DepositContext'

export interface IBankTransferForm {
	amount: number
	sysId?: number
	bankId?: number
	fromAccountNum?: string
	fromChannel?: string
	fromSysId?: number
	channelId?: string
	// * receipt: 連同建單後回傳的 TransId 一起送 UploadReceipt
	receipt?: string
	// * bonusCode | promoCode: 連同建單後回傳的 TransId 一起送 SetDepositPromotionQueue
	bonusCode?: string
	promoCode?: string
	qrCodeUrl?: string
	minAmount?: number
	maxAmount?: number
	canSubmit?: boolean
}

const useDepositBankTransferForm = ({
	dataSource,
}: {
	dataSource: IPaymentBankTransferData[]
}) => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const { query, pathname, push } = useRouter()
	const { paymentType: queryPaymentType, sysId: querySysId } = query

	const {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSavedDepositLocalStorageSavedInfo,
	} = useDepositSavedLocalStorage()

	const formMethods = useForm<IBankTransferForm>()

	const {
		watch,
		setValue,
		resetField,
		reset,
		formState: { isValid },
	} = formMethods

	const watchFromChannel = watch('fromChannel')
	const watchReceipt = watch('receipt')
	const watchFromAccountNum = watch('fromAccountNum')

	const { loading: contextLoading, refetchPaymentBankTransferList } =
		useDepositContext()

	const { data: { data: bankAccountInfo } = {} } = useGetBankAccountInfoQuery(
		{
			sysId: Number(querySysId),
		},
		{ skip: !querySysId }
	)

	const { data: { data: custBankInfo } = {} } = useGetCustBankInfoQuery()

	const [
		postDepositBankTransferReq,
		{ isLoading: isPostDepositReqWireTransferLoading },
	] = usePostDepositBankTransferReqMutation()

	const [uploadReceipt, { isLoading: isUploadReceiptLoading }] =
		useUploadReceiptMutation()

	const [
		setDepositPromotionQueue,
		{ isLoading: isSetDepositPromotionQueueLoading },
	] = useSetDepositPromotionQueueMutation()

	const [checkDepositSpecialCode] = useLazyCheckDepositSpecialCodeQuery()

	// * 格式化成符合 SelectOptionType 的型態
	const bankInfoDetailOptions: SelectOptionType[] = (
		custBankInfo?.bankInfoDetail || []
	).map(({ bankName, sysId }) => ({
		label: bankName,
		value: sysId,
	}))

	const loading =
		contextLoading ||
		isPostDepositReqWireTransferLoading ||
		isUploadReceiptLoading ||
		isSetDepositPromotionQueueLoading

	const debouncedLoading = useDebounce(loading, 50)

	const isFormValid =
		isValid &&
		every([
			watchFromChannel,
			!includes(
				[DepositChannelIdEnum.ATM, DepositChannelIdEnum.OnlineBanking],
				Number(watchFromChannel)
			) || watchFromAccountNum,
			watchReceipt,
		])

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. 建立單據取得 transId
	// * 3. 透過 transId 上傳圖片以及 bonusCode
	// * 4. savedChecked = true 時記住銀行資訊
	const onBankTransferFormSubmit = async (values: IBankTransferForm) => {
		try {
			const {
				amount,
				sysId,
				fromChannel,
				fromSysId,
				fromAccountNum,
				bankId,
				bonusCode: originBonusCode,
				promoCode,
				receipt,
			} = values
			let bonusCode = originBonusCode
			const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

			if (promoCode) {
				const { data: { data } = {} } = await checkDepositSpecialCode({
					deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
					specialCode: promoCode,
				})

				bonusCode = data?.bonusCode
			}

			const { data: { transId } = {} } = await postDepositBankTransferReq({
				amount: convertedAmount,
				sysId,
				fromChannel: Number(fromChannel),
				fromSysId,
				fromAccountNum,
				bankId: Number(bankId),
				hasPromotion: Boolean(bonusCode),
			}).unwrap()

			if (transId) {
				await Promise.all([
					receipt && uploadReceipt({ transId, receipt }),
					bonusCode &&
						setDepositPromotionQueue({
							langId,
							transId,
							bonusCode,
							deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
						}),
				])
			}

			resetField('amount')
			resetField('receipt')
			scrollToTop()
			refetchPaymentBankTransferList()
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

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		if (
			!debouncedLoading &&
			queryPaymentType &&
			isEmpty(depositLocalStorageSavedInfo)
		) {
			// * 清空 amount、receipt
			reset({ amount: NaN, receipt: undefined })

			const {
				sysId,
				bankId,
				minAmount = 0,
				maxAmount = 0,
				qrCodeUrl,
				canSubmit,
			} = find(dataSource, {
				sysId: Number(querySysId),
			}) ||
			head(dataSource) ||
			{}

			// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
			const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
			const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)

			setValue('sysId', sysId)
			setValue('bankId', bankId)
			setValue('qrCodeUrl', qrCodeUrl)
			setValue('minAmount', convertMinAmount)
			setValue('maxAmount', convertMaxAmount)
			setValue('canSubmit', canSubmit)

			if (sysId) {
				push(
					{ pathname, query: { paymentType: queryPaymentType, sysId } },
					undefined,
					{ shallow: true }
				)
			}
		}
	}, [debouncedLoading, queryPaymentType, querySysId])

	// * 初始優先導向 local storage 的值
	useEffectOnce(() => {
		if (!isEmpty(depositLocalStorageSavedInfo)) {
			return
		}
		const { sysId } = depositLocalStorageSavedInfo

		push(
			{ pathname, query: { paymentType: queryPaymentType, sysId } },
			undefined,
			{ shallow: true }
		)
	})

	return {
		formMethods,
		loading: debouncedLoading,
		isFormValid,
		bankAccountInfo,
		bankInfoDetail: custBankInfo?.bankInfoDetail || [],
		bankInfoDetailOptions,
		onBankTransferFormSubmit,
	}
}

export { useDepositBankTransferForm }
