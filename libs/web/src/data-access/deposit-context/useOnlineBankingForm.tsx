import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useAuth,
	IDepositQRCodeModalProps,
	useDepositSavedLocalStorage,
} from '@nx-next-app/data-access'
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import {
	IPaymentOnlineBankingData,
	useGetPaymentBankTransferListQuery,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositOnlineBankingReqInfoQuery,
} from '@nx-next-app/service'
import { DepositActionModeEnum } from '@nx-next-app/types'
import { find, head, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { useDepositContext } from './DepositContext'

export interface IOnlineBankingForm {
	amount?: number
	channelId?: number
	maxAmount?: number
	minAmount?: number
	mode?: DepositActionModeEnum
	payId?: number
	payName?: string
	sysId?: number
	bankId?: number
	bonusCode?: string
	promoCode?: string
	selBank?: boolean
	bankLogo?: string
}

const useOnlineBankingForm = ({
	dataSource,
	onQRCodeModalCallback,
}: {
	dataSource: IPaymentOnlineBankingData[]
	onQRCodeModalCallback: (values: IDepositQRCodeModalProps) => void
}) => {
	const {
		userInfo: { langId, currencyId },
		dbHost,
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		query: {
			paymentType: queryPaymentType,
			paymentName: queryPaymentName,
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

	const formMethods = useForm<IOnlineBankingForm>({
		mode: 'all',
	})

	const { setValue, resetField, getValues } = formMethods

	const { loading: contextLoading, refetchPaymentOnlineBankingList } =
		useDepositContext()

	const {
		data: { data: paymentBankTransferList = [] } = {},
		isFetching: isGetPaymentBankTransferListFetching,
	} = useGetPaymentBankTransferListQuery()

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [
		getDepositOnlineBankingReqInfo,
		{ isFetching: isGetDepositOnlineBankingReqInfoFetching },
	] = useLazyGetDepositOnlineBankingReqInfoQuery()

	const loading =
		contextLoading ||
		isGetPaymentBankTransferListFetching ||
		isCheckDepositSpecialCodeFetching ||
		isGetDepositOnlineBankingReqInfoFetching

	const debouncedLoading = useDebounce(loading, 50)

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. mode = 3，開啟 QR CODE modal
	// * 3. mode = 其他，window.open()
	// * 4. savedChecked = true 時記住銀行資訊
	const onOnlineBankingFormSubmit = (values: IOnlineBankingForm) => {
		const {
			mode,
			sysId = 0,
			payId,
			channelId,
			amount = 0,
			bonusCode: originBonusCode = '',
			promoCode,
			payName,
		} = values

		const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

		const submit = async () => {
			try {
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
					sysId: String(sysId),
					payId: String(payId),
					ChannelId: String(channelId),
					Amount: String(convertedAmount),
					BonusCode: bonusCode,
					errorUrl,
				})
				const paramsUrl = searchParams.toString()

				if (mode === DepositActionModeEnum.QrCode) {
					const { data: depositOnlineBankingReqInfo } =
						await getDepositOnlineBankingReqInfo({ langId, paramsUrl }).unwrap()

					onQRCodeModalCallback({
						title: t('LabelDepositType1'),
						convertedAmount,
						info: depositOnlineBankingReqInfo,
					})
				} else {
					const baseUrl = `${dbHost}/${langId}/Cashier/DepositReqOnlineBanking`
					window.open(`${baseUrl}?${paramsUrl}`)
				}

				resetField('amount')
				scrollToTop()
				refetchPaymentOnlineBankingList()
				if (isDepositLocalStorageSavedChecked) {
					onSavedDepositLocalStorageSavedInfo({
						paymentType: queryPaymentType,
						payName,
						sysId,
					})
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		submit()
	}

	// * 任何選項異動時即時更新 form state
	useEffect(() => {
		if (
			!debouncedLoading &&
			queryPaymentType &&
			isEmpty(depositLocalStorageSavedInfo)
		) {
			// * 清空 amount
			resetField('amount')

			const {
				payName,
				payId,
				channelId,
				minAmount = 0,
				maxAmount = 0,
				mode,
				selBank = false,
			} = find(dataSource, { payName: String(queryPaymentName) }) ||
			head(dataSource) ||
			{}

			const {
				bankLogo,
				sysId,
				minAmount: selBankMinAmount = 0,
				maxAmount: selBankMaxAmount = 0,
			} = find(paymentBankTransferList, { sysId: Number(querySysId) }) ||
			head(paymentBankTransferList) ||
			{}

			// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
			const convertMinAmount =
				(selBank ? selBankMinAmount : minAmount) /
				(isConvert(currencyId) ? 1000 : 1)
			const convertMaxAmount =
				(selBank ? selBankMaxAmount : maxAmount) /
				(isConvert(currencyId) ? 1000 : 1)

			setValue('payName', payName)
			setValue('payId', payId)
			setValue('sysId', sysId)
			setValue('channelId', channelId)
			setValue('minAmount', convertMinAmount)
			setValue('maxAmount', convertMaxAmount)
			setValue('mode', mode)
			setValue('selBank', selBank)
			setValue('bankLogo', bankLogo)

			const url = {
				pathname,
				query: {
					paymentType: queryPaymentType,
					paymentName: payName,
					sysId,
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
		const { payName, sysId } = depositLocalStorageSavedInfo

		push(
			{
				pathname,
				query: { paymentType: queryPaymentType, paymentName: payName, sysId },
			},
			undefined,
			{ shallow: true }
		)
	})

	return {
		formMethods,
		loading: debouncedLoading,
		selBank: getValues('selBank'),
		paymentBankTransferList,
		onOnlineBankingFormSubmit,
	}
}

export { useOnlineBankingForm }
