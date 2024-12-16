import { useAuth } from '@nx-next-app/data-access'
import { RebateCategoryEnum, VipBannerInfo } from '@nx-next-app/service'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import classNames from 'classnames'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipTableProps {
	vipBannerInfo: VipBannerInfo | undefined
	activeTab: number
}

const VipTable = ({ vipBannerInfo, activeTab }: IVipTableProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div
			className={`viptable ${
				vipBannerInfo?.level === activeTab &&
				vipBannerInfo?.levelName.toLowerCase().split(' ')[0]
			}`}
		>
			<div className='viptable-item'>
				{/* === Service support ===  */}
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Service_Support') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Deposit_Priority') as string)}</li>
					<li>
						<div
							className={classNames({ High: vipBannerInfo?.depositPriority })}
						/>
						{vipBannerInfo?.depositPriority}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_WithDrawal_Priority') as string)}</li>
					<li>
						<div
							className={classNames({
								High: vipBannerInfo?.withdrawalPriority,
							})}
						/>
						{vipBannerInfo?.withdrawalPriority}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Service_Support_At_Date') as string)}
					</li>
					<li>
						<div
							className={classNames({ High: vipBannerInfo?.serviceSupport })}
						/>
						{vipBannerInfo?.serviceSupport}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Designated_Account_Manager') as string)}
					</li>
					<li
						className={classNames({
							High: vipBannerInfo?.designatedAccountManager,
						})}
					/>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Withdrawal_Limitation') as string)}
					</li>
					<li>{numberFormatExcludeString(vipBannerInfo?.withdrawalMax)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Transactions_Count') as string)}
					</li>
					<li>{vipBannerInfo?.times}</li>
				</ul>
			</div>
			<div className='viptable-item'>
				{/* === Exclusive bonusMYR ===  */}
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Exclusive_Bonus') as string)}
						{t(`Label_General_Currency_${currencyId}`)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Tier_UpGrade_Bonus') as string)}</li>
					<li>
						{vipBannerInfo?.upBonus &&
							numberFormatExcludeString(vipBannerInfo?.upBonus)}
					</li>
				</ul>
			</div>
			{/* === Special rebate ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Special_Rebate') as string)}</li>
				</ul>

				{/* Sports */}
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Sport_Rebate') as string)}</li>
					<li>
						{
							vipBannerInfo?.rebateCategory[RebateCategoryEnum.Sports]
								?.percentage
						}
						%
					</li>
				</ul>

				{/* LiveCasino */}
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Live_Casino_Rebate') as string)}</li>
					<li>
						{
							vipBannerInfo?.rebateCategory[RebateCategoryEnum.LiveCasino]
								?.percentage
						}
						%
					</li>
				</ul>

				{/* Casino */}
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Slot_Rebate') as string)}</li>
					<li>
						{
							vipBannerInfo?.rebateCategory[RebateCategoryEnum.Casino]
								?.percentage
						}
						%
					</li>
				</ul>

				{/* VirtualSports */}
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Virtual_Sport_Rebate') as string)}</li>
					<li>
						{
							vipBannerInfo?.rebateCategory[RebateCategoryEnum.VirtualSports]
								?.percentage
						}
						%
					</li>
				</ul>

				{/* ESports */}
				{/* <ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_ESport_Rebate') as string)}</li>
					<li>
						{
							vipBannerInfo?.rebateCategory[RebateCategoryEnum.ESports]
								?.percentage
						}
						%
					</li>
				</ul> */}
			</div>
			{/* === Referral bonus program ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus_Program') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus') as string)}</li>
					<li className={`${vipBannerInfo?.referralBonus ? 'High' : null}`} />
				</ul>
			</div>
			{/* === Tier upgrade requirementMYR ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Tire_Upgrade_Requirement') as string)} (
						{t(`Label_General_Currency_${currencyId}`)})
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Monthly_Minimum_Deposit') as string)}
					</li>
					<li>
						{vipBannerInfo?.upDeposit &&
							numberFormatExcludeString(vipBannerInfo?.upDeposit)}
					</li>
				</ul>
			</div>
			{/* === Tier maintenance requirementMYR ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Tier_Maintenance_Requirement') as string)}{' '}
						({t(`Label_General_Currency_${currencyId}`)})
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Minimum_Deposit_Within_Validity_Period') as string
						)}
					</li>
					<li>
						{vipBannerInfo?.downDeposit &&
							Number(vipBannerInfo?.downDeposit) !== 0 &&
							numberFormatExcludeString(vipBannerInfo?.downDeposit)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Minimum_Turnover_Within_Validity_Period') as string
						)}
					</li>
					<li>
						{vipBannerInfo?.downTurnover &&
							Number(vipBannerInfo?.downTurnover) !== 0 &&
							numberFormatExcludeString(vipBannerInfo?.downTurnover)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') as string
						)}
					</li>
					<li>{vipBannerInfo?.rankingValidityMembershipRenewal}</li>
				</ul>
			</div>
		</div>
	)
}

export default VipTable
