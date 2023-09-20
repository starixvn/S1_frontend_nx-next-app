import React, { createContext, useContext, ReactNode } from 'react'
import {
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IHotEventData,
	IHotGame,
	INewsData,
	IPromotionData,
	ISocialChannelData,
	IViewedGameData,
	useGetAnnouncementQuery,
	useGetHotEventListQuery,
	useGetRecentlyViewedQuery,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useGetSocialChannelQuery,
} from '@nx-next-app/service'
import {
	CurrenciesEnum,
	DeviceTypeEnum,
	ILicenseData,
	IServicePlanData,
} from '@nx-next-app/types'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	CategoryEnum,
	GameTypeEnum,
	ISubMenu,
	SocialChannelEnum,
} from '@nx-next-app/features/F0001/types'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { filter, find, head } from 'lodash-es'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useMenu } from '@nx-next-app/features/F0001/hooks'

dayjs.extend(isBetween)
interface IHomeProviderProps {
	children: ReactNode
	persistAnnouncementData: IAnnouncementData[]
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewsData: INewsData[]
	// For H5
	persistLicenseData: ILicenseData
	persistServicePlanData: IServicePlanData
}

export interface HomeContextInterface {
	announcementData: IAnnouncementData[]
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[]
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
	hotGameData: IHotGame[]
	newsData: INewsData[]
	recentlyViewedList: IViewedGameData[]
	socialChannelList: ISocialChannelData[]
	footerSocialChannelList: ISocialChannelData[]
	licenseData: ILicenseData
	affiliateData: { allowCurrencies: CurrenciesEnum[]; link: string }
	referralData: { referralBonus: number | null; referralCode: string }
	handlePromotionClick: (bonusCode: string) => void
	handleMarqueeClick: ({ loginCallback }: { loginCallback: () => void }) => void
	handleRecentlyViewGameClick: (
		{
			tpId,
			tpGameType,
			isMaintain,
		}: {
			tpId: number
			tpGameType: number
			isMaintain: boolean
		},
		{
			loginCallback,
		}: {
			loginCallback: () => void
		}
	) => void
	handleHotGameClick: (
		{
			game,
		}: {
			game: IHotGame
		},
		{
			loginCallback,
			underMaintenanceCallback,
		}: { loginCallback: () => void; underMaintenanceCallback: () => void }
	) => void
	// HotEvent 元件使用
	formatHdp: (hdp: number) => string | number
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<HomeContextInterface>(null!)

export const useHome = () => {
	return useContext(HomeContext)
}

const PromotionDetailModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/modal/promotionDetailModal/PromotionDetailModal'
		),
	{
		ssr: false,
	}
)

