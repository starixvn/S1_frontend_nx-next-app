import { useAuth } from '@nx-next-app/data-access'
import { RebateCategoryEnum } from '@nx-next-app/service'
import { IOneTwoBetVipProgram } from '@nx-next-app/site/onetwobet'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

interface IVipTableInfoProps {
	settings: IOneTwoBetVipProgram[]
}

const VipTableInfo = ({ settings }: IVipTableInfoProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const serviceSupport = [
		{
			resourceKey: 'Label_Vip_Deposit_Priority',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{x?.depositPriority && <i className='icon icon-checkmark' />}
						{x.depositPriority && t('Label_High')}
					</td>
				)),
		},
		{
			resourceKey: 'Label_Vip_WithDrawal_Priority',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{x?.withdrawalPriority && <i className='icon icon-checkmark' />}
						{x?.withdrawalPriority && t('Label_High')}
					</td>
				)),
		},
		{
			resourceKey: 'Label_Vip_LiveChat',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{x?.vipLiveChat && <i className='icon icon-checkmark' />}
						{x?.vipLiveChat && t('Label_High')}
					</td>
				)),
		},
		{
			resourceKey: 'Label_Vip_Priority_Access_VIP_Services',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{x?.designatedAccountManager && (
							<i className='icon icon-checkmark' />
						)}
					</td>
				)),
		},
		{
			resourceKey: 'Label_Vip_Daily_Withdrawal_Limitation',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{numberFormatExcludeString(x?.apiData?.withdrawalMax) === '0'
							? t('Label_Vip_Unlimited')
							: numberFormatExcludeString(x?.apiData?.withdrawalMax)}
					</td>
				)),
		},
		{
			resourceKey: 'Label_Vip_Daily_Transactions_Count',
			contentFn: () =>
				settings.map(x => (
					<td key={x.level}>
						{x?.apiData?.times === '0'
							? t('Label_Vip_Unlimited')
							: x?.apiData?.times}
					</td>
				)),
		},
	]

	const specialOffer = [
		{
			resourceKey: 'Label_Vip_Weekly_Bonus',
			contentFn: () =>
				settings.map(x => <td key={x.level}>{x?.weeklyBonus}%</td>),
		},
		{
			resourceKey: 'Label_Vip_Deposit_Rebate',
			contentFn: () =>
				settings.map(x => <td key={x.level}>{x?.depositRebate}%</td>),
		},
		{
			resourceKey: 'Label_Vip_Loss_Rebate',
			contentFn: () =>
				settings.map(x => <td key={x.level}>{x?.lossRebate}%</td>),
		},
		{
			resourceKey: 'Label_Vip_Reward_Points_Multiplier',
			contentFn: () =>
				settings.map(x => <td key={x.level}>x{x?.rewardPointsMultiplier}</td>),
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
			resourceKey: 'Label_Vip_Slot_Rebate',
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
						{t('Label_Vip_Service_Support')}
					</td>
					<td colSpan={6}>{t('Label_Vip_Tier')}</td>
				</tr>
				{serviceSupport.map(x => (
					<tr key={x.resourceKey}>
						<td>{t(x.resourceKey)}</td>
						{x.contentFn()}
					</tr>
				))}

				{/* === Exclusive bonus(Currency) ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Exclusive_Bonus')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Tier_UpGrade_Bonus')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.apiData?.upBonus &&
								numberFormatExcludeString(item.apiData?.upBonus)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t('Label_Vip_Tier_UpGrade_RewardPoints')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item.apiData?.upRewardPoint &&
								numberFormatExcludeString(item.apiData?.upRewardPoint)}
						</td>
					))}
				</tr>

				{/* === Special Offer ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Special_Offer')}
					</td>
					<td colSpan={6} />
				</tr>
				{specialOffer.map(x => (
					<tr key={x.resourceKey}>
						<td>{t(x.resourceKey)}</td>
						{x.contentFn()}
					</tr>
				))}

				{/* === Special rebate ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Special_Rebate')}
					</td>
					<td colSpan={6} />
				</tr>
				{speicalReate.map(x => (
					<tr key={x.rebateEnum}>
						<td>{t(x.resourceKey)}</td>
						{settings?.map(item => (
							<td key={item.level}>
								{item?.apiData?.rebateCategory[x.rebateEnum]?.percentage}%
							</td>
						))}
					</tr>
				))}

				{/* === Referral bonus program ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Referral_Bonus_Program')}
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Referral_Bonus')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.referralBonus && <i className='icon icon-checkmark' />}
						</td>
					))}
				</tr>

				{/* === Tier upgrade requirement(Currency) ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Tire_Upgrade_Requirement')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Deposit_Requirement')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.upDeposit &&
								numberFormatExcludeString(item.apiData.upDeposit)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t('Label_Vip_Turnover_Requirement')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.upTurnover &&
								numberFormatExcludeString(item.apiData.upTurnover)}
						</td>
					))}
				</tr>

				{/* === Tier maintenance requirement(Currency) ===  */}
				<tr className='title'>
					<td className={`icon icon-${process.env['NEXT_PUBLIC_SITE_NAME']}`}>
						{t('Label_Vip_Tier_Maintenance_Requirement')}
						<span className='txt-orange'>
							({t(`Label_General_Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan={6} />
				</tr>
				<tr>
					<td>{t('Label_Vip_Retain_Deposit')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.downDeposit &&
								Number(item?.apiData?.downDeposit) !== 0 &&
								numberFormatExcludeString(item.apiData.downDeposit)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t('Label_Vip_Retain_Turnover')}</td>
					{settings?.map(item => (
						<td key={item.level}>
							{item?.apiData?.downTurnover &&
								Number(item?.apiData?.downTurnover) !== 0 &&
								numberFormatExcludeString(item?.apiData.downTurnover)}
						</td>
					))}
				</tr>
				<tr className='lastTd'>
					<td>{t('Label_Vip_Ranking_Validity_Membership_Renewal')}</td>
					{settings.map(item => (
						<td key={item.level}>{t(item.membershipRenewal)}</td>
					))}
				</tr>
			</tbody>
		</table>
	)
}

export { VipTableInfo }
