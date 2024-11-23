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
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vintage-${langId}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/silver-${langId}.png`,
		level: VipLevelEnum.SILVER,
		levelText: 'silver',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/gold-${langId}.png`,
		level: VipLevelEnum.GOLD,
		levelText: 'gold',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/titanium-${langId}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/diamond-${langId}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/nova-${langId}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'nova',
	},
]

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number
): IBannerByCurrencyData[] => [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/vintage${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/silver${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.SILVER,
		levelText: 'silver',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/gold${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.GOLD,
		levelText: 'gold',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/titanium${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/diamond${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/nova${
			langId === 'en' ? '' : `-${langId}`
		}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'nova',
	},
]

// * headerUrl 目前只有支援 desktop
// * settingDisplayKey 目前只有支援 h5
export const VIP_CLUB_IMAGES: IImageData[] = [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-vintage.webp`,
		displayKey: 'Label_Vip_Vintage_Club',
		settingDisplayKey: 'Label_VIP_Vintage',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-vintage.webp`,
		levelTabsName: 'vintage',
		level: VipLevelEnum.VINTAGE,
		alt: 'vip01',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-silver.webp`,
		displayKey: 'Label_Vip_Silver_Club',
		settingDisplayKey: 'Label_VIP_Silver',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-silver.webp`,
		levelTabsName: 'silver',
		level: VipLevelEnum.SILVER,
		alt: 'vip02',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-gold.webp`,
		displayKey: 'Label_Vip_Gold_Club',
		settingDisplayKey: 'Label_VIP_Gold',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-gold.webp`,
		levelTabsName: 'gold',
		level: VipLevelEnum.GOLD,
		alt: 'vip03',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-titanium.webp`,
		displayKey: 'Label_Vip_Titanium_Club',
		settingDisplayKey: 'Label_VIP_Titanium',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-titanium.webp`,
		levelTabsName: 'titanium',
		level: VipLevelEnum.TITANIUM,
		alt: 'vip04',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-diamond.webp`,
		displayKey: 'Label_Vip_Diamond_Club',
		settingDisplayKey: 'Label_VIP_Diamond',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-diamond.webp`,
		levelTabsName: 'diamond',
		level: VipLevelEnum.DIAMOND,
		alt: 'vip05',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/new-ui/vip-nova.webp`,
		displayKey: 'Label_Vip_Infinity_Club',
		settingDisplayKey: 'Label_VIP_Infinity',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/vip-nova.webp`,
		levelTabsName: 'infinity',
		level: VipLevelEnum.Highest,
		alt: 'vip06',
	},
]
