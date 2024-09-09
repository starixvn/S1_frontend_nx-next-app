import {
	useWithdrawal,
	WithdrawalPanelStatusEnum,
} from '@nx-next-app/operations'

import { Amount } from './Amount'
import { BankCard } from './BankCard'
import { Confirm } from './Confirm'
import { CryptoCard } from './cryptoCard'
import { EWalletCard } from './EWalletCard'

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
