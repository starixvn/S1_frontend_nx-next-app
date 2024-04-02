import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { Loading } from '@nx-next-app/components/H0001'

import {
	RecentHistory,
	ImportantNotice,
	BalanceInfo,
	WalletInfo,
	WithdrawalHeader,
	SubmitAmount,
} from '../common/components'
import { CryptoWalletSelect } from './CryptoWalletSelect'

// CryptoWithdrawal 需要多包 cryptoWallet provider 且內容與 Local/E Wallet 有些許差異，故基於流量優化與 UI 考量，獨立拉出來寫
const CryptoWithdrawal = () => {
	const { loading } = useWithdrawal()

	if (loading) return <Loading />

	return (
		<>
			<WithdrawalHeader />
			<main className='main withdrawal'>
				<WalletInfo />
				<CryptoWalletSelect />
				<BalanceInfo />
				<SubmitAmount />
				<RecentHistory />
				<ImportantNotice />
			</main>
		</>
	)
}

export default CryptoWithdrawal
