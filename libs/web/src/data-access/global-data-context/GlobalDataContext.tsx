/* eslint-disable @typescript-eslint/no-non-null-assertion */
import liff from '@line/liff'
import { initAdjustSDK } from '@nx-next-app/utils'
import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	ITpGameTypeData,
	TpMaintainData,
	useGetCustTpGameTypeSettingQuery,
	useGetProductTpIdsQuery,
	useGetTpMaintainListQuery,
	UserInfoMemberType,
} from '../../service'
import { isReactNativeWebView } from '../../utils/client'
import { useAuth } from '../auth-context'
import { TStaticFileDomainData } from '../type'

interface IGlobalDataContext {
	tpMaintainList: TpMaintainData[]
	productTpIds?: number[]
	custGameTypeSettingList?: ITpGameTypeData[]
	isInApp: boolean | null
	isInLiff: boolean | null
	getBannerUrl: (url: string) => string
	getImageUrl: (url: string) => string
	getPaymentUrl: (url: string) => string
	getSportImageUrl: (url: string) => string
}

const GlobalDataContext = createContext<IGlobalDataContext>(null!)
interface IGlobalDataProviderProps {
	children: ReactNode
	persistStaticFileDomainData: TStaticFileDomainData
}

const GlobalDataProvider = ({
	children,
	persistStaticFileDomainData,
}: IGlobalDataProviderProps) => {
	const [isInApp, setIsInApp] = useState<boolean | null>(null)
	const [isInLiff, setIsInLiff] = useState<boolean | null>(null)
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

	const { bannerDomain, imgDomain, paymentDomain, sportImgDomain } = {
		...persistStaticFileDomainData,
	}
	const getBannerUrl = (url: string) => {
		return bannerDomain ? `https://${bannerDomain}${url}` : url
	}
	const getImageUrl = (url: string) => {
		return imgDomain ? `https://${imgDomain}${url}` : url
	}
	const getPaymentUrl = (url: string) => {
		return paymentDomain ? `https://${paymentDomain}${url}` : url
	}
	const getSportImageUrl = (url: string) => {
		return sportImgDomain ? `https://${sportImgDomain}${url}` : url
	}

	const value: IGlobalDataContext = {
		tpMaintainList,
		productTpIds,
		custGameTypeSettingList,
		isInApp,
		isInLiff,
		getBannerUrl,
		getImageUrl,
		getPaymentUrl,
		getSportImageUrl,
	}

	useEffect(() => {
		initAdjustSDK()
		setIsInApp(isReactNativeWebView())
		setIsInLiff(liff.isInClient())
	}, [])

	return (
		<GlobalDataContext.Provider value={value}>
			{children}
		</GlobalDataContext.Provider>
	)
}

export { GlobalDataContext, GlobalDataProvider }
