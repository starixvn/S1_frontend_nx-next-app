import { sumBy } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useAuth } from '../data-access/auth-context'
import {
	useGetCustBonusWalletListQuery,
	useGetMainWalletInfoQuery,
	useGetTpWalletListQuery,
	useLazyGetTpWalletInfoByTpIdQuery,
} from '../service/accountApi/api'
import {
	ITpWalletInfoData,
	TpWalletListTypeEnum,
} from '../service/accountApi/type'

/**
 * * 首頁錢包相關邏輯，跨裝置跨模組共用
 */
const useTpWalletBalanceListFetcher = ({ langId }: { langId: string }) => {
	const {
		auth: { isLogin },
	} = useAuth()

	const [tpWalletBalanceList, setTpWalletBalanceList] = useState<
		ITpWalletInfoData[]
	>([])

	const {
		data: { data: mainWalletInfo } = {},
		refetch: refetchGetWalletBalance,
		isLoading: isGetMainWalletInfoLoading,
	} = useGetMainWalletInfoQuery(null, {
		skip: !isLogin,
	})

	const {
		data: { data: custBonusWalletList } = {},
		refetch: refetchCustBonusWallet,
		isLoading: isGetCustBonusWalletListLoading,
	} = useGetCustBonusWalletListQuery(null, {
		skip: !isLogin,
	})

	const {
		data: { data: tpWalletList } = {},
		refetch: refetchTpWalletList,
		isLoading: isGetTpWalletListLoading,
	} = useGetTpWalletListQuery(
		{
			langId,
			listType: TpWalletListTypeEnum.All,
		},
		{
			skip: !isLogin,
		}
	)

	const [getTpWalletInfoByTpId] = useLazyGetTpWalletInfoByTpIdQuery()

	const onRefetchAllWallet = async () => {
		await Promise.all([
			refetchGetWalletBalance(),
			refetchCustBonusWallet(),
			refetchTpWalletList(),
		])

		getTpWalletBalanceList()
	}

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

	// * 每３０秒更新一次錢包資訊
	useInterval(onRefetchAllWallet, isLogin ? 30000 : null)

	useEffect(() => {
		getTpWalletBalanceList()
	}, [tpWalletList])

	const tpWalletsBalanceSum = sumBy(tpWalletBalanceList, 'balance')
	const totalWalletBalance =
		tpWalletsBalanceSum + (mainWalletInfo?.balance || 0)

	const isLoading =
		isGetMainWalletInfoLoading ||
		isGetCustBonusWalletListLoading ||
		isGetTpWalletListLoading

	return {
		isLoading,
		isHideBalance: Boolean(mainWalletInfo?.isHideBalance),
		mainWalletInfo,
		totalWalletBalance,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	}
}

export { useTpWalletBalanceListFetcher }
