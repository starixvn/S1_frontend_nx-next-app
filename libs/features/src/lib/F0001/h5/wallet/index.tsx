import { Header, SpinButton } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { WrapperMyWalletH5 } from '@nx-next-app/features/F0001/h5/wallet/styles'
import { useWalletAllowed } from '@nx-next-app/features/F0001/hooks'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { numFormatToDigits } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface IWalletPageProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const Wallet = ({ withdrawalBlockSetting }: IWalletPageProps) => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const {
		userInfo: { langId, currencyId, currencyName },
	} = useAuth()

	const {
		cardAllowed: { bankCardAllowed, eWalletCardAllowed },
	} = useWalletAllowed({ withdrawalBlockSetting })

	const {
		mainWalletInfo,
		totalWalletBalance,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId })

	let bankInfoPath
	if (!bankCardAllowed)
		bankInfoPath = eWalletCardAllowed
			? paths.eWallet.root
			: paths.cryptoWallet.root

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.wallet.root, label: t('Label_General_MyWallet') },
						{
							href: bankInfoPath || paths.bankInfo.root,
							label: t('Label_General_BankInfo'),
						},
					]}
				/>
			</Header>
			<WrapperMyWalletH5>
				<main className='main'>
					<div className='walletTotal'>
						<div className='group-wallet'>
							<i className='icon icon-empty-wallet' />
							<span>{currencyName}</span>
							<span>{numFormatToDigits(totalWalletBalance)}</span>
						</div>
						<SpinButton
							className='icon icon-refresh-fill clickBtn'
							onClick={onRefetchAllWallet}
						/>
					</div>
					<div className='account acount-input'>
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
					<div className='btnGroup'>
						<Link href={paths.deposit.root} passHref>
							<a className='btn-secondary'>
								<i
									className='icon icon-bank-fill'
									style={{ marginRight: '5px' }}
								/>
								{t('Label_General_Deposit')}
							</a>
						</Link>
						{includes(
							ALLOWED_CURRENCIES['TRANSFER'] as CurrenciesEnum[],
							currencyId
						) && (
							<Link href={paths.transferFunds.root} passHref>
								<a className='btn-primary'>{t('Label_General_Transfer')}</a>
							</Link>
						)}
					</div>
				</main>
			</WrapperMyWalletH5>
		</>
	)
}

export default Wallet
