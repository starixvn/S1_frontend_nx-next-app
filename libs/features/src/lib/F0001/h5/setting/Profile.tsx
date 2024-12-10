import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import {
	useGetCustVIPProgressQuery,
	useGetMsgCountQuery,
	useGetPopupMsgQuery,
} from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

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
							<div className='profile-item-user'>
								<i className='icon icon-user-2-fill' />
							</div>
							<div className='group-user-name'>
								<div className='user-name'>
									<span>{t('Label_General_Hello')},</span> {userName}
								</div>
								<Link href={paths.profile.root}>
									<a>
										{t('Label_Setting_Edit')}
										<i className='icon icon-edit-2-fill' />
									</a>
								</Link>
							</div>
						</div>
						<Link href={paths.message.root}>
							<a className={classNames('message', { active: msgCount > 0 })}>
								<i className='icon icon-mail-fill-mobile' />
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
					<div className='balance-group'>
						<div className='balance-name'>{t('Label_General_Balance')}</div>
						<div className='balance-number'>
							{currencyName} {numberFormat(totalWalletBalance, currencyId, 2)}
						</div>
					</div>
					<div className='btnGroup'>
						<Link href={paths.deposit.root}>
							<a className='btn-primary'>{t('Label_General_Deposit')}</a>
						</Link>
					</div>
				</div>
			</div>
			<div className='wallet-box'>
				<div className='wallet-list'>
					<div>
						<div className='wallet-list-item main-wallet'>
							{t('Label_Wallet_MainWallet')}
							<div className='money-name'>
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
							<i className='icon icon-money-send' />
							<div>{t('Label_General_Withdrawal')}</div>
						</a>
					</Link>
					<Link href={paths.statement.root}>
						<a>
							<i className='icon icon-file-text-fill' />
							<div>{t('Label_General_Statement')}</div>
						</a>
					</Link>
					<Link href={paths.financialLog.root}>
						<a>
							<i className='icon icon-finance1' />
							<div>{t('Label_General_FinancialLog')}</div>
						</a>
					</Link>
					<Link href={paths.bankInfo.root}>
						<a>
							<i className='icon icon-card-pos' />
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
											<div>
												{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}
											</div>
											<div>
												{currencyName} {numberFormat(bonus, currencyId)}
											</div>
										</div>
										<div className='group-progress'>
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
						<div className='vip-text-profile'>{levelText}</div>
						{!isVipLevelHighest && (
							<div>
								{numberFormat(actualDeposit, currencyId)}
								<div>/{numberFormat(Number(upDeposit), currencyId)}</div>
							</div>
						)}
					</div>
					<div className='right'>
						<img src={headerUrl as string} alt={levelTabsName as string} />
						{!isVipLevelHighest && (
							<>
								<div className='dot-progress'>
									<div className='progress-bar-vertical'>
										<div className='progress-now-vertical' />
									</div>
								</div>
								<img
									src={nextVipLevelInfo?.headerUrl as string}
									alt={nextVipLevelInfo?.levelTabsName as string}
								/>
								<Link href={paths.vip.root}>
									<a className='vip-text next'>
										{t('Label_Vip_NextMilestone')}
									</a>
								</Link>
							</>
						)}
						{isVipLevelHighest && (
							<div className='vip-height'>
								{t('Label_Vip_ReachedTheHighestLevel')}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
