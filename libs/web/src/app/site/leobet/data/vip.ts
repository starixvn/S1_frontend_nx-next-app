import {
	CurrenciesEnum,
	DeviceTypeEnum,
	IBannerByCurrencyData,
	IImageData,
	IStaticVipEventCurrenciesLimitationInfo,
} from '@nx-next-app/types'
import * as process from 'process'

export const VIP_LEVEL = {
	VIP_LEVEL_VINTAGE: 1,
	VIP_LEVEL_SILVER: 2,
	VIP_LEVEL_GOLD: 3,
	VIP_LEVEL_TITANIUM: 4,
	VIP_LEVEL_DIAMOND: 5,
	VIP_LEVEL_NOVA: 6,
}

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number,
	deviceType: number
): IBannerByCurrencyData[] => [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vintage${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/silver${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_SILVER,
		levelText: 'silver',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/gold${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_GOLD,
		levelText: 'gold',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/titanium${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/diamond${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/nova${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_NOVA,
		levelText: 'nova',
	},
]

// Leobet 沒有 VIP 功能
export const VIP_CLUB_IMAGES = (deviceType: number): IImageData[] => []

export const VIP_EVENT_CURRENCIES_LIMITATION_INFO: IStaticVipEventCurrenciesLimitationInfo =
	{
		[CurrenciesEnum.THB]: {
			dailyWithdrawalLimitation: [500000, 600000, 800000, 1000000, 1500000],
			tierUpGradeBonus: [null, 1500, 2500, 5000, 10000],
			monthlyMinimumDeposit: [null, 300000, 800000, 2500000, 4500000],
			minimumDepositWithinValidityPeriod: [
				null,
				null,
				500000,
				1000000,
				3000000,
			],
			minimumTurnoverWithinValidityPeriod: [
				null,
				null,
				5000000,
				10000000,
				30000000,
			],
		},
		[CurrenciesEnum.MYR]: {
			dailyWithdrawalLimitation: [50000, 60000, 80000, 100000, 300000],
			tierUpGradeBonus: [null, 200, 300, 600, 1200],
			monthlyMinimumDeposit: [null, 50000, 150000, 450000, 800000],
			minimumDepositWithinValidityPeriod: [null, null, 200000, 500000, 800000],
			minimumTurnoverWithinValidityPeriod: [
				null,
				null,
				2000000,
				5000000,
				8000000,
			],
		},
		[CurrenciesEnum.IDR]: {
			dailyWithdrawalLimitation: [
				80000000, 100000000, 150000000, 200000000, 500000000,
			],
			tierUpGradeBonus: [null, 200, 300, 600, 1200],
			monthlyMinimumDeposit: [null, 30000000, 100000000, 250000000, 500000000],
			minimumDepositWithinValidityPeriod: [
				null,
				null,
				100000000,
				300000000,
				600000000,
			],
			minimumTurnoverWithinValidityPeriod: [
				null,
				null,
				1000000000,
				3000000000,
				6000000000,
			],
		},
	}
