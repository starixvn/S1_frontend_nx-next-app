import { Header } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import {
	ITpWalletInfoData,
	TpWalletListTypeEnum,
	useGetCustBonusWalletListQuery,
	useGetMainWalletInfoQuery,
	useGetTpWalletListQuery,
	useLazyGetTpWalletInfoByTpIdQuery,
	useSetHideBalanceMutation,
} from '@nx-next-app/service'
import { sumBy } from 'lodash'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

const useTpWalletBalanceListFetcher = ({ langId }: { langId: string }) => {
	const [tpWalletBalanceList, setTpWalletBalanceList] = useState<
		ITpWalletInfoData[]
	>([])

	const {
		data: { data: mainWalletInfo } = {},
		refetch: refetchGetWalletBalance,
	} = useGetMainWalletInfoQuery(null)

	const {
		data: { data: custBonusWalletList } = {},
		refetch: refetchCustBonusWallet,
	} = useGetCustBonusWalletListQuery(null)

	const { data: { data: tpWalletList } = {}, refetch: refetchTpWalletList } =
		useGetTpWalletListQuery({
			langId,
			listType: TpWalletListTypeEnum.All,
		})

	const [getTpWalletInfoByTpId] = useLazyGetTpWalletInfoByTpIdQuery()

	const onRefetchAllWallet = () => {
		refetchGetWalletBalance()
		refetchCustBonusWallet()
		refetchTpWalletList()
	}

	useEffect(() => {
		// * 透過 tpWalletList 迭代並 call api 抓出每個 tp 的 balance 資訊
		const getTpWalletBalanceList = async () => {
			if (tpWalletList && tpWalletList?.length >= 1) {
				let result: ITpWalletInfoData[] = []
				const promiseTpWalletListMap = tpWalletList.map(({ tpId, tpName }) =>
					getTpWalletInfoByTpId(tpId)
						.unwrap()
						.then(({ data }) => {
							result = [...result, { ...data, tpName }]
							return data
						})
				)
				await Promise.allSettled(promiseTpWalletListMap)
				// 透過 tpId 排序
				result = result.sort((a, b) => (a.tpId > b.tpId ? 1 : -1))
				setTpWalletBalanceList(result)
			}
		}

		getTpWalletBalanceList()
	}, [tpWalletList])

	const tpWalletsBalanceSum = sumBy(tpWalletBalanceList, 'balance')
	const totalWalletBalance =
		tpWalletsBalanceSum + (mainWalletInfo?.balance || 0)

	return {
		isHideBalance: Boolean(mainWalletInfo?.isHideBalance),
		mainWalletInfo,
		totalWalletBalance,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	}
}

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

	useInterval(onRefetchAllWallet, 30000)

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
