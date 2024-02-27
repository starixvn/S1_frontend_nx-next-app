/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode } from 'react'
import {
	useGetTpMaintainListQuery,
	TpMaintainData,
	useGetProductTpIdsQuery,
	useGetCustTpGameTypeSettingQuery,
	UserInfoMemberType,
	ITpGameTypeData,
} from '../../service'
import { useAuth } from '../auth-context'

interface IGlobalDataContext {
	tpMaintainList: TpMaintainData[]
	productTpIds?: number[]
	custGameTypeSettingList?: ITpGameTypeData[]
}

const GlobalDataContext = createContext<IGlobalDataContext>(null!)

interface IGlobalDataProviderProps {
	children: ReactNode
}

const GlobalDataProvider = ({ children }: IGlobalDataProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { memberType },
	} = useAuth()
	const { data: { data: tpMaintainList = [] } = {} } =
		useGetTpMaintainListQuery(
			isLogin // * 登入或登出時重打 api
		)

	// * 未登入狀態時 skip api
	const { data: { data: productTpIds } = {} } = useGetProductTpIdsQuery(null, {
		skip: !isLogin,
	})

	const { data: { data: custGameTypeSettingList = [] } = {} } =
		useGetCustTpGameTypeSettingQuery(null, {
			skip: !isLogin || memberType !== UserInfoMemberType.LiveStreaming,
		})

	const value: IGlobalDataContext = {
		tpMaintainList,
		productTpIds,
		custGameTypeSettingList,
	}
	return (
		<GlobalDataContext.Provider value={value}>
			{children}
		</GlobalDataContext.Provider>
	)
}

export { GlobalDataContext, GlobalDataProvider }
