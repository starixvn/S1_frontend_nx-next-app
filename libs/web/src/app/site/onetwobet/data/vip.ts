import { VipBannerInfo } from '@nx-next-app/service'
import {
	DeviceTypeEnum,
	IBannerByCurrencyData,
	IImageData,
	VipLevelEnum,
} from '@nx-next-app/types'
import * as process from 'process'

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY_DESKTOP = (
	langId: string | number
): IBannerByCurrencyData[] => [
	{
		url: `/desktop/img/vip1-banner-${langId}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'blackTortoise',
	},
	{
		url: `/desktop/img/vip4-banner-${langId}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'phoenix',
	},
	{
		url: `/desktop/img/vip5-banner-${langId}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'tiger',
	},
	{
		url: `/desktop/img/vip6-banner-${langId}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'dragon',
	},
]

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number
): IBannerByCurrencyData[] => [
	{
		url: `/h5/img/vip1-banner-${langId}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'blackTortoise',
	},
	{
		url: `/h5/img/vip4-banner-${langId}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'phoenix',
	},
	{
		url: `/h5/img/vip5-banner-${langId}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'tiger',
	},
	{
		url: `/h5/img/vip6-banner-${langId}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'dragon',
	},
]

// * headerUrl 目前只有支援 desktop
// * settingDisplayKey 目前只有支援 h5
export const VIP_CLUB_IMAGES: IImageData[] = [
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip1.svg`,
		displayKey: 'Label_VIP_BlackTortoise',
		settingDisplayKey: 'Label_VIP_BlackTortoise',
		headerUrl: `/desktop/img/4.0/header-vintage.png`,
		levelTabsName: 'tortoise',
		level: VipLevelEnum.VINTAGE,
		alt: 'vip01',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip2.svg`,
		displayKey: 'Label_VIP_Qilin',
		settingDisplayKey: 'Label_VIP_Qilin',
		headerUrl: `/desktop/img/4.0/header-silver.png`,
		levelTabsName: 'phoenix',
		level: VipLevelEnum.SILVER,
		alt: 'vip02',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip3.svg`,
		displayKey: 'Label_VIP_VermilionBird',
		settingDisplayKey: 'Label_VIP_VermilionBird',
		headerUrl: `/desktop/img/4.0/header-gold.png`,
		levelTabsName: 'tiger',
		level: VipLevelEnum.GOLD,
		alt: 'vip03',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip4.svg`,
		displayKey: 'Label_VIP_Phoenix',
		settingDisplayKey: 'Label_VIP_Phoenix',
		headerUrl: `/desktop/img/4.0/header-titanium.png`,
		levelTabsName: 'dragon',
		level: VipLevelEnum.TITANIUM,
		alt: 'vip04',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip5.svg`,
		displayKey: 'Label_VIP_Tiger',
		settingDisplayKey: 'Label_VIP_Tiger',
		headerUrl: `/desktop/img/4.0/header-diamond.png`,
		levelTabsName: 'qulin',
		level: VipLevelEnum.DIAMOND,
		alt: 'vip05',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip6.svg`,
		displayKey: 'Label_VIP_Dragon',
		settingDisplayKey: 'Label_VIP_Dragon',
		headerUrl: `/desktop/img/4.0/header-nova.png`,
		levelTabsName: 'vermilion',
		level: VipLevelEnum.Highest,
		alt: 'vip06',
	},
]

export interface IOneTwoBetVipProgram {
	level: VipLevelEnum
	enable: boolean
	bannerData?: IBannerByCurrencyData
	apiData?: VipBannerInfo
	depositPriority?: boolean
	membershipRenewal: string
	withdrawalPriority?: boolean
	vipLiveChat?: boolean
	designatedAccountManager?: boolean
	referralBonus?: boolean
	weeklyBonus?: number
	depositRebate?: number
	lossRebate?: number
	rewardPointsMultiplier?: number
}

export const VIP_PROGRAMS: IOneTwoBetVipProgram[] = [
	{
		level: VipLevelEnum.VINTAGE,
		enable: true,
		membershipRenewal: 'Label_Vip_Normal',
		referralBonus: true,
		weeklyBonus: 12,
		depositRebate: 0,
		lossRebate: 0,
		rewardPointsMultiplier: 1,
	},
	{
		level: VipLevelEnum.TITANIUM,
		enable: true,
		membershipRenewal: 'Label_Vip_Monthly',
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
		referralBonus: true,
		weeklyBonus: 18,
		depositRebate: 0.2,
		lossRebate: 0.2,
		rewardPointsMultiplier: 2,
	},
	{
		level: VipLevelEnum.DIAMOND,
		enable: true,
		membershipRenewal: 'Label_Vip_Monthly',
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
		referralBonus: true,
		weeklyBonus: 22,
		depositRebate: 0.3,
		lossRebate: 0.3,
		rewardPointsMultiplier: 2.5,
	},
	{
		level: VipLevelEnum.Highest,
		enable: true,
		membershipRenewal: 'Label_Vip_Monthly',
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
		referralBonus: true,
		weeklyBonus: 25,
		depositRebate: 0.4,
		lossRebate: 0.4,
		rewardPointsMultiplier: 3,
	},
]
