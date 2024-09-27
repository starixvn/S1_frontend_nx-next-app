import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	IAxiosError,
	IGetCustSpecificBonusArgs,
	IPromotionData,
	updatePromotionData,
	useGetPromotionListV3Query,
	useGetSpecialPromotionListQuery,
	useLazyGetCustSpecificBonusQuery,
	useSetSpecialCodeMutation,
} from '@nx-next-app/service'
import { useAppDispatch } from '@nx-next-app/store'
import {
	PromotionCategoryIdEnum,
	PromotionFilterEnum,
	PromotionTypeEnum,
	PromotionWalletType,
} from '@nx-next-app/types'
import dayjs from 'dayjs'
import { filter, includes, isUndefined, trim } from 'lodash-es'
import { useRouter } from 'next/router'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'

interface PromotionContextInterface {
	persistPromotionData: IPromotionData[]
	PROMOTION_SELECT_OPTIONS: {
		displayKey: string
		value: PromotionFilterEnum
		needLogin: boolean
	}[]
	promotionForm: UseFormReturn<{
		specialCode: string
		amount: string
	}>
	promotionData: IPromotionData[]
	activeFilterType: PromotionFilterEnum
	onChangeActiveFilterType: (type: PromotionFilterEnum) => void
	onSetSpecialCode: ({
		specialCode,
		messageCallBack,
	}: {
		specialCode: string
		messageCallBack: (message: string) => void
	}) => Promise<void>
	onOpenPromotionDetail: (bonusCode: string) => void
	onUpdatePromotionData: (props: IGetCustSpecificBonusArgs) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PromotionContext = createContext<PromotionContextInterface>(null!)

interface IPromotionProviderProps {
	children: ReactNode
	persistPromotionData: IPromotionData[]
	PROMOTION_SELECT_OPTIONS: {
		displayKey: string
		value: PromotionFilterEnum
		needLogin: boolean
	}[]
	onOpenPromotionDetail: (bonusCode: string) => void
	onError: (message: string) => void
}

export const PromotionProvider = ({
	children,
	persistPromotionData,
	PROMOTION_SELECT_OPTIONS,
	onOpenPromotionDetail,
	onError,
}: IPromotionProviderProps) => {
	const {
		userInfo: { langId, currencyId },
		auth: { isLogin },
	} = useAuth()
	const dispatch = useAppDispatch()
	const { query, replace } = useRouter()

	// * 不管 query 是大寫小寫都要吃得到 bonusCode 並打開彈窗
	const { BonusCode: queryBonus, bonusCode: queryBonusCode } = query

	const [activeFilterType, setActiveFilterType] = useState<PromotionFilterEnum>(
		PromotionFilterEnum.All
	)

	const promotionForm = useForm<{
		specialCode: string
		amount: string
	}>()

	const { data: { data: promotionList = persistPromotionData } = {} } =
		useGetPromotionListV3Query(
			{ langId, currencyId },
			{
				pollingInterval: 120000,
				refetchOnMountOrArgChange: true,
			}
		)

	const [getCustSpecificBonus] = useLazyGetCustSpecificBonusQuery()

	const [setSpecialCode] = useSetSpecialCodeMutation()

	const { data: { data: specialPromotionList = [] } = {} } =
		useGetSpecialPromotionListQuery({ langId }, { skip: !isLogin })

	const onUpdatePromotionData = async ({
		bonusCode,
		tpId,
		promoCategoryId,
	}: IGetCustSpecificBonusArgs) => {
		try {
			const { data: custSpecificBonus } = await getCustSpecificBonus({
				bonusCode,
				tpId,
				promoCategoryId,
			}).unwrap()

			dispatch(
				updatePromotionData({
					langId,
					currencyId,
					bonusCode,
					bonusData: custSpecificBonus,
				})
			)
		} catch (error) {
			onError((error as Error).message)
		}
	}

	const onChangeActiveFilterType = (type: PromotionFilterEnum) => {
		if (type !== activeFilterType) {
			setActiveFilterType(type)
			promotionForm.setValue('specialCode', '')
		}
	}

	const onSetSpecialCode = async ({
		specialCode,
		messageCallBack,
	}: {
		specialCode: string

		messageCallBack: (message: string) => void
	}) => {
		try {
			await setSpecialCode({
				langId,
				specialCode: trim(specialCode),
			}).unwrap()
		} catch (error) {
			messageCallBack && messageCallBack((error as IAxiosError).message)
		}

		// * 清除 promo code
		promotionForm.reset()
	}

	const originPromotionData =
		activeFilterType === PromotionFilterEnum.PromoCode
			? specialPromotionList
			: promotionList

	const promotionData = originPromotionData
		// * 過濾掉已過期的 promotion
		.filter(({ isJoin, promotionType, custExpiryTime, periodTo }) =>
			isJoin &&
			!includes(
				[PromotionTypeEnum.Rebate, PromotionTypeEnum.Cashback],
				promotionType
			)
				? dayjs(custExpiryTime).isAfter(dayjs())
				: dayjs(dayjs.unix(periodTo)).isAfter(dayjs())
		)
		// * 根據選擇的 tab 過濾出相對應的 promotion 資料
		.filter(({ promotionType, categoryId, walletType }) => {
			let bol = false

			switch (activeFilterType) {
				case PromotionFilterEnum.All:
					bol = true
					break

				case PromotionFilterEnum.NewMember:
					bol = includes(
						[PromotionTypeEnum.FirstDeposit, PromotionTypeEnum.WalletBonus],
						promotionType
					)

					break

				case PromotionFilterEnum.Special:
					bol = includes([PromotionTypeEnum.SpecialBonus], promotionType)
					break

				case PromotionFilterEnum.SportBook:
					bol = includes(
						[PromotionCategoryIdEnum.SabaSports, PromotionCategoryIdEnum.SBSW],
						categoryId
					)
					break

				case PromotionFilterEnum.Casino:
					bol =
						categoryId === PromotionCategoryIdEnum.PtLiveCasino ||
						(walletType === PromotionWalletType.Seamless &&
							categoryId === PromotionCategoryIdEnum.LiveCasino)
					break

				case PromotionFilterEnum.Slot:
					bol =
						includes(
							[
								PromotionCategoryIdEnum.PtSlots,
								PromotionCategoryIdEnum.Mega888SlotRNGFishing,
							],
							categoryId
						) ||
						(walletType === PromotionWalletType.Seamless &&
							categoryId === PromotionCategoryIdEnum.Slots)

					break

				case PromotionFilterEnum.PromoCode:
					bol = true
					break

				default:
					break
			}

			return bol
		})

	const filteredPromotionSelectOptions = filter(
		PROMOTION_SELECT_OPTIONS,
		({ needLogin }) => {
			return !(needLogin && !isLogin)
		}
	)

	useEffect(() => {
		// * 大駝峰小駝峰都需判斷，有其一就需打開彈窗
		const effectBonusCode = queryBonus || queryBonusCode
		// 如果 query 有帶 bonusCode 需直接打開 detail 彈窗
		if (!isUndefined(effectBonusCode)) {
			onOpenPromotionDetail(String(effectBonusCode))
			// 打開後就洗掉 query , 避免重複觸發
			replace(paths.promotion.root, undefined, { shallow: true })
		}
	}, [queryBonus, queryBonusCode])

	const value: PromotionContextInterface = {
		persistPromotionData,
		PROMOTION_SELECT_OPTIONS: filteredPromotionSelectOptions,
		promotionForm,
		promotionData,
		activeFilterType,
		onChangeActiveFilterType,
		onSetSpecialCode,
		onOpenPromotionDetail,
		onUpdatePromotionData,
	}

	return (
		<PromotionContext.Provider value={value}>
			{children}
		</PromotionContext.Provider>
	)
}

export const usePromotion = () => useContext(PromotionContext)
