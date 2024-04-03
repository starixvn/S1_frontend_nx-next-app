import React, { createContext, ReactNode, useContext, useEffect } from 'react'
import {
	IAnnouncementData,
	IBannerData,
	IHotEventData,
	IHotGame,
	IPromotionData,
	ISlotsGameData,
	ISocialChannelData,
	useGetAnnouncementQuery,
	useGetHotEventListQuery,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useGetSlotGamePageQuery,
	useGetSocialChannelQuery,
	useLazyGetIpCountryQuery,
	useLazyGetPopUpDataListQuery,
	useLazyGetPopUpPromotionQuery,
	useLazyGetWalletInfoQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum, DeviceTypeEnum, IFooterData } from '@nx-next-app/types'
import { SlotGameCategoryEnum,useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	CategoryEnum,
	GameTypeEnum,
	SocialChannelEnum,
	MobileHomeComponentsEnum,
	DesktopHomeComponentsEnum,
} from '@nx-next-app/features/F0001/types'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { find, head } from 'lodash-es'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { getCookie, setCookie } from 'cookies-next'

dayjs.extend(isBetween)
interface IHomeProviderProps {
	children: ReactNode
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	// For H5
	persistLicenseData: IFooterData['licenseData']
	persistQuickLinksList: IFooterData['quickLinks']
	persistPlatformList: IFooterData['platformList']
	// 桌機排序與開關
	desktopHomeOrders?: DesktopHomeComponentsEnum[]
	// 手機排序與開關
	mobileHomeOrders?: MobileHomeComponentsEnum[]
}

export interface HomeContextInterface {
	// 桌機排序與開關
	desktopHomeOrders: DesktopHomeComponentsEnum[]
	// 手機排序與開關
	mobileHomeOrders: MobileHomeComponentsEnum[]
	announcementData: IAnnouncementData[] | null
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[] | null
	jackPotCurrencies: CurrenciesEnum[]
	hotGameData: IHotGame[]
	socialChannelList: ISocialChannelData[]
	footerSocialChannelList: ISocialChannelData[]
	slotGameData?: ISlotsGameData
	licenseData: IFooterData['licenseData']
	platformList: IFooterData['platformList']
	affiliateData: { allowCurrencies: CurrenciesEnum[]; link: string }
	referralData: { referralBonus: number | null; referralCode: string }
	handlePromotionClick: (bonusCode: string) => void
	handleMarqueeClick: ({ loginCallback }: { loginCallback: () => void }) => void
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
	// HotEvent 元件使用
	formatHdp: (hdp: number) => string | number
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<HomeContextInterface>(null!)

export const useHome = () => {
	return useContext(HomeContext)
}

const DesktopPromotionDetailModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)

const H5PromotionDetailModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)

const DesktopSponsorShipModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/SponsorShipModal'),
	{ ssr: false }
)

const DesktopDisClaimerVndModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/DisclaimerVndModal'),
	{ ssr: false }
)

const DesktopDepositHintModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/DepositHintModal'),
	{ ssr: false }
)

const DesktopHomePromotionModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/HomePromotionModal'),
	{ ssr: false }
)

const DesktopBigWinProfitModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/BigWinProfitModal'),
	{ ssr: false }
)

const H5SponsorShipModal = dynamic(
	() => import('@nx-next-app/features/F0001/h5/modal/SponsorShipModal'),
	{ ssr: false }
)

const H5HomePromotionModal = dynamic(
	() => import('@nx-next-app/features/F0001/h5/modal/HomePromotionModal'),
	{ ssr: false }
)

const H5DisClaimerVndModal = dynamic(
	() => import('@nx-next-app/features/F0001/h5/modal/DisclaimerVndModal'),
	{ ssr: false }
)

const H5BigWinProfitModal = dynamic(
	() => import('@nx-next-app/features/F0001/h5/modal/BigWinProfitModal'),
	{ ssr: false }
)

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

// 如果沒指定則使用 default 排序並全開
const defaultDesktopHomeOrders = [
	DesktopHomeComponentsEnum.Marquee,
	DesktopHomeComponentsEnum.CarouselBanner,
	DesktopHomeComponentsEnum.WelcomeInfo,
	DesktopHomeComponentsEnum.PromotionSwiper,
	DesktopHomeComponentsEnum.HotMatch,
	DesktopHomeComponentsEnum.LiveCasino,
	DesktopHomeComponentsEnum.HotGame,
	DesktopHomeComponentsEnum.AppDownloadBanner,
	DesktopHomeComponentsEnum.ProviderBlock,
	DesktopHomeComponentsEnum.OfficialPartner,
	DesktopHomeComponentsEnum.EuropeCupEntry,
	DesktopHomeComponentsEnum.LuckyWheel,
	DesktopHomeComponentsEnum.LiveStreamingLink,
]

