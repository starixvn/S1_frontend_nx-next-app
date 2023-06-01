import { createContext, ReactNode } from 'react'
import {
	useGetTpMaintainListQuery,
	TpMaintainData,
	useGetProductTpIdsQuery,
} from '../../service'
import { useAuth } from '../auth-context'

interface GlobalDataContextInterface {
	tpMaintainList: TpMaintainData[]
	productTpIds: number[]
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const GlobalDataContext = createContext<GlobalDataContextInterface>({} as never)

interface IGlobalDataProviderProps {
	children: ReactNode
}

const GlobalDataProvider = ({ children }: IGlobalDataProviderProps) => {
	const {
		auth: { isLogin },
	} = useAuth()

	const { data: { data: tpMaintainList = [] } = {} } =
		useGetTpMaintainListQuery(
			isLogin // * 登入或登出時重打 api
		)

	// * 未登入狀態時 skip api
	const { data: { data: productTpIds = [] } = {} } = useGetProductTpIdsQuery(
		null,
		{ skip: !isLogin }
	)

	const value: GlobalDataContextInterface = {
		tpMaintainList,
		productTpIds,
	}
	return (
		<GlobalDataContext.Provider value={value}>
			{children}
		</GlobalDataContext.Provider>
	)
}

export { GlobalDataContext, GlobalDataProvider }
