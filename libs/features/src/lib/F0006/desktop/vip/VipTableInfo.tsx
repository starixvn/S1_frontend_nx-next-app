import { useAuth } from '@nx-next-app/data-access'
import { IF0006VipProgram } from '@nx-next-app/features/F0006/types/vip'
import { VipLevelEnum } from '@nx-next-app/types'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipTableInfoProps {
	settings: IF0006VipProgram[]
}

const VipTableInfo = ({ settings }: IVipTableInfoProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	return (
		<table className='eventList'>
			<tbody>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Service_Support') || '')}
					</td>
					<td colSpan={6}>{t('Label_Vip_Tier')}</td>
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Deposit_Priority') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.depositPriority && <i className='icon icon-checkmark' />}
							{item?.depositPriority && t('Label_High')}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_WithDrawal_Priority') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.withdrawalPriority && (
								<i className='icon icon-checkmark' />
							)}
							{item?.withdrawalPriority && t('Label_High')}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Service_Support_At_Date') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.vipLiveChat && <i className='icon icon-checkmark' />}
							{item?.vipLiveChat && t('Label_High')}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Designated_Account_Manager') || '')}</td>
					{/* 目前沒有叉叉 */}
					{settings?.map(item => (
						<td key={item.level}>
							{item?.designatedAccountManager && (
								<i className='icon icon-checkmark' />
							)}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalize(t('Label_Vip_Daily_Withdrawal_Limitation') || '')}
					</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.level === VipLevelEnum.Highest ||
							Number(item?.apiData?.withdrawalMax) === 0
								? t('Label_Vip_Unlimited')
								: numberFormatExcludeString(item?.apiData?.withdrawalMax)}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Daily_Transactions_Count') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{Number(item?.apiData?.times) === 0
								? t('Label_Vip_Unlimited')
								: numberFormatExcludeString(item?.apiData?.times)}
						</td>
					))}
				</tr>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Exclusive_Bonus') || '')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Tier_UpGrade_Bonus') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.level === VipLevelEnum.Highest
								? t('Label_Vip_ByInvitation')
								: item?.apiData?.upBonus &&
								  numberFormatExcludeString(item?.apiData?.upBonus)}
						</td>
					))}
				</tr>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Special_Rebate') || '')}
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Sport_Rebate') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.rebateCategory[0]?.percentage}%
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Live_Casino_Rebate') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.rebateCategory[2]?.percentage}%
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Slot_Fishing_Rebate') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.rebateCategory[1]?.percentage}%
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Virtual_Sport_Rebate') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.rebateCategory[3]?.percentage}%
						</td>
					))}
				</tr>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Referral_Bonus_Program') || '')}
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Referral_Bonus') || '')}</td>
					{/* 沒有叉叉 */}
					{settings?.map(item => (
						<td key={item.level}>
							{item?.referralBonus && <i className='icon icon-checkmark' />}
						</td>
					))}
				</tr>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Tire_Upgrade_Requirement') || '')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Monthly_Minimum_Deposit') || '')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.level === VipLevelEnum.Highest
								? t('Label_Vip_ByInvitation')
								: item?.apiData?.upDeposit &&
								  numberFormatExcludeString(item?.apiData?.upDeposit)}
						</td>
					))}
				</tr>
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Tier_Maintenance_Requirement') || '')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>
						{capitalize(
							t('Label_Vip_Minimum_Deposit_Within_Validity_Period') || ''
						)}
					</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.level === VipLevelEnum.Highest
								? t('Label_Vip_ByInvitation')
								: item?.apiData?.downDeposit &&
								  Number(item?.apiData?.downDeposit) !== 0 &&
								  numberFormatExcludeString(item?.apiData?.downDeposit)}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalize(
							t('Label_Vip_Minimum_Turnover_Within_Validity_Period') || ''
						)}
					</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.level === VipLevelEnum.Highest
								? t('Label_Vip_ByInvitation')
								: item?.apiData?.downTurnover &&
								  Number(item?.apiData?.downTurnover) !== 0 &&
								  numberFormatExcludeString(item?.apiData?.downTurnover)}
						</td>
					))}
				</tr>
				<tr className='lastTd'>
					<td>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') || ''
						)}
					</td>
					{settings?.map(item => (
						<td key={item.level}>{t(item.membershipRenewal)}</td>
					))}
				</tr>
			</tbody>
		</table>
	)
}

export default VipTableInfo
