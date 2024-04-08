import { Loading } from '@nx-next-app/components/H0001'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'

import {
	BankSelect,
	WalletInfo,
	WithdrawalHeader,
	BalanceInfo,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
} from './common/components'

const Withdrawal = () => {
	const { loading } = useWithdrawal()

	if (loading) return <Loading />

	return (
		<>
			<WithdrawalHeader />
			<main className='main withdrawal'>
				<WalletInfo />
				<BankSelect />
				<BalanceInfo />
				<SubmitAmount />
				<RecentHistory />
				<ImportantNotice />
			</main>
		</>
	)
}

export default Withdrawal
