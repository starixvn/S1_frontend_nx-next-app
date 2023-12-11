import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { Header, SpinButton } from '@nx-next-app/components/H0006'

const Wallet = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const {
		userInfo: { langId, currencyId, currencyName },
	} = useAuth()

	const {
		mainWalletInfo,
		totalWalletBalance,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId })

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.wallet.root, label: t('Label_General_MyWallet') },
						{ href: paths.bankInfo.root, label: t('Label_General_BankInfo') },
					]}
				/>
			</Header>
			<main className='main'>
				<div className='walletTotal'>
					<div className='icon icon-icon32px_wallet'>
						<span>{currencyName}</span>
						<span>{numFormatToDigits(totalWalletBalance)}</span>
					</div>
					<SpinButton
						className='icon icon-spinner11 clickBtn'
						onClick={onRefetchAllWallet}
					/>
				</div>
				<div className='account'>
					<div className='info'>
						<span>{t('Label_Wallet_MainWallet')}</span>
						<div>{numFormatToDigits(mainWalletInfo?.balance ?? 0)}</div>
					</div>
				</div>
				{custBonusWalletList?.map(
					({ turnover, rollover, promoCategoryId, bonus, tpId }) => {
						const percentage =
							turnover > rollover
								? 100
								: ((turnover / rollover) * 100).toFixed(2)
						return (
							<div className='account' key={tpId}>
								<div className='info'>
									<span>
										{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}
									</span>
									<div>{numFormatToDigits(bonus ?? 0)}</div>
								</div>
								<div className='progressBarModule'>
									<div className='percentage'>{percentage} %</div>
									<div className='bar'>
										<div
											className='progress'
											style={{ width: `${percentage}%` }}
										/>
									</div>
								</div>
							</div>
						)
					}
				)}
				{tpWalletBalanceList.map(({ tpName, balance, tpId }) => (
					<div className='account' key={tpId}>
						<div className='info'>
							<span>{tpName}</span>
							<div>{numFormatToDigits(balance ?? 0)}</div>
						</div>
					</div>
				))}
				<div className='btn-group'>
					<Link href={paths.deposit.root} passHref>
						<a className='icon icon-deposit white'>
							{t('Label_General_Deposit')}
						</a>
					</Link>
					{includes(
						ALLOWED_CURRENCIES['TRANSFER'] as CurrenciesEnum[],
						currencyId
					) && (
						<Link href={paths.transferFunds.root} passHref>
							<a className='icon icon-transfer white'>
								{t('Label_General_Transfer')}
							</a>
						</Link>
					)}
				</div>
			</main>
		</>
	)
}

export default Wallet
