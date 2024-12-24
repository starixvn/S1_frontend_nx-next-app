import { VipBannerInfo } from '@nx-next-app/service'
import { IBannerByCurrencyData, VipLevelEnum } from '@nx-next-app/types'

export interface IF0001VipProgram {
	level: VipLevelEnum
	enable: boolean
	bannerData?: IBannerByCurrencyData
	apiData?: VipBannerInfo
	membershipRenewal: string
	depositPriority?: boolean
	withdrawalPriority?: boolean
	vipLiveChat?: boolean
	designatedAccountManager?: boolean
	referralBonus?: boolean
	rewardPointsMultiplier?: number
}

export const VIP_PROGRAMS: IF0001VipProgram[] = [
	{
		level: VipLevelEnum.VINTAGE,
		enable: true,
		membershipRenewal: 'Label_Vip_Normal',
		referralBonus: true,
	},
	{
		level: VipLevelEnum.SILVER,
		enable: true,
		membershipRenewal: 'Label_Vip_Lifetime',
		referralBonus: true,
	},
	{
		level: VipLevelEnum.GOLD,
		enable: true,
		membershipRenewal: 'Label_Vip_3Months',
		referralBonus: true,
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
	},
	{
		level: VipLevelEnum.TITANIUM,
		enable: true,
		membershipRenewal: 'Label_Vip_3Months',
		referralBonus: true,
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
	},
	{
		level: VipLevelEnum.DIAMOND,
		enable: true,
		membershipRenewal: 'Label_Vip_3Months',
		referralBonus: true,
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
	},
	{
		level: VipLevelEnum.Highest,
		enable: false,
		membershipRenewal: 'Label_Vip_3Months',
		referralBonus: true,
		depositPriority: true,
		withdrawalPriority: true,
		vipLiveChat: true,
		designatedAccountManager: true,
	},
]
