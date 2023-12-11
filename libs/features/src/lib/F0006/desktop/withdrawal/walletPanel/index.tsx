import { useWithdrawal } from '@nx-next-app/features/F0006/providers'
import { WithdrawalPanelStatusEnum } from '@nx-next-app/features/F0006/types'
import { BankCard } from './BankCard'
import { EWalletCard } from './EWalletCard'
import { CryptoCard } from './cryptoCard'
import { Amount } from './Amount'
import { Confirm } from './Confirm'

const WalletPanel = () => {
	const { withdrawalStatus } = useWithdrawal()
	return (
		<>
			<BankCard />
			<EWalletCard />
			<CryptoCard />
			<div className='subModuleList'>
				{withdrawalStatus === WithdrawalPanelStatusEnum.Init ? (
					<Amount />
				) : (
					<Confirm />
				)}
			</div>
		</>
	)
}

export { WalletPanel }
