import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import {
	cashierApiUrl,
	IAxiosError,
	IPaymentTopUpCardPayData,
	IPostDepositLoadCardPayReqArgs,
	useGetChannelTopUpCardPayListQuery,
	useLazyCheckDepositSpecialCodeQuery,
	useLazyGetDepositLoadCardPayReqQuery,
} from '@nx-next-app/service'
import { DepositActionModeEnum } from '@nx-next-app/types'
import { isConvert, scrollToTop } from '@nx-next-app/utils'
import { every, find, head, isEmpty } from 'lodash-es'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useDepositContext } from './DepositContext'

export interface ITopUpCardPayForm {
	mode?: number
	amount?: number
	groupName?: string
	channelId?: number
	bonusCode?: string
	promoCode?: string
	minAmount?: number
	maxAmount?: number
	amountList?: number[]
	code?: string
	serial?: string
}

const useTopUpCardForm = ({
	dataSource,
}: {
	dataSource: IPaymentTopUpCardPayData[]
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
		refetchPaymentTopUpCardPayList,
		handleDepositTracker,
	} = useDepositContext()

	const formMethods = useForm<ITopUpCardPayForm>({ mode: 'all' })

	const {
		setValue,
		resetField,
		getValues,
		formState: { isValid },
	} = formMethods

	// * 當 groupId 已選擇才 call api
	const groupId = Number(
		find(dataSource, { groupName: String(queryPaymentName) })?.groupId
	)

	const {
		data: { data: channelTopUpCardPayList } = {},
		isFetching: isGetChannelTopUpCardPayListFetching,
	} = useGetChannelTopUpCardPayListQuery({ groupId }, { skip: !groupId })

	const [
		checkDepositSpecialCode,
		{ isFetching: isCheckDepositSpecialCodeFetching },
	] = useLazyCheckDepositSpecialCodeQuery()

	const [
		postDepositLoadCardPayReq,
		{ isLoading: isPostDepositLoadCardPayReqLoading },
	] = useLazyGetDepositLoadCardPayReqQuery()

	// * 1. 檢查是否有 specialCode，specialCode 與bonusCode 只能擇一
	// * 2. mode = 3，fetch postDepositLoadCardPayReq
	// * 3. mode = 其他，window.open()
	// * 4. savedChecked = true 時記住銀行資訊
	const onTopUpCardPayFormSubmit = async (values: ITopUpCardPayForm) => {
		handleDepositTracker()
		try {
			const {
				mode,
				code,
				serial,
				amount = 0,
				groupName,
				channelId,
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

			const searchParams = bonusCode
				? new URLSearchParams({
						ChannelId: String(channelId),
						Code: String(code),
						Serial: String(serial),
						Amount: String(convertedAmount),
						BonusCode: bonusCode,
				  })
				: new URLSearchParams({
						ChannelId: String(channelId),
						Code: String(code),
						Serial: String(serial),
						Amount: String(convertedAmount),
				  })

			const paramsUrl = searchParams.toString()

			if (mode === DepositActionModeEnum.QrCode) {
				const payload: IPostDepositLoadCardPayReqArgs = {
					langId,
					channelId,
					code,
					serial,
					amount: convertedAmount,
					paramsUrl,
				}
				await postDepositLoadCardPayReq(payload).unwrap()

				modal.info(t('Label_General_Success'))
			} else {
				const baseUrl = `${dbHost}/${langId}/${cashierApiUrl.postDepositLoadCardPayReq}`
				window.open(`${baseUrl}?${paramsUrl}`)
			}

			resetField('amount')
			scrollToTop()
			refetchPaymentTopUpCardPayList()
			if (isDepositLocalStorageSavedChecked) {
				onSavedDepositLocalStorageSavedInfo({
					paymentType: queryPaymentType,
					groupName,
					channelId,
				})
			}
		} catch (error) {
			// * 存款 api 某些情境的錯誤會塞在 rawMessage
			const { rawMessage = 'System Error', message } = error as IAxiosError

			modal.error(rawMessage || message, {
				icon: 'icon icon-bell',
				title: t('Label_General_Information'),
			})
		}
	}

	const loading =
		contextLoading ||
		isGetChannelTopUpCardPayListFetching ||
		isCheckDepositSpecialCodeFetching ||
		isPostDepositLoadCardPayReqLoading

	const debouncedLoading = useDebounce(loading, 50)

	// * 任何選項異動時即時更新 formState
	useEffect(() => {
		// * loading 狀態提前 return
		if (debouncedLoading) return

		// * 如果當前 isDepositLocalStorageSavedChecked = true 及 depositLocalStorageSavedInfo 有值 及 query url (除了 paymentType 之外)需要的 key 皆為空值時給予 local storage 的值

		// * 清空 amount
		resetField('amount')

		const { groupName } =
			find(dataSource, { groupName: String(queryPaymentName) }) ||
			head(dataSource) ||
			{}

		const {
			mode,
			channelId,
			minAmount = 0,
			maxAmount = 0,
			amountList,
		} = find(channelTopUpCardPayList, {
			channelId: Number(queryChannelId),
		}) ||
		head(channelTopUpCardPayList) ||
		{}

		// * 如果 isConvert = true, 畫面上的金額需除 1000 並需要加上 ('000) 的貨幣格式
		const convertMinAmount = minAmount / (isConvert(currencyId) ? 1000 : 1)
		const convertMaxAmount = maxAmount / (isConvert(currencyId) ? 1000 : 1)
		const convertAmountList = amountList?.map(
			value => value / (isConvert(currencyId) ? 1000 : 1)
		)

		setValue('mode', mode)
		setValue('groupName', groupName)
		setValue('channelId', channelId)
		setValue('minAmount', convertMinAmount)
		setValue('maxAmount', convertMaxAmount)
		setValue('amountList', convertAmountList)

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

		push(url, undefined, {
			shallow: true,
		})
	}, [debouncedLoading, queryPaymentType, queryPaymentName, queryChannelId])

	const isFormValid = isValid && !!getValues('amount')

	return {
		formMethods,
		loading,
		isFormValid,
		channelTopUpCardPayList,
		onTopUpCardPayFormSubmit,
	}
}

export { useTopUpCardForm }
