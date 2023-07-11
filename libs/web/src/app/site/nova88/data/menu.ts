import { CurrenciesEnum } from '@nx-next-app/types'
import {
	IMenuData,
	MenuActionTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/features/F0001/types'
import { paths } from '../../../constants/paths'
import { ALLOWED_CURRENCIES } from './allowCurrency'
import { PRODUCTS } from './products'

const PRODUCT_EVENT_PERIOD = {
	CRYPTO_SPORTS: { start: null, end: '2022/12/10 11:00:00' },
	SPORTS_9W: { start: null, end: '2021/07/30 11:00:00' },
	LIVE_CASINO_BG: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
}

const { MYR, INR, IDR, BDT, THB, USD, CNY, KHM } = CurrenciesEnum

const {
	SPORTS_CRYPTO_SPORTS,
	SPORTS_SOCCER,
	SPORTS_SABA_SOCCER,
	SPORTS_BASKETBALL,
	SPORTS_BADMINTON,
	LIVE_CASINO_PP,
	LIVE_CASINO_YEE_BET,
	LIVE_CASINO_SKY_WIND,
	LIVE_CASINO_EVO,
	LIVE_CASINO_PT,
	LIVE_CASINO_DG,
	LIVE_CASINO_AE,
	LIVE_CASINO_SA,
	LIVE_CASINO_ALL_BET,
	LIVE_CASINO_AG,
	LIVE_CASINO_WM,
	LIVE_CASINO_E_BET,
	LIVE_CASINO_N2,
} = PRODUCTS

export const MENU_DATA: IMenuData = {
	[MenuKeyEnum.Home]: {
		className: 'icon icon-home',
		pathname: paths.home.root,
		subMenuClassName: 'homeList',
		subMenu: [
			{
				displayText: 'VIP',

				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'home-vip.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'vipbg.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				pathname: paths.vip.root,
				allowCurrencies: ALLOWED_CURRENCIES.VIP,
			},
			{
				displayKey: 'Label_General_LeaderBoard',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'home-ranking.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'rankingbg.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				pathname: paths.leaderboard.root,
				allowCurrencies: ALLOWED_CURRENCIES.LEADER_BOARD,
			},
			{
				displayKey: 'Label_General_Referral',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'home-refer.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'referbg.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				needLogin: true,
				pathname: paths.referral.root,
			},
		],
	},
	[MenuKeyEnum.AppDownload]: {
		className: 'icon icon-mobile',
		pathname: paths.appDownload.root,
		subMenuClassName: 'appList',
	},
	[MenuKeyEnum.CryptoSports]: {
		className: 'cryptobtn',
		menuActionType: MenuActionTypeEnum.EnterPage,
		product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
		menuType: 'banner',
		subMenuClassName: 'cryptoList',
		eventIcons: [
			{
				icon: 'icon icon-new',
				period: PRODUCT_EVENT_PERIOD.CRYPTO_SPORTS,
			},
		],
	},
	[MenuKeyEnum.Sports]: {
		displayKey: 'Label_General_Sports',
		className: 'sportsbtn',
		pathname: paths.sports.root,
		product: PRODUCTS['SPORTS'],
		query: { provider: 'saba', type: 'soccer' },
		subMenuSort: {
			[INR]: [
				SPORTS_CRYPTO_SPORTS.TP_GAME_TYPE,
				SPORTS_SOCCER.TP_GAME_TYPE,
				SPORTS_SABA_SOCCER.TP_GAME_TYPE,
				SPORTS_BASKETBALL.TP_GAME_TYPE,
				SPORTS_BADMINTON.TP_GAME_TYPE,
			],
			[BDT]: [
				SPORTS_CRYPTO_SPORTS.TP_GAME_TYPE,
				SPORTS_SOCCER.TP_GAME_TYPE,
				SPORTS_SABA_SOCCER.TP_GAME_TYPE,
				SPORTS_BASKETBALL.TP_GAME_TYPE,
				SPORTS_BADMINTON.TP_GAME_TYPE,
			],
		},
		subMenuClassName: 'sportsList',
		subMenu: [
			{
				displayKey: 'Label_General_CryptoSports',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'cryptosportNPC.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
				eventIcons: [
					{
						icon: 'icon icon-new',
						period: PRODUCT_EVENT_PERIOD.CRYPTO_SPORTS,
					},
				],
			},
			{
				displayKey: 'Label_General_Soccer',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'soccerNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'soccerBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'soccer' },
				product: PRODUCTS['SPORTS_SOCCER'],
				menuActionType: MenuActionTypeEnum.Link,
			},
			{
				displayKey: 'Label_General_SabaSoccer',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'sabssoccerNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'soccerBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'basketball' },
				product: PRODUCTS['SPORTS_SOCCER'],
				menuActionType: MenuActionTypeEnum.Link,
			},
			{
				displayKey: 'Label_General_Basketball',
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'basketball' },
				product: PRODUCTS['SPORTS_BASKETBALL'],
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'basketballNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'basketballBG.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
			},
			{
				displayKey: 'Label_General_Cricket',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'cricketNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'cricketBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'cricket' },
				product: PRODUCTS['SPORTS_CRICKET'],
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: ALLOWED_CURRENCIES.SPORTS_CRICKET,
			},
			{
				displayKey: 'Label_General_Badminton',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'badmintonNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'badmintonBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'badminton' },
				product: PRODUCTS['SPORTS_BADMINTON'],
				menuActionType: MenuActionTypeEnum.Link,
			},
			{
				displayKey: 'Label_General_Volleyball',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'volleyballNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'volleyballBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'volleyball' },
				product: PRODUCTS['SPORTS_BADMINTON'],
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: ALLOWED_CURRENCIES.SPORTS_VOLLEYBALL,
			},
			{
				displayKey: 'Label_General_VirtualSports',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'volleyballNPC.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'volleyballBG.png',
					},
				],
				pathname: paths.sports.root,
				query: { provider: 'saba', type: 'virtual-sports' },
				product: PRODUCTS['VIRTUAL_SPORTS'],
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: ALLOWED_CURRENCIES.SPORTS_VOLLEYBALL,
			},
		],
	},
	[MenuKeyEnum.Exchange]: {
		displayKey: 'Label_General_Exchange',
		className: 'exchange',
		allowCurrencies: ALLOWED_CURRENCIES.EXCHANGE,
		subMenuClassName: 'exchangeList',
		subMenu: [
			{
				displayText: 'Nova88 Exchange',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: '9wnpc.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'cricketBG.png',
					},
				],
				menuActionType: MenuActionTypeEnum.UseGoToGame,
				product: PRODUCTS['SPORTS_9W_SPORTS'],
				eventIcons: [
					{
						icon: 'icon icon-new',
						period: PRODUCT_EVENT_PERIOD.SPORTS_9W,
					},
				],
				needLogin: true,
			},
		],
	},
	[MenuKeyEnum.ESports]: {
		displayKey: 'Label_General_ESports',
		className: 'eSportsbtn',
		pathname: paths.eSport.root,
		subMenuClassName: 'eSportsList',
		subMenu: [
			{
				displayKey: 'Label_General_All',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'esportALL.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'eSportsListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_E_SPORT_ALL'],
				lobbyPage: {
					bgImg: 'esposts-all.png',
					hoverBgImg: 'esposts-alla.png',
				},
			},
			{
				displayKey: 'Label_Product_Dota2',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'esportDOTA2.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'eSportsListHover.png',
					},
				],

				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_E_SPORT_DOTA2'],
				lobbyPage: {
					bgImg: 'esposts-dota.png',
					hoverBgImg: 'esposts-dotaa.png',
				},
			},
			{
				displayKey: 'Label_Product_LOL',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'esportLOL.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'eSportsListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_E_SPORT_LOL'],
				lobbyPage: {
					bgImg: 'esposts-lol.png',
					hoverBgImg: 'esposts-lola.png',
				},
			},
			{
				displayKey: 'Label_Product_CSGO',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'esportCS.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'eSportsListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_E_SPORT_CSGO'],
				lobbyPage: {
					bgImg: 'esposts-cs.png',
					hoverBgImg: 'esposts-csa.png',
				},
			},
			{
				displayKey: 'Label_Product_Kog',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'esportKOG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'eSportsListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_E_SPORT_KOG'],
				lobbyPage: {
					bgImg: 'esposts-kog.png',
					hoverBgImg: 'esposts-koga.png',
				},
			},
		],
	},
	[MenuKeyEnum.LiveCasino]: {
		displayKey: 'Label_General_LiveCasino',
		className: 'livecasinobtn icon icon-newicon',
		pathname: paths.liveCasino.root,
		checkBeforeLogin: true,
		subMenuClassName: 'livecasinoList',
		subMenuSort: {
			[THB]: [
				LIVE_CASINO_PP.TP_GAME_TYPE,
				LIVE_CASINO_YEE_BET.TP_GAME_TYPE,
				LIVE_CASINO_SKY_WIND.TP_GAME_TYPE,
				LIVE_CASINO_EVO.TP_GAME_TYPE,
				LIVE_CASINO_PT.TP_GAME_TYPE,
				LIVE_CASINO_DG.TP_GAME_TYPE,
				LIVE_CASINO_AE.TP_GAME_TYPE,
				LIVE_CASINO_SA.TP_GAME_TYPE,
				LIVE_CASINO_ALL_BET.TP_GAME_TYPE,
				LIVE_CASINO_AG.TP_GAME_TYPE,
				LIVE_CASINO_WM.TP_GAME_TYPE,
				LIVE_CASINO_E_BET.TP_GAME_TYPE,
				LIVE_CASINO_N2.TP_GAME_TYPE,
			],
			[MYR]: [
				LIVE_CASINO_PP.TP_GAME_TYPE,
				LIVE_CASINO_YEE_BET.TP_GAME_TYPE,
				LIVE_CASINO_SKY_WIND.TP_GAME_TYPE,
				LIVE_CASINO_EVO.TP_GAME_TYPE,
				LIVE_CASINO_PT.TP_GAME_TYPE,
				LIVE_CASINO_DG.TP_GAME_TYPE,
				LIVE_CASINO_AE.TP_GAME_TYPE,
				LIVE_CASINO_SA.TP_GAME_TYPE,
				LIVE_CASINO_ALL_BET.TP_GAME_TYPE,
				LIVE_CASINO_AG.TP_GAME_TYPE,
				LIVE_CASINO_WM.TP_GAME_TYPE,
				LIVE_CASINO_E_BET.TP_GAME_TYPE,
				LIVE_CASINO_N2.TP_GAME_TYPE,
			],
			[IDR]: [
				LIVE_CASINO_PP.TP_GAME_TYPE,
				LIVE_CASINO_YEE_BET.TP_GAME_TYPE,
				LIVE_CASINO_SKY_WIND.TP_GAME_TYPE,
				LIVE_CASINO_EVO.TP_GAME_TYPE,
				LIVE_CASINO_PT.TP_GAME_TYPE,
				LIVE_CASINO_DG.TP_GAME_TYPE,
				LIVE_CASINO_AE.TP_GAME_TYPE,
				LIVE_CASINO_SA.TP_GAME_TYPE,
				LIVE_CASINO_ALL_BET.TP_GAME_TYPE,
				LIVE_CASINO_AG.TP_GAME_TYPE,
				LIVE_CASINO_WM.TP_GAME_TYPE,
				LIVE_CASINO_E_BET.TP_GAME_TYPE,
				LIVE_CASINO_N2.TP_GAME_TYPE,
			],
			[INR]: [
				LIVE_CASINO_PP.TP_GAME_TYPE,
				LIVE_CASINO_YEE_BET.TP_GAME_TYPE,
				LIVE_CASINO_SKY_WIND.TP_GAME_TYPE,
				LIVE_CASINO_EVO.TP_GAME_TYPE,
				LIVE_CASINO_PT.TP_GAME_TYPE,
				LIVE_CASINO_DG.TP_GAME_TYPE,
				LIVE_CASINO_AE.TP_GAME_TYPE,
				LIVE_CASINO_SA.TP_GAME_TYPE,
				LIVE_CASINO_ALL_BET.TP_GAME_TYPE,
				LIVE_CASINO_AG.TP_GAME_TYPE,
				LIVE_CASINO_WM.TP_GAME_TYPE,
				LIVE_CASINO_E_BET.TP_GAME_TYPE,
				LIVE_CASINO_N2.TP_GAME_TYPE,
			],
			[BDT]: [
				LIVE_CASINO_PP.TP_GAME_TYPE,
				LIVE_CASINO_YEE_BET.TP_GAME_TYPE,
				LIVE_CASINO_EVO.TP_GAME_TYPE,
				LIVE_CASINO_PT.TP_GAME_TYPE,
				LIVE_CASINO_DG.TP_GAME_TYPE,
				LIVE_CASINO_AE.TP_GAME_TYPE,
				LIVE_CASINO_SA.TP_GAME_TYPE,
				LIVE_CASINO_ALL_BET.TP_GAME_TYPE,
				LIVE_CASINO_AG.TP_GAME_TYPE,
				LIVE_CASINO_WM.TP_GAME_TYPE,
				LIVE_CASINO_E_BET.TP_GAME_TYPE,
				LIVE_CASINO_N2.TP_GAME_TYPE,
				LIVE_CASINO_SKY_WIND.TP_GAME_TYPE,
			],
		},
		subMenu: [
			{
				displayText: 'Pragmatic Play',
				className: 'livePP',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-PP.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'ppBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_PP'],
				lobbyPage: {
					npcImg: 'casino_pp',
				},
			},
			{
				displayText: 'Big Gaming',
				className: 'liveBG',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-bg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'bgbg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_BG'],
				lobbyPage: {
					npcImg: 'casino_bg',
				},
				eventIcons: [
					{
						icon: 'icon icon-new',
						period: PRODUCT_EVENT_PERIOD.LIVE_CASINO_BG,
					},
				],
			},
			{
				displayText: 'YeeBet',
				className: 'casino-yb',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-yb.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'ybBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_YEE_BET'],
				lobbyPage: {
					npcImg: 'casino_yb',
				},
			},
			{
				displayText: 'Skywind',
				className: 'casino_Skywind',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-SK.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'skbg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],

				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_SKY_WIND'],
				lobbyPage: {
					npcImg: 'casino_yb',
				},
			},
			{
				displayText: 'Microgaming',
				className: 'casino_MG',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-mg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'mgbg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_MG'],
				lobbyPage: {
					npcImg: 'casino_mg',
				},
			},
			{
				displayText: 'Evolution Gaming',
				className: 'casino_EVO',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-ev.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'evbg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_EVO'],
				lobbyPage: {
					npcImg: 'casino_ev',
				},
			},
			{
				displayText: 'Playtech',
				className: 'casino_PT',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-pt.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'ptbg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.UseGoToGame,
				product: PRODUCTS['LIVE_CASINO_PT'],
				lobbyPage: {
					npcImg: 'casino_pt',
				},
			},
			{
				displayText: 'n2-LIVE',
				className: 'casino_N2LIVE',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-n2.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'n2bg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_N2'],
				lobbyPage: {
					npcImg: 'casino_n2',
				},
			},
			{
				displayText: 'WM Casino',
				className: 'liveWM',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-WM.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'wmBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_WM'],
				lobbyPage: {
					npcImg: 'casino_wm',
				},
				allowCurrencies: [MYR, USD, THB, CNY, IDR, INR, KHM],
			},
			{
				displayText: 'Allbet',
				className: 'liveALL',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-ALL.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'allBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_ALL_BET'],
				lobbyPage: {
					npcImg: 'casino_ab',
				},
				allowCurrencies: [IDR, MYR],
			},
			{
				displayText: 'eBET',
				className: 'liveEB',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-EB.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'ebBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_E_BET'],
				lobbyPage: {
					npcImg: 'casino_eb',
				},
			},
			{
				displayText: 'AE Sexy',
				className: 'liveAE',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-AE.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'aeBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_AE'],
				lobbyPage: {
					npcImg: 'casino_ae',
				},
			},
			{
				displayText: 'Dream Gaming',
				className: 'liveDG',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-DG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'dgBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_DG'],
				lobbyPage: {
					npcImg: 'casino_dg',
				},
			},
			{
				displayText: 'Asia Gaming',
				className: 'liveAG',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-AG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'agBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_AG'],
				lobbyPage: {
					npcImg: 'casino_ag',
				},
			},
		],
	},
	[MenuKeyEnum.Slots]: {
		displayKey: 'Label_General_Slots',
		className: 'slotbtn',
		pathname: paths.slots.root,
		checkBeforeLogin: true,
		subMenuClassName: 'livecasinoList',
		subMenuSort: {
			[THB]: [
				PRODUCTS.SLOTS_PP.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ADVANT_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_MGPSW.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JILI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JOKER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_RED_TIGER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_NET_ENT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_CQ9.TP_GAME_TYPE,
				PRODUCTS.SLOTS_GPI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_YGG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_AMB.TP_GAME_TYPE,
				PRODUCTS.SLOTS_HABANERO.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SIMPLE_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SKY_WIND.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ICG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_OW.TP_GAME_TYPE,
			],
			[MYR]: [
				PRODUCTS.SLOTS_PP.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ADVANT_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_MGPSW.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JILI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JOKER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_RED_TIGER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_NET_ENT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_CQ9.TP_GAME_TYPE,
				PRODUCTS.SLOTS_GPI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_YGG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_AMB.TP_GAME_TYPE,
				PRODUCTS.SLOTS_HABANERO.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SIMPLE_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SKY_WIND.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ICG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_OW.TP_GAME_TYPE,
			],
			[IDR]: [
				PRODUCTS.SLOTS_PP.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ADVANT_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_MGPSW.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JILI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JOKER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_RED_TIGER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_NET_ENT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_CQ9.TP_GAME_TYPE,
				PRODUCTS.SLOTS_GPI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_YGG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_AMB.TP_GAME_TYPE,
				PRODUCTS.SLOTS_HABANERO.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SIMPLE_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SKY_WIND.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ICG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_OW.TP_GAME_TYPE,
			],
			[INR]: [
				PRODUCTS.SLOTS_PP.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ADVANT_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_MGPSW.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JILI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JOKER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_RED_TIGER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_NET_ENT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_CQ9.TP_GAME_TYPE,
				PRODUCTS.SLOTS_GPI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_YGG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_AMB.TP_GAME_TYPE,
				PRODUCTS.SLOTS_HABANERO.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SIMPLE_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SKY_WIND.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ICG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_OW.TP_GAME_TYPE,
			],
			[BDT]: [
				PRODUCTS.SLOTS_PP.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ADVANT_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_MGPSW.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JILI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_JOKER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_RED_TIGER.TP_GAME_TYPE,
				PRODUCTS.SLOTS_NET_ENT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_CQ9.TP_GAME_TYPE,
				PRODUCTS.SLOTS_GPI.TP_GAME_TYPE,
				PRODUCTS.SLOTS_YGG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_AMB.TP_GAME_TYPE,
				PRODUCTS.SLOTS_HABANERO.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SIMPLE_PLAY.TP_GAME_TYPE,
				PRODUCTS.SLOTS_SKY_WIND.TP_GAME_TYPE,
				PRODUCTS.SLOTS_PT.TP_GAME_TYPE,
				PRODUCTS.SLOTS_ICG.TP_GAME_TYPE,
				PRODUCTS.SLOTS_OW.TP_GAME_TYPE,
			],
		},
		subMenu: [
			{
				displayText: 'Pragmatic Play',
				className: 'slot_PP',
				query: {
					provider: 'pragmatic-play',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotPP.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_PP'],
			},
			{
				displayText: 'Spadegaming',
				className: 'slot_SG',
				query: {
					provider: 'spadegaming',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotSG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_SG'],
			},
			{
				displayText: 'AdvantPlay',
				className: 'slot_AdvantPlay',
				query: {
					provider: 'advant-play',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotapnew.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_ADVANT_PLAY'],
			},
			{
				displayText: 'PG Soft',
				className: 'slot_PG',
				query: {
					provider: 'pg',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotPG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_PG'],
			},
			{
				displayText: 'Microgaming',
				className: 'slot_MGPSW',
				query: {
					provider: 'microgaming',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotmg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_MGPSW'],
			},
			{
				displayText: 'Jili',
				className: 'slot_JI',
				query: {
					provider: 'jili',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotji.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_JILI'],
			},
			{
				displayText: 'Joker',
				className: 'slot_JOKER',
				query: {
					provider: 'joker',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotJOKER.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_JOKER'],
			},
			{
				displayText: 'Red Tiger',
				className: 'slot_RedTiger',
				query: {
					provider: 'red-tiger',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotrt.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_RED_TIGER'],
			},
			{
				displayText: 'NetEnt',
				className: 'slot_NetEnt',
				query: {
					provider: 'netent',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotnt.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_NET_ENT'],
			},
			{
				displayText: 'CQ9',
				className: 'slot_CQ9',
				query: {
					provider: 'cq9',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotCQ9.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_CQ9'],
			},
			{
				displayText: 'Game Play',
				className: 'slot_GPI',
				query: {
					provider: 'gpi',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotGPI.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_GPI'],
			},
			{
				displayText: 'YGGDrassil',
				className: 'slot_YGG',
				query: {
					provider: 'ygg',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotYGG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_YGG'],
			},
			{
				displayText: 'AMBSlot',
				className: 'slot_AMB',
				query: {
					provider: 'amb',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotam.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_AMB'],
				allowCurrencies: [THB, USD, CNY, KHM],
			},
			{
				displayText: 'Habanero',
				className: 'slot_Habanero',
				query: {
					provider: 'habanero',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotho.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_HABANERO'],
			},
			{
				displayText: 'SimplePlay',
				className: 'slot_SimplePlay',
				query: {
					provider: 'simple-play',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotSimplePlay.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_SIMPLE_PLAY'],
			},
			{
				displayText: 'Skywind',
				className: 'slot_Skywind',
				query: {
					provider: 'skywind',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotsk.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_SKY_WIND'],
			},
			{
				displayText: 'Playtech',
				className: 'slot_PT',
				query: {
					provider: 'playtech',
				},
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'slotpt.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'slotListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS['SLOTS_PT'],
			},
		],
	},
	[MenuKeyEnum.Games]: {
		displayKey: 'Label_General_Games',
		pathname: paths.game.root,
		// * 整理完之後看起來都一樣，留著以防之後要用
		// subMenuSort: {
		// 	[THB]: [
		// 		PRODUCTS.POKER_GAMES_M_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_AMB_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAME_MAX_GAME.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_KINGMAKER.TP_GAME_TYPE,
		// 	],
		// 	[MYR]: [
		// 		PRODUCTS.POKER_GAMES_M_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_AMB_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAME_MAX_GAME.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_KINGMAKER.TP_GAME_TYPE,
		// 	],
		// 	[IDR]: [
		// 		PRODUCTS.POKER_GAMES_M_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_AMB_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAME_MAX_GAME.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_KINGMAKER.TP_GAME_TYPE,
		// 	],
		// 	[INR]: [
		// 		PRODUCTS.POKER_GAMES_M_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_AMB_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAME_MAX_GAME.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_KINGMAKER.TP_GAME_TYPE,
		// 	],
		// 	[BDT]: [
		// 		PRODUCTS.POKER_GAMES_M_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_AMB_POKER.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAME_MAX_GAME.TP_GAME_TYPE,
		// 		PRODUCTS.POKER_GAMES_KINGMAKER.TP_GAME_TYPE,
		// 	],
		// },
		subMenuClassName: 'livecasinoList',
		subMenu: [
			{
				displayText: 'MPoker',
				className: 'mp',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'mp.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'tablelisthover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.POKER_GAMES_M_POKER,
				lobbyPage: {
					bgImg: 'gamemp.png',
					hoverBgImg: 'gamempa.png',
				},
				allowCurrencies: [THB],
			},
			{
				displayText: 'AMB Poker',
				className: 'fsgw',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'am.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'tablelisthover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.POKER_GAMES_AMB_POKER,
				lobbyPage: {
					bgImg: 'gameamb.png',
					hoverBgImg: 'gameamba.png',
				},
				allowCurrencies: [THB],
			},
			{
				displayText: 'Vgaming',
				className: 'fsgw',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'vg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'tablelisthover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.SPORTS_SABA_CLUB,
				lobbyPage: {
					bgImg: 'gamevg.png',
					hoverBgImg: 'gamevga.png',
				},
				allowCurrencies: [THB],
			},
			{
				displayText: 'King Maker',
				className: 'fsgw',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'km.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'tablelisthover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.POKER_GAMES_KINGMAKER,
				lobbyPage: {
					bgImg: 'gamekim.png',
					hoverBgImg: 'gamekima.png',
				},
			},
		],
	},
	[MenuKeyEnum.Fishing]: {
		displayKey: 'Label_General_Fishing',
		className: 'fishbtn',
		pathname: paths.fishing.root,
		subMenuClassName: 'fishList',
		subMenuSort: {
			[THB]: [
				PRODUCTS.FISHING_SGW.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_PARADISE.TP_GAME_TYPE,
				PRODUCTS.FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_SKY_WIND_OCEAN_RULER.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_DRAGON_BALL.TP_GAME_TYPE,
				PRODUCTS.FISHING_HAIBA.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_HAPPY_FISH_5.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_MONSTER_AWAKEN.TP_GAME_TYPE,
				PRODUCTS.FISHING_SG.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_ONE_SHOT_FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_THE_TYRANT_AND_THE_PRINCESS.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_FISHING_OF_SAVIORS.TP_GAME_TYPE,
			],
			[MYR]: [
				PRODUCTS.FISHING_SGW.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_PARADISE.TP_GAME_TYPE,
				PRODUCTS.FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_SKY_WIND_OCEAN_RULER.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_DRAGON_BALL.TP_GAME_TYPE,
				PRODUCTS.FISHING_HAIBA.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_HAPPY_FISH_5.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_MONSTER_AWAKEN.TP_GAME_TYPE,
			],
			[IDR]: [
				PRODUCTS.FISHING_SGW.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_PARADISE.TP_GAME_TYPE,
				PRODUCTS.FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_SKY_WIND_OCEAN_RULER.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_DRAGON_BALL.TP_GAME_TYPE,
				PRODUCTS.FISHING_HAIBA.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_HAPPY_FISH_5.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_MONSTER_AWAKEN.TP_GAME_TYPE,
			],
			[INR]: [
				PRODUCTS.FISHING_SGW.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_PARADISE.TP_GAME_TYPE,
				PRODUCTS.FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_SKY_WIND_OCEAN_RULER.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_DRAGON_BALL.TP_GAME_TYPE,
				PRODUCTS.FISHING_HAIBA.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_HAPPY_FISH_5.TP_GAME_TYPE,
				PRODUCTS.FISHING_HUNTING_MONSTER_AWAKEN.TP_GAME_TYPE,
				PRODUCTS.FISHING_SG.TP_GAME_TYPE,
				PRODUCTS.FISHING_CQ9_ONE_SHOT_FISHING.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_THE_TYRANT_AND_THE_PRINCESS.TP_GAME_TYPE,
				PRODUCTS.FISHING_ICG_FISHING_OF_SAVIORS.TP_GAME_TYPE,
			],
		},
		subMenu: [
			{
				displayKey: 'Label_Product_Haiba',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'hb.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_HAIBA,
				lobbyPage: {
					bgImg: 'fishhb.png',
					hoverBgImg: 'fishhba.png',
				},
			},
			{
				displayKey: 'Label_Fishing_Hunting_Happy_Fish_5',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'hf5.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_HUNTING_HAPPY_FISH_5,
				lobbyPage: {
					bgImg: 'fishhf.png',
					hoverBgImg: 'fishhfa.png',
				},
			},
			{
				displayKey: 'Label_Fishing_Hunting_Monster_Awaken',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'ma.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_HUNTING_MONSTER_AWAKEN,
				lobbyPage: {
					bgImg: 'fishma.png',
					hoverBgImg: 'fishmaa.png',
				},
			},
			{
				displayKey: 'Label_Paradise',
				className: 'fsgw',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'paradise.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_CQ9_PARADISE,
				lobbyPage: {
					bgImg: 'fishpd.png',
					hoverBgImg: 'fishpda.png',
				},
			},
			{
				displayKey: 'Label_FishingGG',
				className: 'fgg',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'fishGG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING,
				lobbyPage: {
					bgImg: 'fishgg.png',
					hoverBgImg: 'fishgga.png',
				},
			},
			{
				displayKey: 'Label_FishingSG2',
				className: 'fsgw',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'fishSGwar.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_SGW,
				lobbyPage: {
					bgImg: 'fishfw.png',
					hoverBgImg: 'fishfwa.png',
				},
			},
			{
				displayKey: 'Label_FishingSG1',
				className: 'fsg',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'fishSG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_SG,
				lobbyPage: {
					bgImg: 'fishfg.png',
					hoverBgImg: 'fishfga.png',
				},
				allowCurrencies: [INR],
			},
			{
				displayKey: 'Label_Oneshot_Fishing',
				className: 'fsg',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'oneshotfishing.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'fishListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.FISHING_CQ9_ONE_SHOT_FISHING,
				lobbyPage: {
					bgImg: 'fishof.png',
					hoverBgImg: 'fishofa.png',
				},
				allowCurrencies: [INR],
			},
		],
	},
	[MenuKeyEnum.Lottery]: {
		displayKey: 'Label_General_Lottery',
		pathname: paths.lottery.root,
		subMenuClassName: 'gameList',
		subMenu: [
			{
				displayKey: 'Label_Product_GPI_Keno',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-gpikeno.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_GPI_KENO,
				lobbyPage: {
					bgImg: 'lotterygpikeno.png',
					hoverBgImg: 'lotterygpikenoa.png',
				},
			},
			{
				displayKey: 'Label_Product_GPI_ThaiLottery',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-gpithai.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_GPI_THAILOTTERY,
				lobbyPage: {
					bgImg: 'lotterygpithai.png',
					hoverBgImg: 'lotterygpithaia.png',
				},
				allowCurrencies: [THB],
			},
			{
				displayKey: 'Label_Product_GPI_Fast3',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-gpifast3.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_GPI_FAST3,
				lobbyPage: {
					bgImg: 'lotterygpifast3.png',
					hoverBgImg: 'lotterygpifast3a.png',
				},
			},
			{
				displayKey: 'Label_Product_TcGame',
				className: 'indo',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-tcg.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_TCG,
				lobbyPage: {
					bgImg: 'lotterytc.png',
					hoverBgImg: 'lotterytca.png',
				},
			},
			{
				displayKey: 'Label_Product_Keno',
				className: 'keno',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-keno.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_KENO,
				lobbyPage: {
					bgImg: 'lotteryke.png',
					hoverBgImg: 'lotterykea.png',
				},
			},
			{
				displayKey: 'Label_General_Lottery',
				className: 'lottery',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-lottery.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY,
				lobbyPage: {
					bgImg: 'lotterylo.png',
					hoverBgImg: 'lotteryloa.png',
				},
			},
			{
				displayKey: 'Label_Product_NumberGame',
				className: 'numberGame',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-numberGame.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
				product: PRODUCTS.LOTTERY_NUMBER_GAME,
				query: { provider: 'saba', type: 'number-game' },
				lobbyPage: {
					bgImg: 'lotterynu.png',
					hoverBgImg: 'lotterynua.png',
				},
			},
			{
				displayKey: 'Label_Product_TableGame',
				className: 'numberGame',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'lo-tableGame.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'gameListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS.LOTTERY_TABLE_GAME,
				query: { provider: 'saba', type: 'number-game' },
				lobbyPage: {
					bgImg: 'lotteryta.png',
					hoverBgImg: 'lotterytaa.png',
				},
			},
		],
	},
	[MenuKeyEnum.Promotion]: {
		displayKey: 'Label_General_Promos',
		pathname: paths.promotion.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'promoList',
	},
	[MenuKeyEnum.VIP]: {
		displayText: 'VIP',
		pathname: paths.vip.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'vipList vipcs',
	},
	[MenuKeyEnum.VIP]: {
		displayKey: 'Label_LeaderBoard',
		pathname: paths.leaderboard.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'rankingList',
	},
}
