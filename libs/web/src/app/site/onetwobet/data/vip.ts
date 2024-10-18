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
		levelText: 'vintage',
	},
	{
		url: `/desktop/img/vip2-banner-${langId}.png`,
		level: VipLevelEnum.SILVER,
		levelText: 'silver',
	},
	{
		url: `/desktop/img/vip3-banner-${langId}.png`,
		level: VipLevelEnum.GOLD,
		levelText: 'gold',
	},
	{
		url: `/desktop/img/vip4-banner-${langId}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `/desktop/img/vip5-banner-${langId}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `/desktop/img/vip6-banner-${langId}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'nova',
	},
]

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number
): IBannerByCurrencyData[] => [
	{
		url: `/h5/img/vip1-banner-${langId}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `/h5/img/vip2-banner-${langId}.png`,
		level: VipLevelEnum.SILVER,
		levelText: 'silver',
	},
	{
		url: `/h5/img/vip3-banner-${langId}.png`,
		level: VipLevelEnum.GOLD,
		levelText: 'gold',
	},
	{
		url: `/h5/img/vip4-banner-${langId}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `/h5/img/vip5-banner-${langId}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `/h5/img/vip6-banner-${langId}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'nova',
	},
]

// * headerUrl 目前只有支援 desktop
// * settingDisplayKey 目前只有支援 h5
export const VIP_CLUB_IMAGES: IImageData[] = [
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip1.svg`,
		displayKey: 'Label_Vip_BlackTortoise_Club',
		settingDisplayKey: 'Label_VIP_BlackTortoise',
		headerUrl: `/desktop/img/4.0/header-vintage.png`,
		levelTabsName: 'vintage',
		level: VipLevelEnum.VINTAGE,
		alt: 'vip01',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip2.svg`,
		displayKey: 'Label_Vip_Phoenix_Club',
		settingDisplayKey: 'Label_VIP_Phoenix',
		headerUrl: `/desktop/img/4.0/header-silver.png`,
		levelTabsName: 'silver',
		level: VipLevelEnum.SILVER,
		alt: 'vip02',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip3.svg`,
		displayKey: 'Label_Vip_Tiger_Club',
		settingDisplayKey: 'Label_VIP_Tiger',
		headerUrl: `/desktop/img/4.0/header-gold.png`,
		levelTabsName: 'gold',
		level: VipLevelEnum.GOLD,
		alt: 'vip03',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip4.svg`,
		displayKey: 'Label_Vip_Dragon_Club',
		settingDisplayKey: 'Label_VIP_Dragon',
		headerUrl: `/desktop/img/4.0/header-titanium.png`,
		levelTabsName: 'titanium',
		level: VipLevelEnum.TITANIUM,
		alt: 'vip04',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip5.svg`,
		displayKey: 'Label_Vip_Qilin_Club',
		settingDisplayKey: 'Label_VIP_Qilin',
		headerUrl: `/desktop/img/4.0/header-diamond.png`,
		levelTabsName: 'diamond',
		level: VipLevelEnum.DIAMOND,
		alt: 'vip05',
	},
	{
		url: `/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip6.svg`,
		displayKey: 'Label_Vip_VermilionBird_Club',
		settingDisplayKey: 'Label_VIP_VermilionBird',
		headerUrl: `/desktop/img/4.0/header-nova.png`,
		levelTabsName: 'nova',
		level: VipLevelEnum.Highest,
		alt: 'vip06',
	},
]
