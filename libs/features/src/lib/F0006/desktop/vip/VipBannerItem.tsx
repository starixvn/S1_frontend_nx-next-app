import { useAuth } from '@nx-next-app/data-access'
import { IF0006VipProgram } from '@nx-next-app/features/F0006/types'
import { IBannerByCurrencyData } from '@nx-next-app/types'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipBannerItemProps {
	item: IF0006VipProgram
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
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
					{level === 1 || level === 6 ? null : currencyName}
					{apiData?.upDeposit
						? apiData?.upDeposit.split('.')[0]
						: t('Label_Vip_NoRestrictions')}
				</span>
				{apiData?.upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_Maintenance_Requirement')}
						<span>
							{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
							{level === 1 || level === 6 ? null : currencyName}{' '}
							{apiData?.upBonus ? apiData?.upBonus.split('.')[0] : null}
						</span>
					</div>
				)}
			</div>
			<img className='vipbg' src={url} alt='' />
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
