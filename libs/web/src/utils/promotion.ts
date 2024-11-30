import {
	PromotionFilterEnum,
	PromotionStatusEnum,
	PromotionTypeEnum,
} from '@nx-next-app/types'
import dayjs from 'dayjs'
import { floor, includes, multiply } from 'lodash-es'
import { TFunction } from 'next-i18next'

/**
 * @description 回傳此優惠活動是否在新優惠期間
 * ```tsx
 * * // 當日時間為 2023-08-24 11:20:58, 1692847258
 * * isPromotionNew({ canJoin:true, periodFrom: 1691971200 }) // true
 * * isPromotionNew({ canJoin:false, periodFrom: 1691971200 }) // false
 * * isPromotionNew({ canJoin:true, periodFrom: 1681257600 }) // false
 *
 * ```
 */
export const isPromotionNew = ({
	canJoin,
	periodFrom,
	activeFilterType,
}: {
	canJoin: boolean
	periodFrom: number
	activeFilterType?: number
}) => {
	return (
		!(activeFilterType === PromotionFilterEnum.PromoCode && !canJoin) &&
		dayjs(periodFrom).isAfter(dayjs().subtract(15, 'days').unix())
	)
}

/**
 * @description 回傳此優惠活動是否已申請過
 */
export const isPromotionClaimed = ({
	isJoin,
	status,
}: {
	isJoin: boolean
	status: PromotionStatusEnum
}) =>
	isJoin ||
	status === PromotionStatusEnum.Running ||
	status === PromotionStatusEnum.TransferOut

/**
 * @description 是否顯示優惠活動進度條
 */
export const isShowPromotionProgressBar = ({
	isJoin,
	status,
	promotionType,
}: {
	isJoin: boolean
	status: number
	promotionType: number
}) =>
	isJoin &&
	!includes(
		[PromotionStatusEnum.Fulfill, PromotionStatusEnum.Canceled],
		status
	) &&
	!includes(
		[PromotionTypeEnum.Cashback, PromotionTypeEnum.Rebate],
		promotionType
	)

/**
 * @description 回傳優惠活動進度條
 */
export const getPromotionPercentage = ({
	turnOver,
	rollOver,
}: {
	turnOver: number
	rollOver: number
}) => (turnOver >= rollOver ? 100 : ((turnOver / rollOver) * 100).toFixed(2))

export const getIsHidePromotionJoinButton = ({
	isJoin,
	promotionType,

	beenUsed,
	periodFrom,
	periodTo,
}: {
	isJoin: boolean
	promotionType: number
	beenUsed: boolean
	periodFrom: number
	periodTo: number
}) =>
	isJoin ||
	promotionType === PromotionTypeEnum.Rebate ||
	promotionType === PromotionTypeEnum.SpecialBonus ||
	beenUsed ||
	dayjs.unix(periodFrom).diff(Date.now()) > 0 ||
	dayjs.unix(periodTo).diff(Date.now()) < 0

/**
 * @example
 * ```tsx
 * const expiryTime = getExpiryTime({ custExpiryTime:null, periodTo:1692633599, t}) // 0 Days 4 Hours
 * ```
 */
export const getExpiryTime = ({
	custExpiryTime,
	periodTo,
	t,
}: {
	custExpiryTime: string
	periodTo: number
	t: TFunction
}) => {
	const expiryTime = dayjs(custExpiryTime || dayjs.unix(periodTo)).diff(
		dayjs(),
		'days',
		true
	)

	if (dayjs().isAfter(dayjs(custExpiryTime))) {
		return `0 ${t('Label_General_Days')} 0 ${t('Label_General_Hours')}`
	}

	const expiryDays = String(expiryTime).split('.')[0]
	const expiryHours = floor(multiply(expiryTime - Number(expiryDays), 24))

	return `${expiryDays} ${t('Label_General_Days')} ${expiryHours} ${t(
		'Label_General_Hours'
	)}`
}
