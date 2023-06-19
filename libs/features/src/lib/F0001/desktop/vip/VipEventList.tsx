import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { uniqueId } from 'lodash-es'
import { IStaticVipEventCurrenciesLimitationInfo } from '@nx-next-app/types'

const VipEventList = ({
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
}: {
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IStaticVipEventCurrenciesLimitationInfo
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const vipEventLimitationInfo =
		VIP_EVENT_CURRENCIES_LIMITATION_INFO[currencyId]

	const {
		dailyWithdrawalLimitation = [],
		tierUpGradeBonus = [],
		monthlyMinimumDeposit = [],
		minimumDepositWithinValidityPeriod = [],
		minimumTurnoverWithinValidityPeriod = [],
	} = vipEventLimitationInfo ?? {}

	return (
		<table className='eventList'>
			<tbody>
				<tr className='title'>
					<td className='icon icon-nova88'>{t('Label_Vip_Service_Support')}</td>
					<td colSpan={6}>{t('Label_Vip_Tier')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Deposit_Priority')}</td>
					<td />
					<td />
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_WithDrawal_Priority')}</td>
					<td />
					<td />
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Service_Support_At_Date')}</td>
					<td />
					<td />
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
					<td>{t('Label_Vip_High')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Designated_Account_Manager')}</td>
					<td />
					<td />
					<td />
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Daily_Withdrawal_Limitation')}</td>
					{dailyWithdrawalLimitation.map(val => (
						<td key={uniqueId()}>{val && numberFormat(val, currencyId, 0)}</td>
					))}
					<td>{t('Label_General_Unlimited')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Daily_Transactions_Count')}</td>
					<td>10</td>
					<td>10</td>
					<td>15</td>
					<td>15</td>
					<td>20</td>
					<td>{t('Label_General_Unlimited')}</td>
				</tr>
				<tr className='title'>
					<td className='icon icon-nova88'>
						{t('Label_Vip_Exclusive_Bonus')}{' '}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Tier_UpGrade_Bonus')}</td>
					{tierUpGradeBonus.map(val => (
						<td key={uniqueId()}>{val && numberFormat(val, currencyId, 0)}</td>
					))}
					<td>{t('Label_Vip_By_Invitation')}</td>
				</tr>
				<tr className='title'>
					<td className='icon icon-nova88'>{t('Label_Vip_Special_Rebate')}</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Sport_Rebate')}</td>
					<td>0.50%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Live_Casino_Rebate')}</td>
					<td>0.30%</td>
					<td>0.50%</td>
					<td>0.60%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Slot_Fishing_Rebate')}</td>
					<td>0.50%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Virtual_Sport_Rebate')}</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.10%</td>
					<td>1.20%</td>
					<td>1.50%</td>
				</tr>
				<tr className='title'>
					<td className='icon icon-nova88'>
						{t('Label_Vip_Referral_Bonus_Program')}
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Referral_Bonus')}</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
					<td>
						<i className='icon icon-checkmark' />
					</td>
				</tr>
				<tr className='title'>
					<td className='icon icon-nova88'>
						{t('Label_Vip_Tire_Upgrade_Requirement')}{' '}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Monthly_Minimum_Deposit')}</td>
					{monthlyMinimumDeposit.map(val => (
						<td key={uniqueId()}>{val && numberFormat(val, currencyId, 0)}</td>
					))}
					<td>{t('Label_Vip_By_Invitation')}</td>
				</tr>
				<tr className='title'>
					<td className='icon icon-nova88'>
						{t('Label_Vip_Tier_Maintenance_Requirement')}{' '}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Minimum_Deposit_Within_Validity_Period')}</td>
					{minimumDepositWithinValidityPeriod.map(val => (
						<td key={uniqueId()}>{val && numberFormat(val, currencyId, 0)}</td>
					))}
					<td>{t('Label_Vip_By_Invitation')}</td>
				</tr>
				<tr>
					<td>{t('Label_Vip_Minimum_Turnover_Within_Validity_Period')}</td>
					{minimumTurnoverWithinValidityPeriod.map(val => (
						<td key={uniqueId()}>{val && numberFormat(val, currencyId, 0)}</td>
					))}
					<td>{t('Label_Vip_By_Invitation')}</td>
				</tr>
				<tr className='lastTd'>
					<td>{t('Label_Vip_Ranking_Validity_Membership_Renewal')}</td>
					<td>{t('Label_Vip_Normal')}</td>
					<td>{t('Label_Vip_Lifetime')}</td>
					<td>{t('Label_Vip_3Months')}</td>
					<td>{t('Label_Vip_3Months')}</td>
					<td>{t('Label_Vip_3Months')}</td>
					<td>{t('Label_Vip_By_Invitation')}</td>
				</tr>
			</tbody>
		</table>
	)
}

export default VipEventList
