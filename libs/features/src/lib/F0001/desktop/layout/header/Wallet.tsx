import { Header } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import {
	TpWalletListTypeEnum,
	useGetCustBonusWalletQuery,
	useGetTpWalletListQuery,
	useGetWalletBalanceQuery,
} from '@nx-next-app/service'
import { useInterval } from 'usehooks-ts'

const Wallet = () => {
	const { userInfo } = useAuth()

	const {
		data: { data: walletBalance } = {},
		refetch: refetchGetWalletBalance,
	} = useGetWalletBalanceQuery(null)

	const {
		data: { data: custBonusWallet } = {},
		refetch: refetchCustBonusWallet,
	} = useGetCustBonusWalletQuery(null)

	const { data: { data: tpWalletList } = {}, refetch: refetchTpWalletList } =
		useGetTpWalletListQuery({
			langId: userInfo.langId,
			listType: TpWalletListTypeEnum.All,
		})

	const handleRefetchAllWallet = () => {
		refetchGetWalletBalance()
		refetchCustBonusWallet()
		refetchTpWalletList()
	}

	useInterval(handleRefetchAllWallet, 30000)

	return (
		<Header.Function.Wallet
			walletBalance={walletBalance}
			custBonusWallet={custBonusWallet}
			tpWalletList={tpWalletList}
			onRefetchAllWallet={handleRefetchAllWallet}
		/>
	)
}

export default Wallet
