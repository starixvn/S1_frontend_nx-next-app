import React from 'react'
import { useTranslation } from 'next-i18next'
import { capitalize } from 'lodash-es'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { VipBannerInfo } from '@nx-next-app/service'

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
				vipBannerInfo?.level === activeTab
					? vipBannerInfo?.levelName.toLowerCase().split(' ')[0]
					: null
			}`}
		>
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Service_Support') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Deposit_Priority') as string)}</li>
					<li className=''>
						<div
							className={`${vipBannerInfo?.depositPriority ? 'High' : null}`}
						/>
						{vipBannerInfo?.depositPriority}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_WithDrawal_Priority') as string)}</li>
					<li className=''>
						<div
							className={`${vipBannerInfo?.withdrawalPriority ? 'High' : null}`}
						/>
						{vipBannerInfo?.withdrawalPriority}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Service_Support_At_Date') as string)}
					</li>
					<li className=''>
						<div
							className={`${vipBannerInfo?.serviceSupport ? 'High' : null}`}
						/>
						{vipBannerInfo?.serviceSupport}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Designated_Account_Manager') as string)}
					</li>
					<li
						className={`${
							vipBannerInfo?.designatedAccountManager ? 'High' : null
						}`}
					/>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Withdrawal_Limitation') as string)}
					</li>
					<li>
						{numberFormat(
							Number(vipBannerInfo?.withdrawalMax.split('.')[0]),
							currencyId,
							0
						)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(t('Label_Vip_Daily_Transactions_Count') as string)}
					</li>
					<li>{vipBannerInfo?.times}</li>
				</ul>
			</div>
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>
						{capitalize(t('Label_Vip_Exclusive_Bonus') as string)}
						{t(`Label_General_Currency_${currencyId}`)}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Tier_UpGrade_Bonus') as string)}</li>
					<li className=''>
						{vipBannerInfo?.upBonus
							? numberFormat(
									Number(vipBannerInfo?.upBonus.split('.')[0]),
									currencyId,
									0
							  )
							: null}
					</li>
				</ul>
			</div>
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Special_Rebate') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Sport_Rebate') as string)}</li>
					<li className=''>{vipBannerInfo?.rebateCategory[0]?.percentage}%</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Live_Casino_Rebate') as string)}</li>
					<li className=''>{vipBannerInfo?.rebateCategory[2]?.percentage}%</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Slot_Fishing_Rebate') as string)}</li>
					<li className=''>{vipBannerInfo?.rebateCategory[1]?.percentage}%</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Virtual_Sport_Rebate') as string)}</li>
					<li className=''>{vipBannerInfo?.rebateCategory[3]?.percentage}%</li>
				</ul>
			</div>
			<div className='viptable-item'>
				<ul className='viptable-item-title'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus_Program') as string)}</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>{capitalize(t('Label_Vip_Referral_Bonus') as string)}</li>
					<li className={`${vipBannerInfo?.referralBonus ? 'High' : null}`} />
				</ul>
			</div>
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
					<li className=''>
						{vipBannerInfo?.upDeposit
							? numberFormat(
									Number(vipBannerInfo?.upDeposit.split('.')[0]),
									currencyId,
									0
							  )
							: null}
					</li>
				</ul>
			</div>
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
					<li className=''>
						{vipBannerInfo?.downDeposit &&
						Number(vipBannerInfo?.downDeposit) !== 0
							? numberFormat(
									Number(vipBannerInfo?.downDeposit.split('.')[0]),
									currencyId,
									0
							  )
							: null}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Minimum_Turnover_Within_Validity_Period') as string
						)}
					</li>
					<li className=''>
						{vipBannerInfo?.downTurnover &&
						Number(vipBannerInfo?.downTurnover) !== 0
							? numberFormat(
									Number(vipBannerInfo?.downTurnover.split('.')[0]),
									currencyId,
									0
							  )
							: null}
					</li>
				</ul>
				<ul className='viptable-item-text'>
					<li>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') as string
						)}
					</li>
					<li className=''>
						{vipBannerInfo?.rankingValidityMembershipRenewal}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default VipTable
