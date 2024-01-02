import React from 'react'
import Image from 'next/future/image'
import { capitalize } from 'lodash-es'
import { IBannerByCurrencyData, VipLevelEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isUrl, numberFormatExcludeString } from '@nx-next-app/utils'
import { VipBannerInfo } from '@nx-next-app/service'

interface IVipBannerItemProps {
	vipBannerInfo: VipBannerInfo
	bannerByCurrencyData: IBannerByCurrencyData
}

const VipBannerItem = ({
	vipBannerInfo: {
		upBonus,
		upDeposit,
		rankingValidityMembershipRenewal,
		referralBonus,
		rebateCategory: rebateCategoryList,
	},
	bannerByCurrencyData: { levelText, level, url },
}: IVipBannerItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName },
	} = useAuth()

	return (
		<div className={`swiper-slide ${levelText}`} key={level}>
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
					{level === VipLevelEnum.VINTAGE || level === VipLevelEnum.Highest
						? null
						: currencyName}
					{upDeposit
						? numberFormatExcludeString(upDeposit)
						: t('Label_Vip_NoRestrictions')}
				</span>
				{upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_UpGrade_Bonus')}
						<span>
							{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
							{level === VipLevelEnum.VINTAGE || level === VipLevelEnum.Highest
								? null
								: currencyName}{' '}
							{upBonus && numberFormatExcludeString(upBonus)}
						</span>
					</div>
				)}
			</div>
			{isUrl(url) ? (
				<Image className='vipbg' src={url} alt='' width={2560} height={669} />
			) : (
				<img className='vipbg' src={url} alt='' />
			)}
			<div className='viprule'>
				<div className='viprule-item'>
					<span>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') as string
						)}
					</span>
					<span>{rankingValidityMembershipRenewal}</span>
				</div>
				<div className='viprule-item'>
					<span>
						{capitalize(t('Label_Vip_Referral_Bonus_Program') as string)}
					</span>
					<span>{referralBonus ? 'Yes' : 'No'}</span>
				</div>
				<div className='viprule-item'>
					<span>
						{capitalize(t('Label_Vip_Special_Rebate_UP_TO') as string)}
					</span>
					<span>
						{rebateCategoryList
							? Math.max(
									...rebateCategoryList.map(({ percentage }) => percentage)
							  )
							: 0}
						%
					</span>
				</div>
			</div>
		</div>
	)
}

export default VipBannerItem
