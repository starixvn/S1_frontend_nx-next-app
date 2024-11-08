import { useAuth } from '@nx-next-app/data-access'
import {
	IVipBannerData,
	RebateCategoryEnum,
	VipBannerInfo,
} from '@nx-next-app/service'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const VipTableInfo = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const serviceSupport = [
		{
			resourceKey: 'Label_Vip_Deposit_Priority',
			contentFn: (x: VipBannerInfo) => (
				<td key={x.level}>
					{x?.depositPriority && <i className='icon icon-checkmark' />}
					{x?.depositPriority}
				</td>
			),
		},
		{
			resourceKey: 'Label_Vip_WithDrawal_Priority',
			contentFn: (x: VipBannerInfo) => (
				<td key={x.level}>
					{x?.withdrawalPriority && <i className='icon icon-checkmark' />}
					{x?.withdrawalPriority}
				</td>
			),
		},
		{
			resourceKey: 'Label_Vip_Service_Support_At_Date',
			contentFn: (x: VipBannerInfo) => (
				<td key={x.level}>
					{x?.serviceSupport && <i className='icon icon-checkmark' />}
					{x?.serviceSupport}
				</td>
			),
		},
		{
			resourceKey: 'Label_Vip_Designated_Account_Manager',
			contentFn: (x: VipBannerInfo) => (
				<td key={x.level}>
					{x?.designatedAccountManager && <i className='icon icon-checkmark' />}
				</td>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Withdrawal_Limitation',
			contentFn: (x: VipBannerInfo) => (
				<td key={x.level}>{numberFormatExcludeString(x.withdrawalMax)}</td>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Transactions_Count',
			contentFn: (x: VipBannerInfo) => <td key={x.level}>{x?.times}</td>,
		},
	]

	const speicalReate = [
		{
			resourceKey: 'Label_Vip_Sport_Rebate',
			rebateEnum: RebateCategoryEnum.Sports,
		},
		{
			resourceKey: 'Label_Vip_Live_Casino_Rebate',
			rebateEnum: RebateCategoryEnum.LiveCasino,
		},
		{
			resourceKey: 'Label_Vip_Slot_Fishing_Rebate',
			rebateEnum: RebateCategoryEnum.Casino,
		},
		{
			resourceKey: 'Label_Vip_Virtual_Sport_Rebate',
			rebateEnum: RebateCategoryEnum.VirtualSports,
		},
		{
			resourceKey: 'Label_Vip_ESport_Rebate',
			rebateEnum: RebateCategoryEnum.ESports,
		},
	]

	return (
		<table className='eventList'>
			<tbody>
				{/* === Service support ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Service_Support') || '')}
					</td>
					<td colSpan={6}>{t('Label_Vip_Tier')}</td>
				</tr>
				{serviceSupport.map(x => (
					<tr key={x.resourceKey}>
						<td>{capitalize(t(x.resourceKey) || '')}</td>
						{vipBannerData?.map(item => x.contentFn(item))}
					</tr>
				))}

				{/* === Exclusive bonus(Currency) ===  */}
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

				{/* === Special rebate ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Special_Rebate') || '')}
					</td>
					<td colSpan={6} />
				</tr>
				{speicalReate.map(x => (
					<tr key={x.rebateEnum}>
						<td>{capitalize(t(x.resourceKey) || '')}</td>
						{vipBannerData?.map(item => (
							<td key={item.level}>
								{item?.rebateCategory[x.rebateEnum]?.percentage}%
							</td>
						))}
					</tr>
				))}

				{/* === Referral bonus program ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{capitalize(t('Label_Vip_Referral_Bonus_Program') || '')}
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{capitalize(t('Label_Vip_Referral_Bonus') || '')}</td>
					{vipBannerData?.map(item => (
						<td key={item.level}>
							{item?.referralBonus && <i className='icon icon-checkmark' />}
						</td>
					))}
				</tr>

				{/* === Tier upgrade requirement(Currency) ===  */}
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

				{/* === Tier maintenance requirement(Currency) ===  */}
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

export { VipTableInfo }
