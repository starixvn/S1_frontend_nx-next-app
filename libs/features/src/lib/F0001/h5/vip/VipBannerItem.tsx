import { useAuth } from '@nx-next-app/data-access'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import { IBannerByCurrencyData } from '@nx-next-app/types'
import { isUrl, numberFormatExcludeString } from '@nx-next-app/utils'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipBannerItemProps {
	item: IF0001VipProgram
}

const VipBannerItem = ({
	item: { level, membershipRenewal, referralBonus, apiData, bannerData },
}: IVipBannerItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName },
	} = useAuth()
	const { url, levelText } = bannerData as IBannerByCurrencyData

	return (
		<div className={`swiper-slide ${levelText}`} key={level}>
			{isUrl(url) && <img className='vipbanner' src={url} alt='vipbanner' />}
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
					{level === 1 || level === 6 ? null : currencyName}
					{apiData?.upDeposit
						? numberFormatExcludeString(apiData?.upDeposit)
						: t('Label_Vip_NoRestrictions')}
				</span>
				{apiData?.upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_UpGrade_Bonus')}
						<span>
							{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
							{level === 1 || level === 6 ? null : currencyName}{' '}
							{apiData?.upBonus && numberFormatExcludeString(apiData?.upBonus)}
						</span>
					</div>
				)}
			</div>

			<div className='viprule'>
				<div className='viprule-item'>
					<span>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') as string
						)}
					</span>
					<span>{t(membershipRenewal)}</span>
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
						{apiData?.rebateCategory
							? Math.max(
									...apiData.rebateCategory.map(({ percentage }) => percentage)
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
