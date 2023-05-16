import { createContext, ReactNode } from 'react'
import { useGetTpMaintainListQuery, TpMaintainData } from '../../service'
import { useAuth } from '../auth-context'

interface GlobalDataContextInterface {
	tpMaintainList: TpMaintainData[]
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const GlobalDataContext = createContext<GlobalDataContextInterface>({} as never)

interface IGlobalDataProviderProps {
	children: ReactNode
}

const GlobalDataProvider = ({ children }: IGlobalDataProviderProps) => {
	const { auth } = useAuth()

	const { data: { data: tpMaintainList = [] } = {} } =
		useGetTpMaintainListQuery(
			auth.isLogin // * 登入或登出時重打 api
		)

	const value: GlobalDataContextInterface = {
		tpMaintainList,
	}
	return (
		<GlobalDataContext.Provider value={value}>
			{children}
		</GlobalDataContext.Provider>
	)
}

export { GlobalDataContext, GlobalDataProvider }
