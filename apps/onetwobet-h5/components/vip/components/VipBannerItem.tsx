import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { IOneTwoBetVipProgram } from '@nx-next-app/site/onetwobet'
import { VipLevelEnum } from '@nx-next-app/types'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { capitalize, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipBannerItemProps {
	item: IOneTwoBetVipProgram
}

const VipBannerItem = ({
	item: {
		level,
		membershipRenewal,
		referralBonus,
		apiData,
		bannerData: { url },
	},
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
			content: t(membershipRenewal),
		},
		{
			resourceKey: 'Label_Vip_Referral_Bonus_Program',
			content: referralBonus ? 'Yes' : 'No',
		},
		{
			resourceKey: 'Label_Vip_Special_Rebate_UP_TO',
			content: `${
				apiData?.rebateCategory
					? Math.max(
							...apiData.rebateCategory.map(({ percentage }) => percentage)
					  )
					: 0
			}%`,
		},
	]

	return (
		<>
			<img className='vipbanner' src={getBannerUrl(url)} alt='vipbanner' />
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{isShowCurrency && currencyName}
					{apiData?.upDeposit
						? numberFormatExcludeString(apiData?.upDeposit)
						: t('Label_Vip_NoRestrictions')}
				</span>
				{apiData?.upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_UpGrade_Bonus')}
						<span>
							{isShowCurrency && currencyName}
							{apiData?.upBonus && numberFormatExcludeString(apiData?.upBonus)}
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
		</>
	)
}

export { VipBannerItem }
