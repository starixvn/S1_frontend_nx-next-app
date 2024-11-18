import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { RebateCategoryEnum, VipBannerInfo } from '@nx-next-app/service'
import { IImageData } from '@nx-next-app/types'
import { numberFormatExcludeString } from '@nx-next-app/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface IVipTableProps {
	lastUpdateTime: string
	vipBannerData: VipBannerInfo[]
}

const VipTable = ({ lastUpdateTime, vipBannerData }: IVipTableProps) => {
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
	const vipBannerInfo = vipBannerData.find(({ level }) => level === activeTab)

	const serviceSupport = [
		{
			resourceKey: 'Label_Vip_Deposit_Priority',
			contentFn: () => <li>{vipBannerInfo?.depositPriority}</li>,
		},
		{
			resourceKey: 'Label_Vip_WithDrawal_Priority',
			contentFn: () => <li>{vipBannerInfo?.withdrawalPriority}</li>,
		},
		{
			resourceKey: 'Label_Vip_Service_Support_At_Date',
			contentFn: () => <li>{vipBannerInfo?.serviceSupport}</li>,
		},
		{
			resourceKey: 'Label_Vip_Designated_Account_Manager',
			contentFn: () => (
				<li
					className={classNames({
						High: vipBannerInfo?.designatedAccountManager,
					})}
				/>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Withdrawal_Limitation',
			contentFn: () => (
				<li>{numberFormatExcludeString(vipBannerInfo?.withdrawalMax)}</li>
			),
		},
		{
			resourceKey: 'Label_Vip_Daily_Transactions_Count',
			contentFn: () => <li>{vipBannerInfo?.times}</li>,
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
				{VIP_CLUB_IMAGES.map(({ displayKey, level }: IImageData) => (
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
						<li>{capitalize(t('Label_Vip_Service_Support') as string)}</li>
					</ul>
					{serviceSupport.map(x => (
						<ul key={x.resourceKey} className='viptable-item-text'>
							<li>{capitalize(t(x.resourceKey) as string)}</li>
							{x.contentFn()}
						</ul>
					))}
				</div>

				{/* === Exclusive bonus(Currency) ===  */}
				<div className='viptable-item'>
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
					{speicalReate.map(x => (
						<ul key={x.rebateEnum} className='viptable-item-text'>
							<li>{capitalize(t(x.resourceKey) as string)}</li>
							<li>
								{vipBannerInfo?.rebateCategory[x.rebateEnum]?.percentage}%
							</li>
						</ul>
					))}
				</div>

				{/* === Referral bonus program ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>
							{capitalize(t('Label_Vip_Referral_Bonus_Program') as string)}
						</li>
					</ul>
					<ul className='viptable-item-text'>
						<li>{capitalize(t('Label_Vip_Referral_Bonus') as string)}</li>
						<li className={`${vipBannerInfo?.referralBonus ? 'High' : null}`} />
					</ul>
				</div>

				{/* === Tier upgrade requirement(Currency) ===  */}
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
							{vipBannerInfo?.upDeposit &&
								numberFormatExcludeString(vipBannerInfo?.upDeposit)}
						</li>
					</ul>
				</div>

				{/* === Tier maintenance requirement(Currency) ===  */}
				<div className='viptable-item'>
					<ul className='viptable-item-title'>
						<li>
							{capitalize(
								t('Label_Vip_Tier_Maintenance_Requirement') as string
							)}
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
		</div>
	)
}

export { VipTable }
