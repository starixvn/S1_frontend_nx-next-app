import { CurrenciesEnum, MenuKeyEnum } from '@nx-next-app/types'
import {
	IMenuData,
	MenuActionTypeEnum,
} from '@nx-next-app/features/F0001/types'
import { paths } from '../../../constants/paths'
import { ALLOWED_CURRENCIES } from './allowCurrency'
import { PRODUCTS } from './products'

const PRODUCT_EVENT_PERIOD = {
	SPORTS_9W: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
	LIVE_CASINO_BG: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
	PROMOS: { start: null, end: '2023/12/31 22:59:59' },
}

const { MYR, INR, IDR, BDT, THB } = CurrenciesEnum

type ProductKeys = keyof typeof PRODUCTS

export const MENU_DATA: IMenuData<ProductKeys> = {
	[MenuKeyEnum.Home]: {
		className: 'icon icon-home',
		pathname: paths.home.root,
		menuActionType: MenuActionTypeEnum.Link,
		allowCurrencies: true,
		subMenuClassName: 'homeList',
		subMenuAllowCurrenciesWithAuth: false,
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
				allowCurrencies: ALLOWED_CURRENCIES['VIP'],
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
				allowCurrencies: ALLOWED_CURRENCIES['LEADER_BOARD'],
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
		menuActionType: MenuActionTypeEnum.Link,
		allowCurrencies: true,
		subMenuClassName: 'appList',
		subMenuAllowCurrenciesWithAuth: false,
	},
	[MenuKeyEnum.CryptoSports]: {
		className: 'cryptobtn',
		menuActionType: MenuActionTypeEnum.EnterPage,
		product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
		allowCurrencies: true,
		menuType: 'banner',
		subMenuClassName: 'cryptoList',
		subMenuAllowCurrenciesWithAuth: false,
	},
	[MenuKeyEnum.Sports]: {
		displayKey: 'Label_General_Sports',
		className: 'sportsbtn',
		pathname: paths.sports.root,
		menuActionType: MenuActionTypeEnum.Link,
		allowCurrencies: true,
		product: PRODUCTS['SPORTS'],
		query: { provider: 'saba', type: 'soccer' },
		subMenuSort: {
			[INR]: [
				'SPORTS_CRYPTO_SPORTS',
				'SPORTS_SOCCER',
				'SPORTS_SABA_SOCCER',
				'SPORTS_BASKETBALL',
				'SPORTS_CRICKET',
				'SPORTS_BADMINTON',
				'SPORTS_VOLLEYBALL',
				'VIRTUAL_SPORTS',
			],
			[BDT]: [
				'SPORTS_CRYPTO_SPORTS',
				'SPORTS_CRICKET',
				'SPORTS_SOCCER',
				'SPORTS_SABA_SOCCER',
				'SPORTS_BASKETBALL',
				'SPORTS_BADMINTON',
				'SPORTS_VOLLEYBALL',
				'VIRTUAL_SPORTS',
			],
		},
		subMenuClassName: 'sportsList',
		subMenuAllowCurrenciesWithAuth: false,
		subMenu: [
			{
				productKey: 'SPORTS_CRYPTO_SPORTS',
				displayKey: 'Label_General_CryptoSports',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'cryptosportNPC.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
			},
			{
				productKey: 'SPORTS_SABA_SOCCER',
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
				product: PRODUCTS['SPORTS_SABA_SOCCER'],
				menuActionType: MenuActionTypeEnum.Link,
			},
			{
				productKey: 'SPORTS_SOCCER',
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
				productKey: 'SPORTS_BASKETBALL',
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
				productKey: 'SPORTS_CRICKET',
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
				allowCurrencies: ALLOWED_CURRENCIES['SPORTS_CRICKET'],
			},
			{
				productKey: 'SPORTS_BADMINTON',
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
				productKey: 'SPORTS_VOLLEYBALL',
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
				product: PRODUCTS['SPORTS_VOLLEYBALL'],
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: ALLOWED_CURRENCIES['SPORTS_VOLLEYBALL'],
			},
			{
				productKey: 'VIRTUAL_SPORTS',
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
				allowCurrencies: ALLOWED_CURRENCIES['SPORTS_VOLLEYBALL'],
			},
		],
	},
	[MenuKeyEnum.Exchange]: {
		displayKey: 'Label_General_Exchange',
		className: 'exchange',
		allowCurrencies: ALLOWED_CURRENCIES['EXCHANGE'],
		menuActionType: MenuActionTypeEnum.Null,
		subMenuClassName: 'exchangeList',
		subMenuAllowCurrenciesWithAuth: false,
		subMenu: [
			{
				productKey: 'SPORTS_9W_SPORTS',
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
						text: 'NEW',
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
		menuActionType: MenuActionTypeEnum.Link,
		allowCurrencies: true,
		subMenuClassName: 'eSportsList',
		subMenuAllowCurrenciesWithAuth: false,
		subMenu: [
			{
				productKey: 'SPORTS_E_SPORT_ALL',
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
				productKey: 'SPORTS_E_SPORT_DOTA2',
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
				productKey: 'SPORTS_E_SPORT_LOL',
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
				productKey: 'SPORTS_E_SPORT_CSGO',
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
				productKey: 'SPORTS_E_SPORT_KOG',
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
		menuActionType: MenuActionTypeEnum.Link,
		allowCurrencies: true,
		subMenuClassName: 'livecasinoList',
		subMenuAllowCurrenciesWithAuth: true,
		subMenuSort: {
			[MYR]: [
				'LIVE_CASINO_PP',
				'LIVE_CASINO_BG',
				'LIVE_CASINO_YEE_BET',
				'LIVE_CASINO_SKY_WIND',
				'LIVE_CASINO_MG',
				'LIVE_CASINO_EVO',
				'LIVE_CASINO_PT',
				'LIVE_CASINO_DG',
				'LIVE_CASINO_AE',
				'LIVE_CASINO_SA',
				'LIVE_CASINO_ALL_BET',
				'LIVE_CASINO_AG',
				'LIVE_CASINO_WM',
				'LIVE_CASINO_E_BET',
				'LIVE_CASINO_N2',
			],
			[THB]: [
				'LIVE_CASINO_PP',
				'LIVE_CASINO_BG',
				'LIVE_CASINO_YEE_BET',
				'LIVE_CASINO_SKY_WIND',
				'LIVE_CASINO_MG',
				'LIVE_CASINO_EVO',
				'LIVE_CASINO_PT',
				'LIVE_CASINO_DG',
				'LIVE_CASINO_AE',
				'LIVE_CASINO_SA',
				'LIVE_CASINO_ALL_BET',
				'LIVE_CASINO_AG',
				'LIVE_CASINO_WM',
				'LIVE_CASINO_E_BET',
				'LIVE_CASINO_N2',
			],
			[IDR]: [
				'LIVE_CASINO_PP',
				'LIVE_CASINO_BG',
				'LIVE_CASINO_YEE_BET',
				'LIVE_CASINO_SKY_WIND',
				'LIVE_CASINO_MG',
				'LIVE_CASINO_EVO',
				'LIVE_CASINO_PT',
				'LIVE_CASINO_DG',
				'LIVE_CASINO_AE',
				'LIVE_CASINO_SA',
				'LIVE_CASINO_ALL_BET',
				'LIVE_CASINO_AG',
				'LIVE_CASINO_WM',
				'LIVE_CASINO_E_BET',
				'LIVE_CASINO_N2',
			],
			[INR]: [
				'LIVE_CASINO_PP',
				'LIVE_CASINO_BG',
				'LIVE_CASINO_YEE_BET',
				'LIVE_CASINO_SKY_WIND',
				'LIVE_CASINO_MG',
				'LIVE_CASINO_EVO',
				'LIVE_CASINO_PT',
				'LIVE_CASINO_DG',
				'LIVE_CASINO_AE',
				'LIVE_CASINO_SA',
				'LIVE_CASINO_ALL_BET',
				'LIVE_CASINO_AG',
				'LIVE_CASINO_WM',
				'LIVE_CASINO_E_BET',
				'LIVE_CASINO_N2',
			],
			[BDT]: [
				'LIVE_CASINO_PP',
				'LIVE_CASINO_BG',
				'LIVE_CASINO_YEE_BET',
				'LIVE_CASINO_SKY_WIND',
				'LIVE_CASINO_MG',
				'LIVE_CASINO_EVO',
				'LIVE_CASINO_PT',
				'LIVE_CASINO_DG',
				'LIVE_CASINO_AE',
				'LIVE_CASINO_SA',
				'LIVE_CASINO_ALL_BET',
				'LIVE_CASINO_E_BET',
				'LIVE_CASINO_N2',
			],
		},
		subMenu: [
			{
				productKey: 'LIVE_CASINO_PP',
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
				productKey: 'LIVE_CASINO_BG',
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
						text: 'NEW',
						period: PRODUCT_EVENT_PERIOD.LIVE_CASINO_BG,
					},
				],
			},
			{
				productKey: 'LIVE_CASINO_YEE_BET',
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
				productKey: 'LIVE_CASINO_SKY_WIND',
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
				productKey: 'LIVE_CASINO_MG',
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
				productKey: 'LIVE_CASINO_EVO',
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
				productKey: 'LIVE_CASINO_PT',
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
				productKey: 'LIVE_CASINO_N2',
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
				productKey: 'LIVE_CASINO_WM',
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
				allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_WM'],
			},
			{
				productKey: 'LIVE_CASINO_ALL_BET',
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
				allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_ALL_BET'],
			},
			{
				productKey: 'LIVE_CASINO_E_BET',
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
				productKey: 'LIVE_CASINO_SA',
				displayText: 'SA Gaming',
				className: 'liveSA',
				headerMenuImgList: [
					{
						className: 'List-npc',
						imgUrl: 'casino-SA.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'saBG.png',
					},
					{
						className: 'List-bg',
						imgUrl: 'livecasinListHover.png',
					},
				],
				menuActionType: MenuActionTypeEnum.EnterPage,
				product: PRODUCTS['LIVE_CASINO_SA'],
				lobbyPage: {
					npcImg: 'casino_sa',
				},
			},
			{
				productKey: 'LIVE_CASINO_DG',
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
				productKey: 'LIVE_CASINO_AE',
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
				productKey: 'LIVE_CASINO_AG',
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
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'livecasinoList',
		subMenuAllowCurrenciesWithAuth: true,
		subMenuSort: {
			[THB]: [
				'SLOTS_PP',
				'SLOTS_SG',
				'SLOTS_ADVANT_PLAY',
				'SLOTS_PG',
				'SLOTS_MGPSW',
				'SLOTS_JILI',
				'SLOTS_JOKER',
				'SLOTS_RED_TIGER',
				'SLOTS_NET_ENT',
				'SLOTS_CQ9',
				'SLOTS_GPI',
				'SLOTS_YGG',
				'SLOTS_AMB',
				'SLOTS_HABANERO',
				'SLOTS_SIMPLE_PLAY',
				'SLOTS_SKY_WIND',
				'SLOTS_PT',
				'SLOTS_ICG',
				'SLOTS_OW',
			],
			[MYR]: [
				'SLOTS_PP',
				'SLOTS_SG',
				'SLOTS_ADVANT_PLAY',
				'SLOTS_PG',
				'SLOTS_MGPSW',
				'SLOTS_JILI',
				'SLOTS_JOKER',
				'SLOTS_RED_TIGER',
				'SLOTS_NET_ENT',
				'SLOTS_CQ9',
				'SLOTS_GPI',
				'SLOTS_YGG',
				'SLOTS_AMB',
				'SLOTS_HABANERO',
				'SLOTS_SIMPLE_PLAY',
				'SLOTS_SKY_WIND',
				'SLOTS_PT',
				'SLOTS_ICG',
				'SLOTS_OW',
			],
			[IDR]: [
				'SLOTS_PP',
				'SLOTS_SG',
				'SLOTS_ADVANT_PLAY',
				'SLOTS_PG',
				'SLOTS_MGPSW',
				'SLOTS_JILI',
				'SLOTS_JOKER',
				'SLOTS_RED_TIGER',
				'SLOTS_NET_ENT',
				'SLOTS_CQ9',
				'SLOTS_GPI',
				'SLOTS_YGG',
				'SLOTS_AMB',
				'SLOTS_HABANERO',
				'SLOTS_SIMPLE_PLAY',
				'SLOTS_SKY_WIND',
				'SLOTS_PT',
				'SLOTS_ICG',
				'SLOTS_OW',
			],
			[INR]: [
				'SLOTS_PP',
				'SLOTS_SG',
				'SLOTS_ADVANT_PLAY',
				'SLOTS_PG',
				'SLOTS_MGPSW',
				'SLOTS_JILI',
				'SLOTS_JOKER',
				'SLOTS_RED_TIGER',
				'SLOTS_NET_ENT',
				'SLOTS_CQ9',
				'SLOTS_GPI',
				'SLOTS_YGG',
				'SLOTS_AMB',
				'SLOTS_HABANERO',
				'SLOTS_SIMPLE_PLAY',
				'SLOTS_SKY_WIND',
				'SLOTS_PT',
				'SLOTS_ICG',
				'SLOTS_OW',
			],
			[BDT]: [
				'SLOTS_PP',
				'SLOTS_SG',
				'SLOTS_ADVANT_PLAY',
				'SLOTS_PG',
				'SLOTS_MGPSW',
				'SLOTS_JILI',
				'SLOTS_JOKER',
				'SLOTS_RED_TIGER',
				'SLOTS_NET_ENT',
				'SLOTS_CQ9',
				'SLOTS_GPI',
				'SLOTS_YGG',
				'SLOTS_AMB',
				'SLOTS_HABANERO',
				'SLOTS_SIMPLE_PLAY',
				'SLOTS_SKY_WIND',
				'SLOTS_PT',
				'SLOTS_ICG',
				'SLOTS_OW',
			],
		},
		subMenu: [
			{
				productKey: 'SLOTS_PP',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_SG',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_ADVANT_PLAY',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_PG',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_MGPSW',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_JILI',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_JOKER',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_RED_TIGER',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_NET_ENT',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_CQ9',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_GPI',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_YGG',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_AMB',
				pathname: paths.slots.root,
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
				allowCurrencies: ALLOWED_CURRENCIES['SLOTS_AMB'],
			},
			{
				productKey: 'SLOTS_HABANERO',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_SIMPLE_PLAY',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_SKY_WIND',
				pathname: paths.slots.root,
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
				productKey: 'SLOTS_PT',
				pathname: paths.slots.root,
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
		allowCurrencies: true,
	},
	[MenuKeyEnum.Games]: {
		displayKey: 'Label_General_Games',
		className: '',
		pathname: paths.game.root,
		menuActionType: MenuActionTypeEnum.Link,
		// * 整理完之後看起來都一樣，留著以防之後要用
		// subMenuSort: {
		// 	[THB]: [
		// 		'GAMES_POKER_M_POKER',
		// 		'GAMES_POKER_AMB_POKER',
		// 		'GAME_POKER_MAX_GAME',
		// 		'GAMES_POKER_KINGMAKER',
		// 	],
		// 	[MYR]: [
		// 		'GAMES_POKER_M_POKER',
		// 		'GAMES_POKER_AMB_POKER',
		// 		'GAME_POKER_MAX_GAME',
		// 		'GAMES_POKER_KINGMAKER',
		// 	],
		// 	[IDR]: [
		// 		'GAMES_POKER_M_POKER',
		// 		'GAMES_POKER_AMB_POKER',
		// 		'GAME_POKER_MAX_GAME',
		// 		'GAMES_POKER_KINGMAKER',
		// 	],
		// 	[INR]: [
		// 		'GAMES_POKER_M_POKER',
		// 		'GAMES_POKER_AMB_POKER',
		// 		'GAME_POKER_MAX_GAME',
		// 		'GAMES_POKER_KINGMAKER',
		// 	],
		// 	[BDT]: [
		// 		'GAMES_POKER_M_POKER',
		// 		'GAMES_POKER_AMB_POKER',
		// 		'GAME_POKER_MAX_GAME',
		// 		'GAMES_POKER_KINGMAKER',
		// 	],
		// },
		subMenuClassName: 'livecasinoList',
		subMenuAllowCurrenciesWithAuth: false,
		subMenu: [
			{
				productKey: 'GAMES_POKER_M_POKER',
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
				product: PRODUCTS['GAMES_POKER_M_POKER'],
				lobbyPage: {
					bgImg: 'gamemp.png',
					hoverBgImg: 'gamempa.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['GAMES_POKER_M_POKER'],
			},
			{
				productKey: 'GAMES_POKER_AMB_POKER',
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
				product: PRODUCTS['GAMES_POKER_AMB_POKER'],
				lobbyPage: {
					bgImg: 'gameamb.png',
					hoverBgImg: 'gameamba.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['GAMES_POKER_AMB_POKER'],
			},
			{
				productKey: 'SPORTS_SABA_CLUB',
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
				product: PRODUCTS['SPORTS_SABA_CLUB'],
				lobbyPage: {
					bgImg: 'gamevg.png',
					hoverBgImg: 'gamevga.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['SPORTS_SABA_CLUB'],
			},
			{
				productKey: 'GAMES_POKER_KINGMAKER',
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
				product: PRODUCTS['GAMES_POKER_KINGMAKER'],
				lobbyPage: {
					bgImg: 'gamekim.png',
					hoverBgImg: 'gamekima.png',
				},
			},
		],

		allowCurrencies: true,
	},
	[MenuKeyEnum.Fishing]: {
		displayKey: 'Label_General_Fishing',
		className: 'fishbtn',
		pathname: paths.fishing.root,
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'fishList',
		subMenuSort: {
			[THB]: [
				'FISHING_SGW',
				'FISHING_CQ9_PARADISE',
				'FISHING',
				'FISHING_SKY_WIND_OCEAN_RULER',
				'FISHING_ICG_DRAGON_BALL',
				'FISHING_HAIBA',
				'FISHING_HUNTING_HAPPY_FISH_5',
				'FISHING_HUNTING_MONSTER_AWAKEN',
				'FISHING_SG',
				'FISHING_CQ9_ONE_SHOT_FISHING',
				'FISHING_ICG_THE_TYRANT_AND_THE_PRINCESS',
				'FISHING_ICG_FISHING_OF_SAVIORS',
			],
			[MYR]: [
				'FISHING_SGW',
				'FISHING_CQ9_PARADISE',
				'FISHING',
				'FISHING_SKY_WIND_OCEAN_RULER',
				'FISHING_ICG_DRAGON_BALL',
				'FISHING_HAIBA',
				'FISHING_HUNTING_HAPPY_FISH_5',
				'FISHING_HUNTING_MONSTER_AWAKEN',
			],
			[IDR]: [
				'FISHING_SGW',
				'FISHING_CQ9_PARADISE',
				'FISHING',
				'FISHING_SKY_WIND_OCEAN_RULER',
				'FISHING_ICG_DRAGON_BALL',
				'FISHING_HAIBA',
				'FISHING_HUNTING_HAPPY_FISH_5',
				'FISHING_HUNTING_MONSTER_AWAKEN',
			],
			[INR]: [
				'FISHING_SGW',
				'FISHING_CQ9_PARADISE',
				'FISHING',
				'FISHING_SKY_WIND_OCEAN_RULER',
				'FISHING_ICG_DRAGON_BALL',
				'FISHING_HAIBA',
				'FISHING_HUNTING_HAPPY_FISH_5',
				'FISHING_HUNTING_MONSTER_AWAKEN',
				'FISHING_SG',
				'FISHING_CQ9_ONE_SHOT_FISHING',
				'FISHING_ICG_THE_TYRANT_AND_THE_PRINCESS',
				'FISHING_ICG_FISHING_OF_SAVIORS',
			],
		},
		subMenu: [
			{
				productKey: 'FISHING_HAIBA',
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
				product: PRODUCTS['FISHING_HAIBA'],
				lobbyPage: {
					bgImg: 'fishhb.png',
					hoverBgImg: 'fishhba.png',
				},
			},
			{
				productKey: 'FISHING_HUNTING_HAPPY_FISH_5',
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
				product: PRODUCTS['FISHING_HUNTING_HAPPY_FISH_5'],
				lobbyPage: {
					bgImg: 'fishhf.png',
					hoverBgImg: 'fishhfa.png',
				},
			},
			{
				productKey: 'FISHING_HUNTING_MONSTER_AWAKEN',
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
				product: PRODUCTS['FISHING_HUNTING_MONSTER_AWAKEN'],
				lobbyPage: {
					bgImg: 'fishma.png',
					hoverBgImg: 'fishmaa.png',
				},
			},
			{
				productKey: 'FISHING_CQ9_PARADISE',
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
				product: PRODUCTS['FISHING_CQ9_PARADISE'],
				lobbyPage: {
					bgImg: 'fishpd.png',
					hoverBgImg: 'fishpda.png',
				},
			},
			{
				productKey: 'FISHING',
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
				product: PRODUCTS['FISHING'],
				lobbyPage: {
					bgImg: 'fishgg.png',
					hoverBgImg: 'fishgga.png',
				},
			},
			{
				productKey: 'FISHING_SGW',
				displayKey: 'Label_Fishing_FishingWar',
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
				product: PRODUCTS['FISHING_SGW'],
				lobbyPage: {
					bgImg: 'fishfw.png',
					hoverBgImg: 'fishfwa.png',
				},
			},
			{
				productKey: 'FISHING_SG',
				displayKey: 'Label_Fishing_FishingGod',
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
				product: PRODUCTS['FISHING_SG'],
				lobbyPage: {
					bgImg: 'fishfg.png',
					hoverBgImg: 'fishfga.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['FISHING_SG'],
			},
			{
				productKey: 'FISHING_CQ9_ONE_SHOT_FISHING',
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
				product: PRODUCTS['FISHING_CQ9_ONE_SHOT_FISHING'],
				lobbyPage: {
					bgImg: 'fishof.png',
					hoverBgImg: 'fishofa.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['FISHING_CQ9_ONE_SHOT_FISHING'],
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
		allowCurrencies: true,
	},
	[MenuKeyEnum.Lottery]: {
		displayKey: 'Label_General_Lottery',
		className: '',
		pathname: paths.lottery.root,
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'gameList',
		subMenu: [
			{
				productKey: 'LOTTERY_GPI_KENO',
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
				product: PRODUCTS['LOTTERY_GPI_KENO'],
				lobbyPage: {
					bgImg: 'lotterygpikeno.png',
					hoverBgImg: 'lotterygpikenoa.png',
				},
			},
			{
				productKey: 'LOTTERY_GPI_THAILOTTERY',
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
				product: PRODUCTS['LOTTERY_GPI_THAILOTTERY'],
				lobbyPage: {
					bgImg: 'lotterygpithai.png',
					hoverBgImg: 'lotterygpithaia.png',
				},
				allowCurrencies: ALLOWED_CURRENCIES['LOTTERY_GPI_THAILOTTERY'],
			},
			{
				productKey: 'LOTTERY_GPI_FAST3',
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
				product: PRODUCTS['LOTTERY_GPI_FAST3'],
				lobbyPage: {
					bgImg: 'lotterygpifast3.png',
					hoverBgImg: 'lotterygpifast3a.png',
				},
			},
			{
				productKey: 'LOTTERY_TCG',
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
				product: PRODUCTS['LOTTERY_TCG'],
				lobbyPage: {
					bgImg: 'lotterytc.png',
					hoverBgImg: 'lotterytca.png',
				},
			},
			{
				productKey: 'LOTTERY_KENO',
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
				product: PRODUCTS['LOTTERY_KENO'],
				lobbyPage: {
					bgImg: 'lotteryke.png',
					hoverBgImg: 'lotterykea.png',
				},
			},
			{
				productKey: 'LOTTERY',
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
				product: PRODUCTS['LOTTERY'],
				lobbyPage: {
					bgImg: 'lotterylo.png',
					hoverBgImg: 'lotteryloa.png',
				},
			},
			{
				productKey: 'LOTTERY_NUMBER_GAME',
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
				product: PRODUCTS['LOTTERY_NUMBER_GAME'],
				query: { provider: 'saba', type: 'number-game' },
				lobbyPage: {
					bgImg: 'lotterynu.png',
					hoverBgImg: 'lotterynua.png',
				},
			},
			{
				productKey: 'LOTTERY_TABLE_GAME',
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
				product: PRODUCTS['LOTTERY_TABLE_GAME'],
				query: { provider: 'saba', type: 'number-game' },
				lobbyPage: {
					bgImg: 'lotteryta.png',
					hoverBgImg: 'lotterytaa.png',
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
		allowCurrencies: true,
	},
	[MenuKeyEnum.Promotion]: {
		displayKey: 'Label_General_Promos',
		className: '',
		pathname: paths.promotion.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'promoList',
		subMenuAllowCurrenciesWithAuth: false,
		allowCurrencies: true,
		eventIcons: [
			{
				icon: 'icon icon-mediafire',
				text: 'HOT',
				period: PRODUCT_EVENT_PERIOD.PROMOS,
			},
		],
	},
	[MenuKeyEnum.VIP]: {
		displayText: 'VIP',
		className: '',
		pathname: paths.vip.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'vipList',
		subMenuAllowCurrenciesWithAuth: false,
		allowCurrencies: true,
	},
	[MenuKeyEnum.LeaderBoard]: {
		displayKey: 'Label_LeaderBoard',
		className: '',
		pathname: paths.leaderboard.root,
		menuType: 'banner',
		menuActionType: MenuActionTypeEnum.Link,
		subMenuClassName: 'rankingList',
		subMenuAllowCurrenciesWithAuth: false,
		allowCurrencies: true,
	},
}
