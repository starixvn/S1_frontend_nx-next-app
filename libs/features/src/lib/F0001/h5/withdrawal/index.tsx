import { Loading } from '@nx-next-app/components/H0001'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'

import { WrapperWithdrawalH5 } from '@nx-next-app/features/F0001/h5/withdrawal/styles'
import {
	BalanceInfo,
	BankSelect,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
	WalletInfo,
	WithdrawalHeader,
} from './common/components'

const Withdrawal = () => {
	const { loading } = useWithdrawal()

	if (loading) return <Loading />

	return (
		<WrapperWithdrawalH5>
			<WithdrawalHeader />
			<main className='main withdrawal'>
				<WalletInfo />
				<div className='group-withdrawal'>
					<BankSelect />
					<BalanceInfo />
					<SubmitAmount />
				</div>
				<RecentHistory />
				<ImportantNotice />
			</main>
		</WrapperWithdrawalH5>
	)
}

export default Withdrawal