export const HomeProvider = ({
	children,
	persistAnnouncementData,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistLatestHighlightVideo,
	persistHotGameData,
	persistNewsData,
	persistLicenseData,
	persistServicePlanData,
}: IHomeProviderProps) => {
	const { push } = useRouter()
	const { onEnterSlotsPage, onEnterPage, menuData, onMenuOpen } = useMenu()
	const { tpMaintainList } = useGlobalData()
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const { modal } = useGlobalModal()

	const { data: { data: announcementData = persistAnnouncementData } = {} } =
		useGetAnnouncementQuery(
			{ currencyId, langId },
			{
				pollingInterval: 60000,
			}
		)

	const { data: { data: hotEventData = persistHotEventData } = {} } =
		useGetHotEventListQuery(
			{ langId },
			{
				pollingInterval: 60000,
				skip: !langId,
			}
		)

	const { data: { data: recentlyViewData } = {} } = useGetRecentlyViewedQuery(
		{
			currencyId,
			deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		},
		{
			skip: !isLogin,
		}
	)

	const { data: { data: socialChannelList = [] } = {} } =
		useGetSocialChannelQuery({
			currencyId: currencyId as number,
			langId,
			displayPage: SocialChannelEnum.HOME,
		})

	const { data: { data: footerSocialChannelList = [] } = {} } =
		useGetSocialChannelQuery(
			{
				currencyId: currencyId as number,
				langId,
				displayPage: SocialChannelEnum.FOOTER,
				// 手機版才需要
			},
			{
				skip:
					Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) !==
					DeviceTypeEnum.Mobile,
			}
		)

	const { recentlyViewedList = [] } = recentlyViewData ?? {}

	const { data: { data: referralSetting = [] } = {} } =
		useGetReferralSettingQuery(null, { skip: !isLogin })
	const { data: { data: referralCode = '' } = {} } = useGetReferralCodeQuery(
		null,
		{
			skip: !isLogin,
		}
	)

	const referralData = {
		referralBonus: head(referralSetting)?.bonusAmount ?? null,
		referralCode,
	}

	const { servicePlanList } = persistServicePlanData

	const affiliateData = {
		allowCurrencies: ALLOWED_CURRENCIES['AFFILIATE'] as CurrenciesEnum[],
		link:
			find(servicePlanList, ({ key }) => key === 'affiliate')?.applyNowLink ??
			'',
	}

	const jackPotCurrencies = ALLOWED_CURRENCIES['JACKPOT'] as CurrenciesEnum[]

	// promotion click 事件
	const handlePromotionClick = async (bonusCode: string) => {
		modal.open(<PromotionDetailModal bonusCode={bonusCode} />)
	}

	// 跑馬燈資訊 click 事件
	const handleMarqueeClick = ({
		loginCallback,
	}: {
		loginCallback: () => void
	}) => {
		if (isLogin) {
			push(paths.announcement.root)
		} else {
			loginCallback()
		}
	}

	const promotionData = filter(
		persistPromotionData,
		({ displayFrom, displayTo }) => {
			return dayjs().isBetween(dayjs.unix(displayFrom), dayjs.unix(displayTo))
		}
	)

	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
	}

	const handleHotGameClick = (
		{
			game,
		}: {
			game: IHotGame
		},
		{
			loginCallback,
			underMaintenanceCallback,
		}: { loginCallback: () => void; underMaintenanceCallback: () => void }
	) => {
		const { tpId, gameId, tpCategory, tpGameType } = game ?? {}

		const isInMaintain = tpMaintainList?.some(
			maintain =>
				maintain.tpId === game.tpId &&
				(maintain.tpGameType === game.tpGameType ||
					maintain.tpGameType === GameTypeEnum.All)
		)

		if (isInMaintain) {
			underMaintenanceCallback()
		} else if (tpCategory === CategoryEnum.SLOTS) {
			onEnterSlotsPage(
				{ tpId: String(tpId), gameId, tpGameType: String(tpGameType) },
				{ loginCallback }
			)
		} else {
			onEnterPage({ tpId, gameId, tpGameType, langId }, { loginCallback })
		}
	}

	const handleRecentlyViewGameClick = (
		{
			tpId,
			tpGameType,
			isMaintain,
		}: {
			tpId: number
			tpGameType: number
			isMaintain: boolean
		},
		{
			loginCallback,
		}: {
			loginCallback: () => void
		}
	) => {
		if (!isMaintain) {
			// 非 Maintain 才做動作
			let subMenu: ISubMenu<any> | undefined
			Object.values(menuData).forEach(item => {
				const result = item.subMenu?.find(
					({ product }) =>
						product?.TP_ID === tpId && product?.TP_GAME_TYPE === tpGameType
				)
				if (result !== undefined) {
					subMenu = result
				}
			})
			if (subMenu !== undefined) {
				onMenuOpen(subMenu, { loginCallback })
			}
		}
	}

	const value: HomeContextInterface = {
		announcementData,
		recentlyViewedList,
		jackPotCurrencies,
		socialChannelList,
		footerSocialChannelList,
		promotionData,
		hotEventData,
		licenseData: persistLicenseData,
		bannerData: persistBannerData,
		latestHighlightVideo: persistLatestHighlightVideo,
		hotGameData: persistHotGameData,
		newsData: persistNewsData,
		referralData,
		affiliateData,
		handlePromotionClick,
		handleMarqueeClick,
		handleHotGameClick,
		handleRecentlyViewGameClick,
		formatHdp,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
