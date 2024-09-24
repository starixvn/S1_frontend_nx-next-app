import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { VipBannerInfo } from '@nx-next-app/service'
import { IBannerByCurrencyData, VipLevelEnum } from '@nx-next-app/types'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { capitalize, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipBannerItemProps {
	data: VipBannerInfo
	bannerByCurrencyData: IBannerByCurrencyData
}

const VipBannerItem = ({
	data: {
		upBonus,
		upDeposit,
		rankingValidityMembershipRenewal,
		referralBonus,
		rebateCategory: rebateCategoryList,
	},
	bannerByCurrencyData: { level, url },
}: IVipBannerItemProps) => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { currencyName },
	} = useAuth()

	// vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency
	const isShowCurrency = !includes(
		[VipLevelEnum.VINTAGE, VipLevelEnum.Highest],
		level
	)

	const vipRules = [
		{
			resourceKey: 'Label_Vip_Ranking_Validity_Membership_Renewal',
			content: rankingValidityMembershipRenewal,
		},
		{
			resourceKey: 'Label_Vip_Referral_Bonus_Program',
			content: referralBonus ? 'Yes' : 'No',
		},
		{
			resourceKey: 'Label_Vip_Special_Rebate_UP_TO',
			content: `${
				rebateCategoryList
					? Math.max(...rebateCategoryList.map(({ percentage }) => percentage))
					: 0
			}%`,
		},
	]

	return (
		<div className={`swiper-slide vip${level}`} key={level}>
			<img className='vipbg' src={getBannerUrl(url)} alt='' />
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{isShowCurrency && currencyName}
					{upDeposit
						? numberFormatExcludeString(upDeposit)
						: t('Label_Vip_NoRestrictions')}
				</span>
				{upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_UpGrade_Bonus')}
						<span>
							{isShowCurrency && currencyName}
							{upBonus && numberFormatExcludeString(upBonus)}
						</span>
					</div>
				)}
			</div>
			<div className='viprule'>
				{vipRules.map(item => (
					<div className='viprule-item' key={item.resourceKey}>
						<span>{capitalize(t(item.resourceKey) as string)}</span>
						<span>{item.content}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export { VipBannerItem }
