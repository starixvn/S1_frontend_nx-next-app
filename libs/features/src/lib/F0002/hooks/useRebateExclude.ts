import { useGetRebateExcludeGameListQuery } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { cloneDeep, reduce } from 'lodash-es'

const useRebateExclude = () => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const {
		data: { data: originRebateExcludeGameList = [] } = {},
		isFetching: isGetRebateExcludeGameListFetching,
	} = useGetRebateExcludeGameListQuery({
		langId,
		currencyId,
	})

	// * 將重複的 tpGameTypeName 整理出來，資料格式從
	// * [{ tpGameTypeName: "A GameType", gameName:"gameName 1" },{ tpGameTypeName: "A GameType", gameName:"gameName 2" },]
	// * [{ tpGameTypeName: "A GameType", gameName:["gameName 1", "gameName 2"] }]
	const rebateExcludeGameList = reduce(
		originRebateExcludeGameList,
		(result, value) => {
			const { tpGameTypeName, gameName } = value
			const newResult = cloneDeep(result)
			newResult[value.tpGameTypeName] = {
				tpGameTypeName,
				gameName: [
					...(result[value.tpGameTypeName]?.gameName || []),
					gameName || 'All Game',
				],
			}
			return newResult
		},
		{} as {
			[key: string]: {
				tpGameTypeName: string
				gameName: string[]
			}
		}
	)

	const loading = isGetRebateExcludeGameListFetching

	return { loading, rebateExcludeGameList }
}

export { useRebateExclude }
