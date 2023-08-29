import { PromotionFilterEnum } from '@nx-next-app/types'

export const PROMOTION_SELECT_OPTIONS = [
	{
		displayKey: 'Label_General_All',
		value: PromotionFilterEnum.All,
		needLogin: false,
	},
	{
		displayKey: 'Label_General_NewMember',
		value: PromotionFilterEnum.NewMember,
		needLogin: false,
	},
	{
		displayKey: 'Label_General_Special',
		value: PromotionFilterEnum.Special,
		needLogin: false,
	},
	{
		displayKey: 'Label_General_SportBook',
		value: PromotionFilterEnum.SportBook,
		needLogin: false,
	},
	{
		displayKey: 'Label_General_LiveCasino',
		value: PromotionFilterEnum.Casino,
		needLogin: false,
	},
	{
		displayKey: 'Label_General_Slots',
		value: PromotionFilterEnum.Slot,
		needLogin: false,
	},
	{
		displayKey: 'Label_Promotions_PromoCode',
		value: PromotionFilterEnum.PromoCode,
		needLogin: true,
	},
]
