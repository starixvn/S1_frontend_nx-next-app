import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { IVipBannerData } from '@nx-next-app/service'

const VipTableInfo = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
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
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.depositPriority && <i className='icon icon-checkmark' />}
							{item?.depositPriority}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_WithDrawal_Priority') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.withdrawalPriority && (
								<i className='icon icon-checkmark' />
							)}
							{item?.withdrawalPriority}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Service_Support_At_Date') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.serviceSupport && <i className='icon icon-checkmark' />}
							{item?.serviceSupport}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Designated_Account_Manager') || '')}</td>
					{/* 目前沒有叉叉 */}
					{vipBannerData?.map(item => (
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
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{numberFormatExcludeString(item.withdrawalMax)}
						</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Daily_Transactions_Count') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.times}</td>
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
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.upBonus && numberFormatExcludeString(item.upBonus)}
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
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.rebateCategory[0].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Live_Casino_Rebate') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.rebateCategory[2].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Slot_Fishing_Rebate') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.rebateCategory[1].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Virtual_Sport_Rebate') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.rebateCategory[3].percentage}%</td>
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
					{vipBannerData?.map(item => (
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
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.upDeposit && numberFormatExcludeString(item.upDeposit)}
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
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.downDeposit &&
								Number(item?.downDeposit) !== 0 &&
								numberFormatExcludeString(item.downDeposit)}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalize(
							t('Label_Vip_Minimum_Turnover_Within_Validity_Period') || ''
						)}
					</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.downTurnover &&
								Number(item?.downTurnover) !== 0 &&
								numberFormatExcludeString(item.downTurnover)}
						</td>
					))}
				</tr>
				<tr className='lastTd'>
					<td>
						{capitalize(
							t('Label_Vip_Ranking_Validity_Membership_Renewal') || ''
						)}
					</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>{item?.rankingValidityMembershipRenewal}</td>
					))}
				</tr>
			</tbody>
		</table>
	)
}

export default VipTableInfo
