import {
	CurrenciesEnum,
	DeviceTypeEnum,
	IImageData,
	VipLevelEnum,
} from '@nx-next-app/types'
import * as process from 'process'

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

const deviceTypeForVipBanner =
	deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string,
	currencyId?: number | string
) => [
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-01-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-02-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-03-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-04-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-05-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${
			process.env['NEXT_PUBLIC_BANNER_HOST']
		}/${deviceTypeForVipBanner}/img/vip-06-${
			currencyId === CurrenciesEnum.INR ? 'hi' : 'bd'
		}${langId === 'en' ? '-en' : ''}.jpg`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
]

// * headerUrl 目前只有支援 desktop
export const VIP_CLUB_IMAGES: IImageData[] = [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip1.png`,
		displayKey: 'Label_Vip_Vintage_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-vintage.png`,
		levelTabsName: 'vintage',
		level: VipLevelEnum.VINTAGE,
		alt: 'vip01',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip2.png`,
		displayKey: 'Label_Vip_Silver_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-silver.png`,
		levelTabsName: 'silver',
		level: VipLevelEnum.SILVER,
		alt: 'vip02',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip3.png`,
		displayKey: 'Label_Vip_Gold_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-gold.png`,
		levelTabsName: 'gold',
		level: VipLevelEnum.GOLD,
		alt: 'vip03',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip4.png`,
		displayKey: 'Label_Vip_Titanium_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-titanium.png`,
		levelTabsName: 'titanium',
		level: VipLevelEnum.TITANIUM,
		alt: 'vip04',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip5.png`,
		displayKey: 'Label_Vip_Diamond_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-diamond.png`,
		levelTabsName: 'diamond',
		level: VipLevelEnum.DIAMOND,
		alt: 'vip05',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip6.png`,
		displayKey: 'Label_Yashbet_Club',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-nova.png`,
		levelTabsName: 'nova',
		level: VipLevelEnum.Highest,
		alt: 'vip06',
	},
]
