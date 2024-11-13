import {
	BalanceInfo,
	BankSelect,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
	WalletInfo,
	WithdrawalHeader,
} from '@apps/yashbet-h5/components/withdrawal/contents'
import { Loading } from '@nx-next-app/components/H0001'
import { useWithdrawal } from '@nx-next-app/operations'

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
