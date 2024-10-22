import {
	SlotGameCategoryEnum,
	useAuth,
	useGlobalData,
	useStaticData,
} from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import {
	IAnnouncementData,
	IBannerData,
	IHotEventData,
	IHotGame,
	INewsData,
	IPromotionData,
	ISlotsGameData,
	ISocialChannelData,
	useGetAnnouncementQuery,
	useGetHotEventListQuery,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useGetSlotGamePageQuery,
	useGetSocialChannelQuery,
} from '@nx-next-app/service'
import { monthlyData } from '@nx-next-app/site/onetwobet/data'
import {
	CategoryEnum,
	CurrenciesEnum,
	DeviceTypeEnum,
	GameTypeEnum,
	IFooterData,
	IMonthlyDataProps,
	SocialChannelEnum,
} from '@nx-next-app/types'
import { find, head } from 'lodash-es'
import { ReactNode, createContext, useContext } from 'react'

interface IHomeProviderProps {
	children: ReactNode
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistHotEventData: IHotEventData[]
	persistNewsData: INewsData[]
	persistHotGameData: IHotGame[]
	// For H5
	persistLicenseData: IFooterData['licenseData']
	persistQuickLinksList?: IFooterData['quickLinks']
	persistPlatformList?: IFooterData['platformList']
	popStacks?: Array<() => Promise<boolean>>
}

interface IHomeContextProps {
	announcementData: IAnnouncementData[] | null
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[] | null
	hotGameData: IHotGame[]
	newsData: INewsData[]
	socialChannelList: ISocialChannelData[]
	footerSocialChannelList: ISocialChannelData[]
	slotGameData?: ISlotsGameData
	monthlyData?: IMonthlyDataProps[]
	licenseData: IFooterData['licenseData']
	platformList: IFooterData['platformList']
	affiliateData: { allowCurrencies: CurrenciesEnum[]; link: string }
	referralData: { referralBonus: number | null; referralCode: string }
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
	handleSlotGamePlay: (
		{
			tpId,
			gameId,
			playFree,
		}: {
			tpId: number
			gameId: string
			playFree?: boolean
		},
		{ loginCallback }: { loginCallback: () => void }
	) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<IHomeContextProps>(null!)

export const useHome = () => {
	return useContext(HomeContext)
}

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

export const HomeProvider = ({
	children,
	persistQuickLinksList,
	persistPlatformList,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistNewsData,
	persistHotGameData,
	persistLicenseData,
	popStacks,
}: IHomeProviderProps) => {
	const { onEnterSlotsPage, onEnterPage } = useMenu()
	const { tpMaintainList } = useGlobalData()

	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const { data: { data: slotGameData = {} } = {} } = useGetSlotGamePageQuery({
		currencyId,
		slotGameCategoryList: [SlotGameCategoryEnum.Jackpot],
	})

	const { data: { data: announcementData = [] } = {} } =
		useGetAnnouncementQuery(
			{ currencyId, langId },
			{
				pollingInterval: 120000,
			}
		)

	const { data: { data: hotEventData = persistHotEventData } = {} } =
		useGetHotEventListQuery(
			{ langId },
			{
				pollingInterval: 120000,
				skip: !langId,
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
			},
			{
				skip: deviceType !== DeviceTypeEnum.Mobile, // 手機版才需要
			}
		)

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

	const affiliateData = {
		allowCurrencies: ALLOWED_CURRENCIES['AFFILIATE'] as CurrenciesEnum[],
		link:
			find(
				persistQuickLinksList,
				({ displayKey }) => displayKey === 'Label_Affiliate_Program'
			)?.href ?? '',
	}

	const handleHotGameClick = (
		{
			game,
			playFree = false,
		}: {
			game: IHotGame
			playFree?: boolean
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
				{
					tpId: String(tpId),
					gameId,
					tpGameType: String(tpGameType),
					isFree: playFree,
				},
				{ loginCallback }
			)
		} else {
			onEnterPage({ tpId, gameId, tpGameType, langId }, { loginCallback })
		}
	}

	const handleSlotGamePlay = (
		{
			tpId,
			gameId,
			playFree = false,
		}: {
			tpId: number
			gameId: string
			playFree?: boolean
		},
		{ loginCallback }: { loginCallback: () => void }
	) => {
		// * 從 slotGameData 中的 providerList 找對應的 tpGameType
		const { tpGameType = '' } =
			find(slotGameData.providerList, {
				tpId,
			}) || {}

		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback }
		)
	}

	const value: IHomeContextProps = {
		announcementData,
		socialChannelList,
		footerSocialChannelList,
		hotEventData,
		slotGameData,
		monthlyData,
		promotionData: persistPromotionData,
		licenseData: persistLicenseData,
		platformList: persistPlatformList,
		bannerData: persistBannerData,
		hotGameData: persistHotGameData,
		newsData: persistNewsData,
		referralData,
		affiliateData,
		handleHotGameClick,
		handleSlotGamePlay,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
