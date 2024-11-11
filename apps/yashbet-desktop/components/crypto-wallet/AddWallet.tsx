import { useCryptoWallet } from '@nx-next-app/features/F0006/providers'
import { useTranslation } from 'next-i18next'

const AddWallet = () => {
	const { t } = useTranslation()

	const { USDTDetail, handleAddWallet } = useCryptoWallet()

	return (
		<div className='walletModule'>
			<div className='addBank'>
				<div
					className='addBankName noBank custom-cursor-on-hover'
					onClick={handleAddWallet}
				>
					<div className='icon icon-plus' />
					<div>{t('Label_CryptoWallet_AddCryptoWallet')}</div>
				</div>
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
