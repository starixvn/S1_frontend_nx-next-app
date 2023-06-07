import { IVipClubImage } from '@nx-next-app/components/D0001'
import { CurrenciesEnum } from '@nx-next-app/types'
import { IVipEventCurrenciesLimitationInfo } from '@nx-next-app/features/F0001/desktop'
import { IImageData } from '@nx-next-app/components/D0001/config-context/type'

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number
): IImageData[] => [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_1.png`,
		alt: 'vip-banner-1',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_2.png`,
		alt: 'vip-banner-2',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_3.png`,
		alt: 'vip-banner-3',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_4.png`,
		alt: 'vip-banner-4',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_5.png`,
		alt: 'vip-banner-5',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${langId}/vip_6.png`,
		alt: 'vip-banner-6',
	},
]

export const VIP_CLUB_IMAGES: IVipClubImage[] = [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip1.png`,
		displayKey: 'Label_Vintage_Club',
		alt: 'vip01',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip2.png`,
		displayKey: 'Label_Silver_Club',
		alt: 'vip02',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip3.png`,
		displayKey: 'Label_Gold_Club',
		alt: 'vip03',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip4.png`,
		displayKey: 'Label_Titanium_Club',
		alt: 'vip04',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip5.png`,
		displayKey: 'Label_Diamond_Club',
		alt: 'vip05',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip6.png`,
		displayKey: 'Label_Nova_Club',
		alt: 'vip06',
	},
]

export const VIP_EVENT_CURRENCIES_LIMITATION_INFO: IVipEventCurrenciesLimitationInfo =
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
