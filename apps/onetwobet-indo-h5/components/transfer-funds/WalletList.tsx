import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { SpinButton } from '@nx-next-app/components/H0001'
import { TransferWalletTpId } from '@nx-next-app/constants'
import { useTransferFunds } from '@nx-next-app/operations'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const WalletList = () => {
	const { t } = useTranslation()
	const {
		handleRestoreAll,
		handleGetMainWalletInfo,
		handleGetTpWalletInfoByTpId,
		mainWalletInfo,
		tpWalletBalanceList,
	} = useTransferFunds() || {}

	const { modal } = useGlobalModal()

	const handleError = (message: string) => {
		modal.error(message) // 顯示錯誤信息
	}

	return (
		<>
			<div className='account'>
				<div className='info'>
					<span className='title'>{t('Label_Wallet_MainWallet')}</span>
					<div>{numFormatToDigits(mainWalletInfo?.balance ?? 0)}</div>
				</div>
				<div className='btn-group transferAll'>
					<SpinButton
						className='icon icon-spinner11 clickBtn'
						onClick={() => handleGetMainWalletInfo(handleError)}
					/>
					<button
						type='button'
						className='red ghost gold'
						onClick={() => {
							handleRestoreAll({ walletTpId: TransferWalletTpId.mainWallet })
						}}
					>
						<div>{t('Label_TransferFunds_RestoreAll')}</div>
					</button>
				</div>
			</div>
			{tpWalletBalanceList?.map(({ tpId, tpName, balance }) => (
				<div className='account' key={tpId}>
					<div className='info'>
						<span className='title'>{tpName}</span>
						<div>{numFormatToDigits(balance)}</div>
					</div>
					<div className='btn-group transferAll'>
						<SpinButton
							className='icon icon-spinner11 clickBtn'
							onClick={() => {
								handleGetTpWalletInfoByTpId(handleError, tpId)
							}}
						/>
						<button
							type='button'
							className='red ghost gold'
							onClick={() => {
								handleRestoreAll({ walletTpId: tpId })
							}}
						>
							<div>{t('Label_TransferFunds_RestoreAll')}</div>
						</button>
					</div>
				</div>
			))}
		</>
	)
}

export { WalletList }
