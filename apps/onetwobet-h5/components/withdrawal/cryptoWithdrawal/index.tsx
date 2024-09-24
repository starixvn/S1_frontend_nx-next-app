import { Loading } from '@nx-next-app/components/H0001'
import { useCheckUserInfo, useWithdrawal } from '@nx-next-app/operations'

import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import {
	BalanceInfo,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
	WalletInfo,
	WithdrawalHeader,
} from '../common/components'
import { CryptoWalletSelect } from './CryptoWalletSelect'

const UpdateProfileModal = dynamic(
	() => import('../../modal/UpdateProfileModal'),
	{ ssr: false }
)

// CryptoWithdrawal 需要多包 cryptoWallet provider 且內容與 Local/E Wallet 有些許差異，故基於流量優化與 UI 考量，獨立拉出來寫
const CryptoWithdrawal = () => {
	const { loading } = useWithdrawal()
	const { modal } = useGlobalModal()
	const { checkUserInfo } = useCheckUserInfo()

	useEffect(() => {
		checkUserInfo({
			onSuccessCallback: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
	}, [])

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
