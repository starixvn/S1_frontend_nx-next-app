import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { useTranslation } from 'next-i18next'
import { CardItem } from './CardItem'

const EWalletCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		handleAddCards,
		withdrawalAllowed: { eWalletCardAllowed },
	} = useWithdrawal()

	const { custEWalletInfo } = bankData ?? {}

	if (!eWalletCardAllowed) return null

	return (
		<div className='walletModule eWalletCard'>
			<div className='addBank'>
				{custEWalletInfo.map(item => (
					<CardItem
						key={`${item.accountNo}-${item.sysId}`}
						item={item}
						type={WithdrawalBankCardEnum.EWallet}
					/>
				))}
				{custEWalletInfo.length < 3 && (
					<div
						className='addBankName noBank'
						onClick={() => handleAddCards(WithdrawalBankCardEnum.EWallet)}
					>
						<div className='icon icon-add-fill' />
						<div className='txt-blue'>{t('Label_Withdrawal_AddEAccount')}</div>
					</div>
				)}
				<div className='remainder'>
					{t('Label_Withdrawal_NumberOfWallet')}:{custEWalletInfo.length} / 3
				</div>
				<div className='tip active'>
					{t('Label_Withdrawal_EWalletSubmitNote')}
				</div>
			</div>
		</div>
	)
}

export { EWalletCard }
