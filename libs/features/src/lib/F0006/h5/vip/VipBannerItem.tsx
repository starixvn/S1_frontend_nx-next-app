import Image from 'next/future/image'
import { capitalize } from 'lodash-es'
import { IBannerByCurrencyData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isUrl } from '@nx-next-app/utils'
import { VipBannerInfo } from '@nx-next-app/service'

interface IVipBannerItemProps {
	vipData: VipBannerInfo
	BannerByCurrencyData: IBannerByCurrencyData
}

const VipBannerItem = ({
	vipData: {
		upBonus,
		upDeposit,
		rankingValidityMembershipRenewal,
		referralBonus,
		rebateCategory: rebateCategoryList,
	},
	BannerByCurrencyData: { levelText, level, url },
}: IVipBannerItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName },
	} = useAuth()

	return (
		<div className={`swiper-slide ${levelText}`} key={level}>
			{isUrl(url) ? (
				<Image
					className='vipbanner'
					width={1020}
					height={1230}
					src={url}
					alt=''
				/>
			) : (
				<img src={url} alt='' />
			)}
			<div className='vipinfo'>
				{t('Label_Vip_Monthly_Minimum_Deposit')}
				<span>
					{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
					{level === 1 || level === 6 ? null : currencyName}
					{upDeposit ? upDeposit.split('.')[0] : t('Label_Vip_NoRestrictions')}
				</span>
				{upBonus && (
					<div className='rewardinfo'>
						{t('Label_Vip_Tier_Maintenance_Requirement')}
						<span>
							{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
							{level === 1 || level === 6 ? null : currencyName}{' '}
							{upBonus ? upBonus.split('.')[0] : null}
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
