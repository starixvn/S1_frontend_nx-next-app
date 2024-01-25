import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Image from 'next/future/image'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { numberFormat } from '@nx-next-app/utils'
import {
	useGetMsgCountQuery,
	useGetPopupMsgQuery,
	useGetCustVIPProgressQuery,
} from '@nx-next-app/service'

const Profile = () => {
	const { t } = useTranslation()

	const {
		userInfo: { currencyId, langId, userName, currencyName },
	} = useAuth()

	const { data: { data: popupMsg } = {} } = useGetPopupMsgQuery(null)
	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null)

	const { data: { data: custVIPProgress } = {} } =
		useGetCustVIPProgressQuery(null)

	const {
		totalWalletBalance,
		custBonusWalletList,
		tpWalletBalanceList,
		mainWalletInfo: { balance: mainWalletBalance } = {},
	} = useTpWalletBalanceListFetcher({ langId })

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		upDeposit = 0,
		currentVipLevel = 0,
		actualDeposit = 0,
	} = custVIPProgress || {}

	const isVipLevelHighest = upDeposit === null
	const currentVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel - 1]
	const nextVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel]

	const { headerUrl, levelTabsName, settingDisplayKey } =
		currentVipLevelInfo || {}
	const levelText = t(settingDisplayKey || '')

	return (
		<>
			<div className='menu-top'>
				<div className='menu-top-profile'>
					<div className='profile-item'>
						<div>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/profile-2.png`}
								width={31}
								height={31}
								alt='profile'
							/>
							<div>
								<div>
									<span>{t('Label_General_Hello')},</span> {userName}
								</div>
								<Link href={paths.profile.root}>
									<a>{t('Label_Setting_Edit')}</a>
								</Link>
							</div>
						</div>
						<Link href={paths.message.root}>
							<a className={classNames('message', { active: msgCount > 0 })}>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/message-2.png`}
									width={23}
									height={23}
									alt='message'
								/>
								{popupMsg?.id && (
									<div className='message-popup'>
										<div>{popupMsg?.popupMessage}</div>
									</div>
								)}
							</a>
						</Link>
					</div>
				</div>
				<div className='menu-top-balance'>
					<div>{t('Label_General_Balance')}</div>
					<div>
						{currencyName} {numberFormat(totalWalletBalance, currencyId)}
						<Link href={paths.deposit.root}>
							<a>{t('Label_General_Deposit')}</a>
						</Link>
					</div>
				</div>
			</div>
			<div className='wallet-box'>
				<div className='wallet-list'>
					<div>
						<div className='wallet-list-item main-wallet'>
							{t('Label_Wallet_MainWallet')}
							<div>
								{currencyName}{' '}
								{numberFormat(Number(mainWalletBalance), currencyId)}
							</div>
						</div>
						{tpWalletBalanceList?.map(({ tpId, balance, tpName }) => (
							<div className='wallet-list-item ninewallet' key={tpId}>
								{tpName}
								<div>
									{currencyName} {numberFormat(balance, currencyId)}
								</div>
							</div>
						))}
						{includes(ALLOWED_CURRENCIES['TRANSFER'], currencyId) && (
							<Link href={paths.transferFunds.root}>
								<a>{t('Label_General_Transfer')}</a>
							</Link>
						)}
					</div>
				</div>
				<div className='bank-list'>
					<Link href={paths.withdrawal.root}>
						<a>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/withdrawal-2.png`}
								width={39}
								height={39}
								alt='withdrawal'
							/>
							<div>{t('Label_General_Withdrawal')}</div>
						</a>
					</Link>
					<Link href={paths.statement.root}>
						<a>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/statement.png`}
								width={39}
								height={39}
								alt='statement'
							/>
							<div>{t('Label_General_Statement')}</div>
						</a>
					</Link>
					<Link href={paths.financialLog.root}>
						<a>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/financial.png`}
								width={39}
								height={39}
								alt='financial'
							/>
							<div>{t('Label_General_FinancialLog')}</div>
						</a>
					</Link>
					<Link href={paths.bankInfo.root}>
						<a>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/bankinfo.png`}
								width={39}
								height={39}
								alt='bankinfo'
							/>
							<div>{t('Label_General_BankInfo')}</div>
						</a>
					</Link>
				</div>
				{custBonusWalletList && custBonusWalletList?.length > 0 && (
					<div className='casino-wallet'>
						{custBonusWalletList?.map(
							({ bonus, bonusId, turnover, rollover, promoCategoryId }) => {
								const percentage =
									turnover > rollover
										? 100
										: ((turnover / rollover) * 100).toFixed(2)
								return (
									<div key={bonusId} className='casino-wallet-item'>
										<div className='money'>
											<div>{t(`Label_BonusWallet_${promoCategoryId}`)}</div>
											<div>
												{currencyName} {numberFormat(bonus, currencyId)}
											</div>
										</div>
										<div className='progress'>
											<div
												className='progress-bar'
												style={{
													width: `${percentage}%`,
												}}
											/>
										</div>
										<div className='progress-number'>{percentage}%</div>
									</div>
								)
							}
						)}
					</div>
				)}
			</div>
			{includes(ALLOWED_CURRENCIES['VIP'], currencyId) && (
				<div className={classNames('menu-vip', levelTabsName)}>
					<div className='left'>
						<div>{t('Label_VIP_YourVIPIs')}</div>
						<div>{levelText}</div>
						<div>
							{numberFormat(actualDeposit, currencyId)}
							<div>/{numberFormat(Number(upDeposit), currencyId)}</div>
						</div>
					</div>
					<div className='right'>
						<Image
							src={headerUrl as string}
							width={66}
							height={66}
							alt={levelTabsName as string}
						/>
						{!isVipLevelHighest && (
							<>
								<div className='dot-progress'>
									<div className='progress-bar-vertical'>
										<div className='progress-now-vertical' />
									</div>
								</div>
								<Image
									src={nextVipLevelInfo?.headerUrl as string}
									width={66}
									height={66}
									alt={nextVipLevelInfo?.levelTabsName as string}
								/>
							</>
						)}
					</div>
					{isVipLevelHighest ? (
						<div className='vip-text'>
							{t('Label_Vip_ReachedTheHighestLevel')}
						</div>
					) : (
						<Link href={paths.vip.root}>
							<a className='vip-text next'>{t('Label_Vip_NextMilestone')}</a>
						</Link>
					)}
				</div>
			)}
		</>
	)
}

export default Profile
