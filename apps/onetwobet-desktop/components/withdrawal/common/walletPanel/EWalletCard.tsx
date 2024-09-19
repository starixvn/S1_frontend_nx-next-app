import { useWithdrawal, WithdrawalBankCardEnum } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CardItem } from './CardItem'

const EWalletCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		handleAddEWallet,
		withdrawalAllowed: { eWalletCardAllowed },
	} = useWithdrawal()
	const { modal } = useGlobalModal()

	const { custEWalletInfo } = bankData ?? {}

	if (!eWalletCardAllowed) return null

	return (
		<div className='walletModule'>
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
						onClick={() =>
							handleAddEWallet({
								errorCallback: errorMessage => modal.error(errorMessage),
							})
						}
					>
						<div className='icon icon-plus' />
						<div>{t('Label_Withdrawal_AddEAccount')}</div>
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
