import { useCryptoWallet } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const cryptoWalletLimit = 3

const AddWallet = () => {
	const { t } = useTranslation()

	const { USDTDetail, handleAddWallet } = useCryptoWallet()

	return (
		<div className='walletModule'>
			<div className='addBank'>
				{USDTDetail.length === cryptoWalletLimit ? (
					<div className='addBankName noBank'>
						<div className='icon icon-warning' />
						<div>{t('Label_Wallet_Is_Full')}</div>
					</div>
				) : (
					<div className='addBankName noBank ' onClick={handleAddWallet}>
						<div className='icon icon-add-fill' />
						<div className='txt-blue'>
							{t('Label_CryptoWallet_AddCryptoWallet')}
						</div>
					</div>
				)}
				<div className='remainder'>
					{t('Label_CryptoWallet_NumberOfWallet')}:{USDTDetail.length}/3
				</div>
				<div className='tip active'>
					{t('Label_CryptoWallet_CryptoWalletSubmitNote')}
				</div>
			</div>
		</div>
	)
}

export { AddWallet }
