import { IVipClubImage } from '@nx-next-app/components/D0001'

export const VIP_CLUB_IMAGES: IVipClubImage[] = [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip1.png`,
		displayKey: 'lbl_Vintage_Club',
		alt: 'vip01',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip2.png`,
		displayKey: 'lbl_Silver_Club',
		alt: 'vip02',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip3.png`,
		displayKey: 'lbl_Gold_Club',
		alt: 'vip03',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip4.png`,
		displayKey: 'lbl_Titanium_Club',
		alt: 'vip04',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip5.png`,
		displayKey: 'lbl_Diamond_Club',
		alt: 'vip05',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/vip6.png`,
		displayKey: 'lbl_Nova_Club',
		alt: 'vip06',
	},
]
