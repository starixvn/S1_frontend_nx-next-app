import { SpinButton } from '@nx-next-app/components/D0001'
import { TransferWalletTpId } from '@nx-next-app/constants'
import { useTransferFunds } from '@nx-next-app/features/F0001/providers'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const WalletList = () => {
	const { t } = useTranslation()

	const {
		handleRestoreAll,
		mainWalletInfo,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTransferFunds()

	return (
		<div className='walletModule'>
			<div className='walletType'>
				<div className='walletBalanceModule'>
					<span className='icon icon-icon32px_Main-Wallet'>
						{t('Label_Wallet_MainWallet')}
					</span>
					<span>{numFormatToDigits(mainWalletInfo?.balance ?? 0)}</span>
					<div className='btnGroup'>
						<button
							type='button'
							className='secondary'
							onClick={() => {
								handleRestoreAll({
									walletTpId: TransferWalletTpId.mainWallet,
								})
							}}
						>
							{t('Label_TransferFunds_RestoreAll')}
						</button>
					</div>
				</div>

				{tpWalletBalanceList.map(({ tpId, tpName, balance }) => (
					<div className='walletBalanceModule' key={tpId}>
						<span className='icon icon-icon32px_Sportsbook-Wallet'>
							{tpName}
						</span>
						<span>{numFormatToDigits(balance)}</span>
						<div className='btnGroup'>
							<button
								type='button'
								className='secondary'
								onClick={() => {
									handleRestoreAll({ walletTpId: tpId })
								}}
							>
								{t('Label_TransferFunds_RestoreAll')}
							</button>
						</div>
					</div>
				))}
			</div>
			<SpinButton onClick={onRefetchAllWallet} />
		</div>
	)
}

export { WalletList }
