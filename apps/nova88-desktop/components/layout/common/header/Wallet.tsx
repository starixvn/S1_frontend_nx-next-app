import { Header } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'

const Wallet = () => {
	const { userInfo } = useAuth()

	const {
		isHideBalance,
		totalWalletBalance,
		mainWalletInfo,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId: userInfo.langId })

	const [setHideBalance] = useSetHideBalanceMutation()

	return (
		<Header.Function.Wallet
			originIsHideBalance={isHideBalance}
			totalWalletBalance={totalWalletBalance}
			mainWalletInfo={mainWalletInfo}
			custBonusWalletList={custBonusWalletList}
			tpWalletBalanceList={tpWalletBalanceList}
			onRefetchAllWallet={onRefetchAllWallet}
			onSetHideBalance={setHideBalance}
		/>
	)
}

export default Wallet
