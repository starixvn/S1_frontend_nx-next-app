import { Loading } from '@12b-h5/components/common'
import { useWithdrawal } from '@nx-next-app/operations'

import {
	BalanceInfo,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
	WalletInfo,
	WithdrawalHeader,
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
