import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { RebateCategoryEnum } from '@nx-next-app/service'
import { IOneTwoBetVipProgram } from '@nx-next-app/site/onetwobet'
import { IImageData } from '@nx-next-app/types'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { some } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface IVipTableProps {
	settings: IOneTwoBetVipProgram[]
	lastUpdateTime: string
}

const VipTable = ({ settings, lastUpdateTime }: IVipTableProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const {
		CURRENCY_TO_TIMEZONE,
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
		VIP_CLUB_IMAGES,
	} = useStaticData()
	const [activeTab, setActiveTab] = useState<number>(
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)[0].level
	)
	const {
		depositPriority,
		withdrawalPriority,
		vipLiveChat,
		designatedAccountManager,
		weeklyBonus,
		depositRebate,
		lossRebate,
		rewardPointsMultiplier,
		membershipRenewal,
		referralBonus,
		apiData,
	} = settings.find(({ level }) => level === activeTab)

	const serviceSupport = [
		{
			resourceKey: 'Label_Vip_Deposit_Priority',
			contentFn: () => <li>{depositPriority && t('Label_High')}</li>,
		},
		{
			resourceKey: 'Label_Vip_WithDrawal_Priority',
			contentFn: () => <li>{withdrawalPriority && t('Label_High')}</li>,
		},
		{
			resourceKey: 'Label_Vip_LiveChat',
			contentFn: () => <li>{vipLiveChat && t('Label_High')}</li>,
		},
		{
			resourceKey: 'Label_Vip_Priority_Access_VIP_Services',
			contentFn: () => (
				<li
					className={classNames({
						High: designatedAccountManager,
					})}
				/>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Withdrawal_Limitation',
			contentFn: () => (
				<li>
					{numberFormatExcludeString(apiData?.withdrawalMax) === '0'
						? t('Label_Vip_Unlimited')
						: numberFormatExcludeString(apiData?.withdrawalMax)}
				</li>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Transactions_Count',
			contentFn: () => (
				<li>
					{apiData?.times === '0' ? t('Label_Vip_Unlimited') : apiData?.times}
				</li>
			),
		},
	]

	const specialOffer = [
		{
			resourceKey: 'Label_Vip_Weekly_Bonus',
			contentFn: () => <li>{weeklyBonus}%</li>,
		},
		{
			resourceKey: 'Label_Vip_Deposit_Rebate',
			contentFn: () => <li>{depositRebate}%</li>,
		},
		{
			resourceKey: 'Label_Vip_Loss_Rebate',
			contentFn: () => <li>{lossRebate}%</li>,
		},
		{
			resourceKey: 'Label_Vip_Reward_Points_Multiplier',
			contentFn: () => <li>x{rewardPointsMultiplier}</li>,
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
		<div className='vipPage'>
			<div className='text'>
				{t('Label_Vip_LastUpdated')}
				{dayjs(lastUpdateTime)
					.utc()
					.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
					?.format('L') ?? ''}
			</div>

			<div className='medal'>
				{VIP_CLUB_IMAGES.filter(item =>
					some(settings, x => x.level === item.level)
				).map(({ displayKey, level }: IImageData) => (
					<div
						key={`VIPLevelList-${displayKey}`}
						className={classNames('medal-item', {
							active: level === activeTab,
						})}
						onClick={() => setActiveTab(level as number)}
					>
						<div className={`medal-icon vip${level}`} />
						<div>{t(displayKey as string)}</div>
					</div>
				))}
			</div>

			<div className='viptable'>
				{/* === Service support ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>{t('Label_Vip_Service_Support')}</li>
					</ul>
					{serviceSupport.map(x => (
						<ul key={x.resourceKey} className='viptable-item-text'>
							<li>{t(x.resourceKey)}</li>
							{x.contentFn()}
						</ul>
					))}
				</div>

				{/* === Exclusive bonus(Currency) ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>
							{t('Label_Vip_Exclusive_Bonus')}
							{t(`Label_General_Currency_${currencyId}`)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Tier_UpGrade_Bonus')}</li>
						<li>
							{apiData?.upBonus && numberFormatExcludeString(apiData?.upBonus)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Tier_UpGrade_RewardPoints') as string}</li>
						<li>
							{apiData?.upRewardPoint &&
								numberFormatExcludeString(apiData?.upRewardPoint)}
						</li>
					</ul>
				</div>

				{/* === Special Offer ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>{t('Label_Vip_Special_Offer')}</li>
					</ul>
					{specialOffer.map(x => (
						<ul key={x.resourceKey} className='viptable-item-text'>
							<li>{t(x.resourceKey)}</li>
							{x.contentFn()}
						</ul>
					))}
				</div>

				{/* === Special rebate ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>{t('Label_Vip_Special_Rebate')}</li>
					</ul>
					{speicalReate.map(x => (
						<ul key={x.rebateEnum} className='viptable-item-text'>
							<li>{t(x.resourceKey)}</li>
							<li>{apiData?.rebateCategory[x.rebateEnum]?.percentage}%</li>
						</ul>
					))}
				</div>

				{/* === Referral bonus program ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>{t('Label_Vip_Referral_Bonus_Program')}</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Referral_Bonus')}</li>
						<li className={`${referralBonus ? 'High' : null}`} />
					</ul>
				</div>

				{/* === Tier upgrade requirement(Currency) ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>
							{t('Label_Vip_Tire_Upgrade_Requirement')}
							{t(`Label_General_Currency_${currencyId}`)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Deposit_Requirement')}</li>
						<li>
							{apiData?.upDeposit &&
								numberFormatExcludeString(apiData?.upDeposit)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Turnover_Requirement')}</li>
						<li>
							{apiData?.upTurnover &&
								numberFormatExcludeString(apiData?.upTurnover)}
						</li>
					</ul>
				</div>

				{/* === Tier maintenance requirement(Currency) ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>
							{t('Label_Vip_Tier_Maintenance_Requirement')}
							{t(`Label_General_Currency_${currencyId}`)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Retain_Deposit')}</li>
						<li>
							{apiData?.downDeposit &&
								Number(apiData?.downDeposit) !== 0 &&
								numberFormatExcludeString(apiData?.downDeposit)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Retain_Turnover')}</li>
						<li>
							{apiData?.downTurnover &&
								Number(apiData?.downTurnover) !== 0 &&
								numberFormatExcludeString(apiData?.downTurnover)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{t('Label_Vip_Ranking_Validity_Membership_Renewal')}</li>
						<li>{t(membershipRenewal)}</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export { VipTable }
