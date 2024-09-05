import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { WithdrawalPanelStatusEnum } from '@nx-next-app/features/F0001/types'
import { Amount } from './Amount'
import { BankCard } from './BankCard'
import { Confirm } from './Confirm'
import { EWalletCard } from './EWalletCard'
import { CryptoCard } from './cryptoCard'

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
