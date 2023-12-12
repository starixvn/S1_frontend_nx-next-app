import {
	DeviceTypeEnum,
	IBannerByCurrencyData,
	IImageData,
	VipLevelEnum,
} from '@nx-next-app/types'
import * as process from 'process'

export const VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY = (
	langId: string | number
): IBannerByCurrencyData[] => [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/vintage${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.VINTAGE,
		levelText: 'vintage',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/silver${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.SILVER,
		levelText: 'silver',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/gold${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.GOLD,
		levelText: 'gold',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/titanium${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.TITANIUM,
		levelText: 'titanium',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/diamond${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.DIAMOND,
		levelText: 'diamond',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? 'desktop'
				: 'h5'
		}/img/nova${
			langId && langId !== process.env['NEXT_PUBLIC_DEFAULT_LANG']
				? `-${langId}`
				: ''
		}.png`,
		level: VipLevelEnum.Highest,
		levelText: 'nova',
	},
]

// yashbet 沒有 VIP 功能
export const VIP_CLUB_IMAGES: IImageData[] = []
