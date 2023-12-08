import { useTranslation } from 'next-i18next'
import { numFormatToDigits } from '@nx-next-app/utils'
import { TransferWalletTpId } from '@nx-next-app/constants'
import { SpinButton } from '@nx-next-app/components/D0002'
import { useTransferFunds } from '@nx-next-app/features/F0002/providers'

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
							className='orange'
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
								className='orange'
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
