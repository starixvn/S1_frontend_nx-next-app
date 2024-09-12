import { useWithdrawal, WithdrawalBankCardEnum } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { CardItem } from './CardItem'

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
