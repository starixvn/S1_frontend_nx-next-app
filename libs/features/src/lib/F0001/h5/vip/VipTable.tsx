import { useAuth } from '@nx-next-app/data-access'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import { RebateCategoryEnum } from '@nx-next-app/service'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import classNames from 'classnames'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipTableProps {
	info: IF0001VipProgram
	activeTab: number
}

const VipTable = ({ info, activeTab }: IVipTableProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div
			className={`viptable ${
				info?.level === activeTab &&
				info?.apiData?.levelName.toLowerCase().split(' ')[0]
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
						<div className={classNames({ High: info?.depositPriority })} />
						{info?.depositPriority && t('Label_High')}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_WithDrawal_Priority') as string)}</li>
					<li>
						<div
							className={classNames({
								High: info?.withdrawalPriority,
							})}
						/>
						{info?.withdrawalPriority && t('Label_High')}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Service_Support_At_Date') as string)}
					</li>
					<li>
						<div className={classNames({ High: info?.vipLiveChat })} />
						{info?.vipLiveChat && t('Label_High')}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Designated_Account_Manager') as string)}
					</li>
					<li
						className={classNames({
							High: info?.designatedAccountManager,
						})}
					/>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Withdrawal_Limitation') as string)}
					</li>
					<li>
						{Number(info?.apiData?.withdrawalMax) === 0
							? t('Label_Vip_Unlimited')
							: numberFormatExcludeString(info?.apiData?.withdrawalMax)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Transactions_Count') as string)}
					</li>
					<li>
						{Number(info?.apiData?.times) === 0
							? t('Label_Vip_Unlimited')
							: numberFormatExcludeString(info?.apiData?.times)}
					</li>
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
						{info?.apiData?.upBonus &&
							numberFormatExcludeString(info?.apiData?.upBonus)}
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
							info?.apiData?.rebateCategory[RebateCategoryEnum.Sports]
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
							info?.apiData?.rebateCategory[RebateCategoryEnum.LiveCasino]
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
							info?.apiData?.rebateCategory[RebateCategoryEnum.Casino]
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
							info?.apiData?.rebateCategory[RebateCategoryEnum.VirtualSports]
								?.percentage
						}
						%
					</li>
				</ul>

				{/* ESports */}
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_ESport_Rebate') as string)}</li>
					<li>
						{
							info?.apiData?.rebateCategory[RebateCategoryEnum.ESports]
								?.percentage
						}
						%
					</li>
				</ul>
			</div>
			{/* === Referral bonus program ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus_Program') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus') as string)}</li>
					<li className={`${info?.referralBonus ? 'High' : null}`} />
				</ul>
			</div>
			{/* === Tier upgrade requirementMYR ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Tire_Upgrade_Requirement') as string)}
						{t(`Label_General_Currency_${currencyId}`)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Monthly_Minimum_Deposit') as string)}
					</li>
					<li>
						{info?.apiData?.upDeposit &&
							numberFormatExcludeString(info?.apiData?.upDeposit)}
					</li>
				</ul>
			</div>
			{/* === Tier maintenance requirementMYR ===  */}
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Tier_Maintenance_Requirement') as string)}
						{t(`Label_General_Currency_${currencyId}`)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Minimum_Deposit_Within_Validity_Period') as string
						)}
					</li>
					<li>
						{info?.apiData?.downDeposit &&
							Number(info?.apiData?.downDeposit) !== 0 &&
							numberFormatExcludeString(info?.apiData?.downDeposit)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Minimum_Turnover_Within_Validity_Period') as string
						)}
					</li>
					<li>
						{info?.apiData?.downTurnover &&
							Number(info?.apiData?.downTurnover) !== 0 &&
							numberFormatExcludeString(info?.apiData?.downTurnover)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') as string
						)}
					</li>
					<li>{t(info.membershipRenewal)}</li>
				</ul>
			</div>
		</div>
	)
}

export default VipTable
