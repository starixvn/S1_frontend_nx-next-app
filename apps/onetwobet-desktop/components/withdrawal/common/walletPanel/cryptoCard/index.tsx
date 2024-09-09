import { useCryptoWallet, useWithdrawal } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

import { CryptoCardItem } from './CryptoCardItem'

// 因 Crypto 卡片元件跟其他兩種不同，故獨立寫在此區
const CryptoCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		withdrawalAllowed: { cryptoCardAllowed },
	} = useWithdrawal()
	// 與 CryptoWallet 共用
	const { handleAddWallet } = useCryptoWallet()
	const { usdtDetail } = bankData

	if (!cryptoCardAllowed) return null

	return (
		<div className='walletModule'>
			<div className='addBank'>
				{usdtDetail.map(item => (
					<CryptoCardItem key={item.usdtAddress} item={item} />
				))}
				{usdtDetail.length < 3 && (
					<div
						key='add-bank'
						className='addBankName noBank'
						onClick={handleAddWallet}
					>
						<div className='icon icon-plus' />
						<div>{t('Label_Withdrawal_AddCryptoWallet')}</div>
					</div>
				)}
				<div className='remainder'>
					{t('Label_Withdrawal_NumberOfWallet')}:{usdtDetail.length} / 3
				</div>
				<div className='tip active'>
					{t('Label_Withdrawal_CryptoWalletSubmitNote')}
				</div>
			</div>
		</div>
	)
}

export { CryptoCard }
