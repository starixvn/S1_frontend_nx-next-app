import { useTranslation } from 'next-i18next'
import { useWithdrawal } from '@nx-next-app/features/F0006/providers'
import { CardItem } from '@nx-next-app/features/F0006/desktop/withdrawal/walletPanel/CardItem'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0006/types'

const BankCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		handleAddCards,
		withdrawalAllowed: { bankCardAllowed },
	} = useWithdrawal()
	const { bankInfoDetail } = bankData ?? {}

	if (!bankCardAllowed) return null

	return (
		<div className='walletModule'>
			<div className='addBank'>
				{bankInfoDetail.map(item => (
					<CardItem
						key={`${item.accountNo}-${item.sysId}`}
						item={item}
						type={WithdrawalBankCardEnum.LocalBank}
					/>
				))}
				{bankInfoDetail.length < 3 && (
					<div
						className='addBankName noBank'
						onClick={() => handleAddCards(WithdrawalBankCardEnum.LocalBank)}
					>
						<div className='icon icon-plus' />
						<div>{t('Label_Withdrawal_AddBankAccount')}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export { BankCard }