const defaultMobileHomeOrders = [
	MobileHomeComponentsEnum.Marquee,
	MobileHomeComponentsEnum.CarouselBanner,
	MobileHomeComponentsEnum.HotEventSwiper,
	MobileHomeComponentsEnum.PromotionSwiper,
	MobileHomeComponentsEnum.HotGameSwiper,
	MobileHomeComponentsEnum.JackPotSwiper,
	MobileHomeComponentsEnum.AppDownload,
	MobileHomeComponentsEnum.PartnerBlock,
	MobileHomeComponentsEnum.FooterBlock,
	MobileHomeComponentsEnum.EuropeCupEntry,
	MobileHomeComponentsEnum.LuckyWheel,
	MobileHomeComponentsEnum.LiveStreamingLink,
]

export const HomeProvider = ({
	children,
	persistQuickLinksList,
	persistPlatformList,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistHotGameData,
	persistLicenseData,
	desktopHomeOrders = defaultDesktopHomeOrders,
	mobileHomeOrders = defaultMobileHomeOrders,
}: IHomeProviderProps) => {
	const { push } = useRouter()
	const { onEnterSlotsPage, onEnterPage } = useMenu()
	const { tpMaintainList } = useGlobalData()

	const {
		auth: { isLogin },
		userInfo: { currencyId, langId, userName, accountName },
	} = useAuth()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const { modal } = useGlobalModal()

	const { data: { data: slotGameData = {} } = {} } = useGetSlotGamePageQuery({
		deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		currencyId,
		slotGameCategoryList: [SlotGameCategoryEnum.Jackpot],
	})

	const { data: { data: announcementData = [] } = {} } =
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
				skip: deviceType !== DeviceTypeEnum.Mobile,
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

	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery()

	const [getIpCountry] = useLazyGetIpCountryQuery()

	const [getWalletInfo] = useLazyGetWalletInfoQuery()

	const [getBigWinProfit] = useLazyGetPopUpDataListQuery()

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

	const jackPotCurrencies = ALLOWED_CURRENCIES['JACKPOT'] as CurrenciesEnum[]

	// promotion click 事件
	const handlePromotionClick = async (bonusCode: string) => {
		try {
			switch (deviceType) {
				case DeviceTypeEnum.Desktop:
					modal.open(<DesktopPromotionDetailModal bonusCode={bonusCode} />)
					break

				case DeviceTypeEnum.Mobile:
					modal.open(<H5PromotionDetailModal bonusCode={bonusCode} />, {
						className: 'promospop',
					})
					break

				default:
					break
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
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

	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
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

	useEffect(() => {
		const cookieMaxAge = 20 * 60 * 60
		// 贊助商彈窗顯示日期
		const expiredForSponsorShipDate = new Date(2023, 12, 31)
		const expiredDisclaimerForVndDate = new Date(2024, 3, 13)

		const promotionPopup = async () => {
			const cookieName = `popupPromotions${userName}`

			if (!isLogin || !accountName || getCookie(cookieName) === '1') {
				openNextPopup()
				return
			}

			const { data: { bonusCode = null } = {} } = await getPopUpPromotion({
				deviceType,
				langId,
			}).unwrap()

			if (bonusCode) {
				setCookie(cookieName, '1', { maxAge: cookieMaxAge })
				switch (deviceType) {
					case DeviceTypeEnum.Desktop:
						modal.open(
							<DesktopHomePromotionModal
								bonusCode={bonusCode}
								closeCallback={openNextPopup}
							/>
						)
						break

					case DeviceTypeEnum.Mobile:
						modal.open(
							<H5HomePromotionModal
								closeCallback={openNextPopup}
								bonusCode={bonusCode}
							/>,
							{
								className: 'promosback',
							}
						)
						break

					default:
						break
				}
			} else {
				openNextPopup()
			}
		}

		const depositPopup = async () => {
			const cookieName = `balanceHint${userName}`
			if (!isLogin || !accountName || getCookie(cookieName) === '1') {
				openNextPopup()
				return
			}

			const { data: { balance = 0, tpWallets = [] } = {} } =
				await getWalletInfo(null).unwrap()

			const hasBalance =
				!!balance || tpWallets?.filter(tp => tp.balance > 0).length >= 1
			// 儲值彈窗只有桌機有
			if (!hasBalance && deviceType === DeviceTypeEnum.Desktop) {
				modal.open(<DesktopDepositHintModal closeCallback={openNextPopup} />)
				setCookie(cookieName, '1', { maxAge: cookieMaxAge })
			} else {
				openNextPopup()
			}
		}

		const sponsorshipPopup = () => {
			// 贊助商彈窗只在未登入狀態顯示，所以不需要設定 userName , 只要固定 cookie 來驗證是否顯示過即可
			const cookieName = 'sponsorshipPopup'
			if (
				new Date() > expiredForSponsorShipDate ||
				getCookie(cookieName) === '1' ||
				isLogin
			) {
				openNextPopup()
				return
			}
			setCookie(cookieName, '1', { maxAge: cookieMaxAge })

			switch (deviceType) {
				case DeviceTypeEnum.Desktop:
					modal.open(<DesktopSponsorShipModal closeCallback={openNextPopup} />)
					break

				case DeviceTypeEnum.Mobile:
					modal.open(<H5SponsorShipModal closeCallback={openNextPopup} />, {
						className: 'sponsorpop',
					})
					break

				default:
					break
			}
		}

		const disclaimerForVnd = async () => {
			const cookieName = `disclaimerForVnd${userName}`
			if (
				new Date() > expiredDisclaimerForVndDate ||
				getCookie(cookieName) === '1'
			) {
				openNextPopup()
				return
			}
			const {
				data: { code = '' },
			} = await getIpCountry(null).unwrap()
			if (code === 'VN') {
				setCookie(cookieName, '1', { maxAge: cookieMaxAge })
				switch (deviceType) {
					case DeviceTypeEnum.Desktop:
						modal.open(
							<DesktopDisClaimerVndModal closeCallback={openNextPopup} />
						)
						break

					case DeviceTypeEnum.Mobile:
						modal.open(<H5DisClaimerVndModal closeCallback={openNextPopup} />, {
							className: 'vninfopop',
						})
						break

					default:
						break
				}
			} else {
				openNextPopup()
			}
		}

		const bigWinProfitPopup = async () => {
			const cookieName = `BigWinProfit${userName}`

			if (
				isLogin &&
				getCookie(cookieName) !== '1' &&
				currencyId === CurrenciesEnum.IDR
			) {
				try {
					const { data: bigWinData } = await getBigWinProfit({
						deviceType,
					}).unwrap()

					// 該userName回傳null表示不顯示彈窗
					if (bigWinData.userName !== null) {
						setCookie(cookieName, '1', { maxAge: cookieMaxAge })
						switch (deviceType) {
							case DeviceTypeEnum.Desktop:
								modal.open(
									<DesktopBigWinProfitModal
										bigWinData={bigWinData}
										closeCallback={openNextPopup}
									/>
								)
								break

							case DeviceTypeEnum.Mobile:
								modal.open(
									<H5BigWinProfitModal
										bigWinData={bigWinData}
										closeCallback={openNextPopup}
									/>,
									{ className: 'bigwinpop' }
								)
								break

							default:
								break
						}
					} else {
						openNextPopup()
					}
				} catch (error) {
					modal.error((error as Error).message)
				}
			} else {
				openNextPopup()
			}
		}

		const popStack = [
			depositPopup,
			sponsorshipPopup,
			promotionPopup,
			disclaimerForVnd,
			bigWinProfitPopup,
		]

		const openNextPopup = () => {
			if (popStack.length > 0) {
				const current = popStack.pop()
				if (current) {
					current()
				}
			}
		}
		openNextPopup()
		// 正確放入更新依賴確保正確觸發 effect
	}, [isLogin, accountName])

	const value: HomeContextInterface = {
		desktopHomeOrders,
		mobileHomeOrders,
		announcementData,
		jackPotCurrencies,
		socialChannelList,
		footerSocialChannelList,
		hotEventData,
		slotGameData,
		promotionData: persistPromotionData,
		licenseData: persistLicenseData,
		platformList: persistPlatformList,
		bannerData: persistBannerData,
		hotGameData: persistHotGameData,
		referralData,
		affiliateData,
		handlePromotionClick,
		handleMarqueeClick,
		handleHotGameClick,
		handleSlotGamePlay,
		formatHdp,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
