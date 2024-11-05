import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useWithdrawal, WithdrawalBankCardEnum } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { CardItem } from './CardItem'

const BankCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		handleAddBankCard,
		withdrawalAllowed: { bankCardAllowed },
	} = useWithdrawal()
	const { modal } = useGlobalModal()

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
						onClick={() =>
							handleAddBankCard({
								errorCallback: errorMessage => modal.error(errorMessage),
							})
						}
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
