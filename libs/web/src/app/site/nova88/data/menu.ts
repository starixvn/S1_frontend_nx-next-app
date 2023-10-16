import {
	CurrenciesEnum,
	DeviceTypeEnum,
	IEventPeriod,
	MenuKeyEnum,
} from '@nx-next-app/types'
import {
	IMenuData,
	MenuActionTypeEnum,
} from '@nx-next-app/features/F0001/types'
import { paths, PRODUCTS } from '@nx-next-app/constants'

import { ALLOWED_CURRENCIES } from './allowCurrency'

/**
 * 定義 menu 的活動時間，只存在於 menu.ts
 */
const PRODUCT_EVENT_PERIOD: {
	[key: string]: IEventPeriod
} = {
	SPORTS_9W: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
	LIVE_CASINO_BG: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
	PROMOS: { start: null, end: '2023/12/31 22:59:59' },
	LUCKY_WHEEL: { start: '2021/12/13 00:00:00', end: null },
	VIP: {
		start: '2021/02/05 12:00:00',
		end: null,
	},
	RANKING: {
		start: '2021/03/01 12:00:00',
		end: null,
	},
	TV: {
		start: '2021/03/30 00:00:00',
		end: null,
	},
	PROMO: {
		start: '2021/11/11 00:00:00',
		end: null,
	},
	IM: {
		start: null,
		end: '2023/12/31 22:59:59',
	},
}

const { MYR, INR, IDR, BDT, THB } = CurrenciesEnum

const menuActionType =
	Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
		? MenuActionTypeEnum.Link
		: MenuActionTypeEnum.Null

export const MENU_DATA = ({
	currencyId,
	langId,
}: {
	currencyId: number
	langId: string
}): IMenuData => {
	return {
		[MenuKeyEnum.Reward]: {
			display: 'h5',
			h5: {
				className: 'reward',
				img: '/h5/img/88rewards.png',
				menuActionType: MenuActionTypeEnum.WindowOpen,
			},
			desktop: { menuActionType: MenuActionTypeEnum.WindowOpen },
			pathname: `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`,
			allowCurrencies: true,
			subMenuAllowCurrenciesWithAuth: false,
		},
		[MenuKeyEnum.Home]: {
			display: 'desktop',
			h5: { menuActionType: MenuActionTypeEnum.Link },
			desktop: {
				className: 'icon icon-home',
				subMenuClassName: 'homeList',
				menuActionType: MenuActionTypeEnum.Link,
			},
			pathname: paths.home.root,
			allowCurrencies: true,
			subMenuAllowCurrenciesWithAuth: false,
			subMenu: [
				{
					h5: { menuActionType: MenuActionTypeEnum.Link },
					desktop: {
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
					},
					displayText: 'VIP',
					pathname: paths.vip.root,
					allowCurrencies: ALLOWED_CURRENCIES['VIP'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['VIP'],
						},
					],
				},
				{
					h5: { menuActionType: MenuActionTypeEnum.Link },
					desktop: {
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
					},
					displayKey: 'Label_General_LeaderBoard',
					pathname: paths.leaderBoard.root,
					allowCurrencies: ALLOWED_CURRENCIES['LEADER_BOARD'],
				},
				{
					h5: { menuActionType: MenuActionTypeEnum.EnterPage },
					desktop: {
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
					},
					displayKey: 'Label_General_Referral',
					needLogin: true,
					pathname: paths.referral.root,
				},
			],
		},
		[MenuKeyEnum.AppDownload]: {
			display: 'desktop',
			h5: { menuActionType: MenuActionTypeEnum.Link },
			desktop: {
				className: 'icon icon-mobile',
				subMenuClassName: 'appList',
				menuActionType: MenuActionTypeEnum.Link,
			},
			pathname: paths.appDownload.root,
			allowCurrencies: true,
			subMenuAllowCurrenciesWithAuth: false,
		},
		[MenuKeyEnum.CryptoSports]: {
			display: 'all',
			h5: {
				className: 'crypto',
				img: '/h5/img/cryptosports.png',
				menuActionType: MenuActionTypeEnum.EnterPage,
			},
			desktop: {
				className: 'cryptobtn',
				menuType: 'banner',
				subMenuClassName: 'cryptoList',
				menuActionType: MenuActionTypeEnum.EnterPage,
			},
			product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
			allowCurrencies: true,
			subMenuAllowCurrenciesWithAuth: false,
		},
		[MenuKeyEnum.Sports]: {
			display: 'all',
			h5: {
				icon: 'icon icon-soccer',
				menuActionType,
			},
			desktop: {
				className: 'sportsbtn',
				subMenuClassName: 'sportsList',
				menuActionType,
			},
			displayKey: 'Label_General_Sports',
			pathname: paths.sports.root,
			allowCurrencies: true,
			product: PRODUCTS['SPORTS'],
			query: { provider: 'saba', type: 'soccer' },
			subMenu: [
				{
					h5: {
						img: '/h5/img/cryptosportsNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'cryptosportNPC.png',
							},
						],
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_CRYPTO_SPORTS',
					displayKey: 'Label_General_CryptoSports',
					product: PRODUCTS['SPORTS_CRYPTO_SPORTS'],
				},
				{
					h5: {
						img: '/h5/img/soccer.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SPORTS_SOCCER',
					displayKey: 'Label_General_Soccer',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'soccer' },
					product: PRODUCTS['SPORTS_SOCCER'],
				},
				{
					h5: {
						img: '/h5/img/saba_soccer.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
						menuActionType: MenuActionTypeEnum.Link,
					},

					productKey: 'SPORTS_SABA_SOCCER',
					displayKey: 'Label_General_SabaSoccer',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'saba-soccer' },
					product: PRODUCTS['SPORTS_SABA_SOCCER'],
				},
				{
					h5: {
						img: '/h5/img/basketball.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
					productKey: 'SPORTS_BASKETBALL',
					displayKey: 'Label_General_Basketball',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'basketball' },
					product: PRODUCTS['SPORTS_BASKETBALL'],
				},
				{
					h5: {
						img: '/h5/img/cricket.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SPORTS_CRICKET',
					displayKey: 'Label_General_Cricket',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'cricket' },
					product: PRODUCTS['SPORTS_CRICKET'],
					allowCurrencies: ALLOWED_CURRENCIES['SPORTS_CRICKET'],
				},
				{
					h5: {
						img: '/h5/img/badminton.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SPORTS_BADMINTON',
					displayKey: 'Label_General_Badminton',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'badminton' },
					product: PRODUCTS['SPORTS_BADMINTON'],
				},
				{
					h5: {
						img: '/h5/img/volleyball.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
						hasDesktopLink: true,
					},
					desktop: {
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
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SPORTS_VOLLEYBALL',
					displayKey: 'Label_General_Volleyball',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'volleyball' },
					product: PRODUCTS['SPORTS_VOLLEYBALL'],
					allowCurrencies: ALLOWED_CURRENCIES['SPORTS_VOLLEYBALL'],
				},
				{
					h5: {
						img: '/h5/img/betradarsoccer.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'betradarsoccerNPC.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'soccerBG.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'VIRTUAL_SPORTS',
					displayKey: 'Label_General_VirtualSports',
					pathname: paths.sports.root,
					query: { provider: 'saba', type: 'virtual-sports' },
					product: PRODUCTS['VIRTUAL_SPORTS'],
				},
			],
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

			subMenuAllowCurrenciesWithAuth: false,
		},
		[MenuKeyEnum.Exchange]: {
			display: 'all',
			h5: {
				icon: 'icon icon-sports',
				menuActionType: MenuActionTypeEnum.Null,
			},
			desktop: {
				className: 'exchange',
				subMenuClassName: 'exchangeList',
				menuActionType: MenuActionTypeEnum.Null,
			},
			displayKey: 'Label_General_Exchange',
			allowCurrencies: ALLOWED_CURRENCIES['EXCHANGE'],
			subMenuAllowCurrenciesWithAuth: false,
			subMenu: [
				{
					h5: {
						img: '/h5/img/9w.png',
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					desktop: {
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
					},
					productKey: 'SPORTS_9W_SPORTS',
					displayText: 'Nova88 Exchange',
					product: PRODUCTS['SPORTS_9W_SPORTS'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['SPORTS_9W'],
						},
					],
					needLogin: true,
				},
			],
		},
		[MenuKeyEnum.ESports]: {
			display: 'all',
			h5: {
				icon: 'icon icon-sports',
				menuActionType,
			},
			desktop: {
				className: 'eSportsbtn',
				subMenuClassName: 'eSportsList',
				menuActionType,
			},
			displayKey: 'Label_General_ESports',
			pathname: paths.eSport.root,
			allowCurrencies: true,
			subMenuAllowCurrenciesWithAuth: false,
			subMenu: [
				// {
				// 	h5: { img: '/h5/img/esportALL.png' },
				// 	desktop: {
				// 		headerMenuImgList: [
				// 			{
				// 				className: 'List-npc',
				// 				imgUrl: 'esportALL.png',
				// 			},
				// 			{
				// 				className: 'List-bg',
				// 				imgUrl: 'eSportsListHover.png',
				// 			},
				// 		],
				// 		lobbyPage: {
				// 			bgImg: 'esposts-all.png',
				// 			hoverBgImg: 'esposts-alla.png',
				// 		},
				// 	},
				// 	productKey: 'SPORTS_E_SPORT_ALL',
				// 	displayKey: 'Label_General_All',
				// 	menuActionType: MenuActionTypeEnum.EnterPage,
				// 	product: PRODUCTS['SPORTS_E_SPORT_ALL'],
				// },
				// {
				// 	h5: { img: '/h5/img/esportDOTA2.png' },
				// 	desktop: {
				// 		headerMenuImgList: [
				// 			{
				// 				className: 'List-npc',
				// 				imgUrl: 'esportDOTA2.png',
				// 			},
				// 			{
				// 				className: 'List-bg',
				// 				imgUrl: 'eSportsListHover.png',
				// 			},
				// 		],
				// 		lobbyPage: {
				// 			bgImg: 'esposts-dota.png',
				// 			hoverBgImg: 'esposts-dotaa.png',
				// 		},
				// 	},
				// 	productKey: 'SPORTS_E_SPORT_DOTA2',
				// 	displayKey: 'Label_Product_Dota2',
				// 	menuActionType: MenuActionTypeEnum.EnterPage,
				// 	product: PRODUCTS['SPORTS_E_SPORT_DOTA2'],
				// },
				// {
				// 	h5: { img: '/h5/img/esportLOL.png' },
				// 	desktop: {
				// 		headerMenuImgList: [
				// 			{
				// 				className: 'List-npc',
				// 				imgUrl: 'esportLOL.png',
				// 			},
				// 			{
				// 				className: 'List-bg',
				// 				imgUrl: 'eSportsListHover.png',
				// 			},
				// 		],
				// 		lobbyPage: {
				// 			bgImg: 'esposts-lol.png',
				// 			hoverBgImg: 'esposts-lola.png',
				// 		},
				// 	},
				// 	productKey: 'SPORTS_E_SPORT_LOL',
				// 	displayKey: 'Label_Product_LOL',
				// 	menuActionType: MenuActionTypeEnum.EnterPage,
				// 	product: PRODUCTS['SPORTS_E_SPORT_LOL'],
				// },
				// {
				// 	h5: { img: '/h5/img/esportCS.png' },
				// 	desktop: {
				// 		headerMenuImgList: [
				// 			{
				// 				className: 'List-npc',
				// 				imgUrl: 'esportCS.png',
				// 			},
				// 			{
				// 				className: 'List-bg',
				// 				imgUrl: 'eSportsListHover.png',
				// 			},
				// 		],
				// 		lobbyPage: {
				// 			bgImg: 'esposts-cs.png',
				// 			hoverBgImg: 'esposts-csa.png',
				// 		},
				// 	},
				// 	productKey: 'SPORTS_E_SPORT_CSGO',
				// 	displayKey: 'Label_Product_CSGO',
				// 	menuActionType: MenuActionTypeEnum.EnterPage,
				// 	product: PRODUCTS['SPORTS_E_SPORT_CSGO'],
				// },
				// {
				// 	h5: { img: '/h5/img/esportKOG.png' },
				// 	desktop: {
				// 		headerMenuImgList: [
				// 			{
				// 				className: 'List-npc',
				// 				imgUrl: 'esportKOG.png',
				// 			},
				// 			{
				// 				className: 'List-bg',
				// 				imgUrl: 'eSportsListHover.png',
				// 			},
				// 		],
				// 		lobbyPage: {
				// 			bgImg: 'esposts-kog.png',
				// 			hoverBgImg: 'esposts-koga.png',
				// 		},
				// 	},
				// 	productKey: 'SPORTS_E_SPORT_KOG',
				// 	displayKey: 'Label_Product_Kog',
				// 	menuActionType: MenuActionTypeEnum.EnterPage,
				// 	product: PRODUCTS['SPORTS_E_SPORT_KOG'],
				// },
				{
					h5: {
						img: '/h5/img/esportSABA.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'esportSABA.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'eSportsListHover.png',
							},
						],
						lobbyPage: {
							bgImg: 'esposts-saba.png',
							hoverBgImg: 'esposts-sabaa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_E_SABA',
					displayKey: 'Saba',
					product: PRODUCTS['SPORTS_E_SABA'],
				},
				{
					h5: {
						img: '/h5/img/esportInplayMatrix.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'esportInplayMatrix.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'eSportsListHover.png',
							},
						],
						lobbyPage: {
							bgImg: 'esposts-inplaymatrix.png',
							hoverBgImg: 'esposts-inplaymatrixa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_E_IMESPORTS',
					displayKey: 'IM E-Sports',
					product: PRODUCTS['SPORTS_E_IMESPORTS'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['IM'],
						},
					],
				},
			],
		},
		[MenuKeyEnum.LiveCasino]: {
			display: 'all',
			h5: {
				icon: 'icon icon-livecasino',
				menuActionType,
			},
			desktop: {
				className: 'livecasinobtn icon icon-newicon',
				subMenuClassName: 'livecasinoList',
				menuActionType,
			},
			displayKey: 'Label_General_LiveCasino',
			pathname: paths.liveCasino.root,
			allowCurrencies: true,
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
					h5: {
						img: '/h5/img/pp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_pp.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_PP',
					displayText: 'Pragmatic Play',
					product: PRODUCTS['LIVE_CASINO_PP'],
				},
				{
					h5: {
						img: '/h5/img/bg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_bg.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_BG',
					displayText: 'Big Gaming',
					product: PRODUCTS['LIVE_CASINO_BG'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['LIVE_CASINO_BG'],
						},
					],
				},
				{
					h5: {
						img: '/h5/img/yb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_yb.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_YEE_BET',
					displayText: 'YeeBet',
					product: PRODUCTS['LIVE_CASINO_YEE_BET'],
				},
				{
					h5: {
						img: '/h5/img/sk.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_sk.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_SKY_WIND',
					displayText: 'Skywind',
					product: PRODUCTS['LIVE_CASINO_SKY_WIND'],
				},
				{
					h5: {
						img: '/h5/img/mgp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_mg.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_MG',
					displayText: 'Microgaming',
					product: PRODUCTS['LIVE_CASINO_MG'],
				},
				{
					h5: {
						img: '/h5/img/ev.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_ev.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_EVO',
					displayText: 'Evolution Gaming',
					product: PRODUCTS['LIVE_CASINO_EVO'],
				},
				{
					h5: {
						img: '/h5/img/ptc.png',
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_pt.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					productKey: 'LIVE_CASINO_PT',
					displayText: 'Playtech',
					product: PRODUCTS['LIVE_CASINO_PT'],
				},
				{
					h5: {
						img: '/h5/img/n2.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_n2.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_N2',
					displayText: 'n2-LIVE',
					product: PRODUCTS['LIVE_CASINO_N2'],
				},
				{
					h5: {
						img: '/h5/img/wm.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_wm.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_WM',
					displayText: 'WM Casino',
					product: PRODUCTS['LIVE_CASINO_WM'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_WM'],
				},
				{
					h5: {
						img: '/h5/img/ab.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_ab.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_ALL_BET',
					displayText: 'Allbet',
					product: PRODUCTS['LIVE_CASINO_ALL_BET'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_ALL_BET'],
				},
				{
					h5: {
						img: '/h5/img/eb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_eb.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_E_BET',
					displayText: 'eBET',
					product: PRODUCTS['LIVE_CASINO_E_BET'],
				},
				{
					h5: {
						img: '/h5/img/sa.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_sa.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_SA',
					displayText: 'SA Gaming',
					product: PRODUCTS['LIVE_CASINO_SA'],
				},
				{
					h5: {
						img: '/h5/img/dg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_dg.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_DG',
					displayText: 'Dream Gaming',
					product: PRODUCTS['LIVE_CASINO_DG'],
				},
				{
					h5: {
						img: '/h5/img/ae.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_ae.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_AE',
					displayText: 'AE Sexy',
					product: PRODUCTS['LIVE_CASINO_AE'],
				},
				{
					h5: {
						img: '/h5/img/ag.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							npcImg: 'casino_ag.png',
							hoverBgImg: 'animation_img.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_AG',
					displayText: 'Asia Gaming',
					product: PRODUCTS['LIVE_CASINO_AG'],
				},
			],
		},
		[MenuKeyEnum.Slots]: {
			display: 'all',
			h5: {
				icon: 'icon icon-icon_777',
				menuActionType,
			},
			desktop: {
				className: 'slotbtn',
				subMenuClassName: 'livecasinoList',
				menuActionType,
			},
			displayKey: 'Label_General_Slots',
			pathname: paths.slots.root,
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
					h5: {
						img: '/h5/img/spp.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PP',
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
					},
					productKey: 'SLOTS_PP',
					pathname: paths.slots.root,
					displayText: 'Pragmatic Play',
					query: {
						tpId: PRODUCTS['SLOTS_PP'].TP_ID,
					},
					product: PRODUCTS['SLOTS_PP'],
				},
				{
					h5: {
						img: '/h5/img/sg.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_SG',
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
					},
					productKey: 'SLOTS_SG',
					pathname: paths.slots.root,
					displayText: 'Spadegaming',
					query: {
						tpId: PRODUCTS['SLOTS_SG'].TP_ID,
					},
					product: PRODUCTS['SLOTS_SG'],
				},
				{
					h5: {
						img: '/h5/img/apnew.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_AdvantPlay',
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
					},
					productKey: 'SLOTS_ADVANT_PLAY',
					pathname: paths.slots.root,
					displayText: 'AdvantPlay',

					query: {
						tpId: PRODUCTS['SLOTS_ADVANT_PLAY'].TP_ID,
					},
					product: PRODUCTS['SLOTS_ADVANT_PLAY'],
				},
				{
					h5: {
						img: '/h5/img/pg.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PG',
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
					},
					productKey: 'SLOTS_PG',
					pathname: paths.slots.root,
					displayText: 'PG Soft',

					query: {
						tpId: PRODUCTS['SLOTS_PG'].TP_ID,
					},
					product: PRODUCTS['SLOTS_PG'],
				},
				{
					h5: {
						img: '/h5/img/mg.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_MGPSW',
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
					},
					productKey: 'SLOTS_MGPSW',
					pathname: paths.slots.root,
					displayText: 'Microgaming',
					query: {
						tpId: PRODUCTS['SLOTS_MGPSW'].TP_ID,
					},
					product: PRODUCTS['SLOTS_MGPSW'],
				},
				{
					h5: {
						img: '/h5/img/ji.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_JI',
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
					},
					productKey: 'SLOTS_JILI',
					pathname: paths.slots.root,
					displayText: 'Jili',
					query: {
						tpId: PRODUCTS['SLOTS_JILI'].TP_ID,
					},
					product: PRODUCTS['SLOTS_JILI'],
				},
				{
					h5: {
						img: '/h5/img/joker.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_JOKER',
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
					},
					productKey: 'SLOTS_JOKER',
					pathname: paths.slots.root,
					displayText: 'Joker',
					query: {
						tpId: PRODUCTS['SLOTS_JOKER'].TP_ID,
					},
					product: PRODUCTS['SLOTS_JOKER'],
				},
				{
					h5: {
						img: '/h5/img/rt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_RedTiger',
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
					},
					productKey: 'SLOTS_RED_TIGER',
					pathname: paths.slots.root,
					displayText: 'Red Tiger',
					query: {
						tpId: PRODUCTS['SLOTS_RED_TIGER'].TP_ID,
					},
					product: PRODUCTS['SLOTS_RED_TIGER'],
				},
				{
					h5: {
						img: '/h5/img/nt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_NetEnt',
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
					},
					productKey: 'SLOTS_NET_ENT',
					pathname: paths.slots.root,
					displayText: 'NetEnt',
					query: {
						tpId: PRODUCTS['SLOTS_NET_ENT'].TP_ID,
					},
					product: PRODUCTS['SLOTS_NET_ENT'],
				},
				{
					h5: {
						img: '/h5/img/cq9.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_CQ9',
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
					},
					productKey: 'SLOTS_CQ9',
					pathname: paths.slots.root,
					displayText: 'CQ9',
					query: {
						tpId: PRODUCTS['SLOTS_CQ9'].TP_ID,
					},
					product: PRODUCTS['SLOTS_CQ9'],
				},
				{
					h5: {
						img: '/h5/img/gpi.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_GPI',
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
					},
					productKey: 'SLOTS_GPI',
					pathname: paths.slots.root,
					displayText: 'Game Play',
					query: {
						tpId: PRODUCTS['SLOTS_GPI'].TP_ID,
					},
					product: PRODUCTS['SLOTS_GPI'],
				},
				{
					h5: {
						img: '/h5/img/ygg.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_YGG',
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
					},
					productKey: 'SLOTS_YGG',
					pathname: paths.slots.root,
					displayText: 'YGGDrassil',
					query: {
						tpId: PRODUCTS['SLOTS_YGG'].TP_ID,
					},
					product: PRODUCTS['SLOTS_YGG'],
				},
				{
					h5: {
						img: '/h5/img/am.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_AMB',
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
					},
					productKey: 'SLOTS_AMB',
					pathname: paths.slots.root,
					displayText: 'AMBSlot',
					query: {
						tpId: PRODUCTS['SLOTS_AMB'].TP_ID,
					},
					product: PRODUCTS['SLOTS_AMB'],
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_AMB'],
				},
				{
					h5: {
						img: '/h5/img/ho.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_Habanero',
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
					},
					productKey: 'SLOTS_HABANERO',
					pathname: paths.slots.root,
					displayText: 'Habanero',
					query: {
						tpId: PRODUCTS['SLOTS_HABANERO'].TP_ID,
					},
					product: PRODUCTS['SLOTS_HABANERO'],
				},
				{
					h5: {
						img: '/h5/img/simpleplay.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_SimplePlay',
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
					},
					productKey: 'SLOTS_SIMPLE_PLAY',
					pathname: paths.slots.root,
					displayText: 'SimplePlay',
					query: {
						tpId: PRODUCTS['SLOTS_SIMPLE_PLAY'].TP_ID,
					},
					product: PRODUCTS['SLOTS_SIMPLE_PLAY'],
				},
				{
					h5: {
						img: '/h5/img/slotsk.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_Skywind',
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
					},
					productKey: 'SLOTS_SKY_WIND',
					pathname: paths.slots.root,
					displayText: 'Skywind',
					query: {
						tpId: PRODUCTS['SLOTS_SKY_WIND'].TP_ID,
					},
					product: PRODUCTS['SLOTS_SKY_WIND'],
				},
				{
					h5: {
						img: '/h5/img/pt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PT',
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
					},
					productKey: 'SLOTS_PT',
					pathname: paths.slots.root,
					displayText: 'Playtech',
					query: {
						tpId: PRODUCTS['SLOTS_PT'].TP_ID,
					},
					product: PRODUCTS['SLOTS_PT'],
				},
			],
			allowCurrencies: true,
		},
		[MenuKeyEnum.Games]: {
			display: 'all',
			h5: {
				icon: 'icon icon-play',
				menuActionType,
			},
			desktop: { subMenuClassName: 'livecasinoList', menuActionType },
			displayKey: 'Label_General_Games',
			pathname: paths.game.root,
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
			subMenuAllowCurrenciesWithAuth: false,
			subMenu: [
				{
					h5: {
						img: '/h5/img/mp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'gamemp.png',
							hoverBgImg: 'gamempa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAMES_POKER_M_POKER',
					displayText: 'MPoker',
					product: PRODUCTS['GAMES_POKER_M_POKER'],
					allowCurrencies: ALLOWED_CURRENCIES['GAMES_POKER_M_POKER'],
				},
				{
					h5: {
						img: '/h5/img/amb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'gameamb.png',
							hoverBgImg: 'gameamba.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAMES_POKER_AMB_POKER',
					displayText: 'AMB Poker',
					product: PRODUCTS['GAMES_POKER_AMB_POKER'],
					allowCurrencies: ALLOWED_CURRENCIES['GAMES_POKER_AMB_POKER'],
				},
				{
					h5: {
						img: '/h5/img/vg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'gamevg.png',
							hoverBgImg: 'gamevga.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_SABA_CLUB',
					displayText: 'Vgaming',
					product: PRODUCTS['SPORTS_SABA_CLUB'],
					allowCurrencies: ALLOWED_CURRENCIES['SPORTS_SABA_CLUB'],
				},
				{
					h5: {
						img: '/h5/img/km.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'gamekim.png',
							hoverBgImg: 'gamekima.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAMES_POKER_KINGMAKER',
					displayText: 'King Maker',
					product: PRODUCTS['GAMES_POKER_KINGMAKER'],
				},
				{
					h5: {
						img: '/h5/img/gameSpribeAviator.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeAviator.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamespribe-aciator.png',
							hoverBgImg: 'gamespribe-aciatora.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_AVIATOR',
					displayText: 'Aviator',
					product: PRODUCTS['GAME_AVIATOR'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['IM'],
						},
					],
				},
				{
					h5: {
						img: '/h5/img/gameSpribeMines.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeMines.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamespribe-mines.png',
							hoverBgImg: 'gamespribe-minesa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_MINES',
					displayText: 'Mines',
					product: PRODUCTS['GAME_MINES'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['IM'],
						},
					],
				},
				{
					h5: {
						img: '/h5/img/gameSpribeGoal.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeGoal.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamespribe-goal.png',
							hoverBgImg: 'gamespribe-goala.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_GOAL',
					displayText: 'Goal',
					product: PRODUCTS['GAME_GOAL'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['IM'],
						},
					],
				},
				{
					h5: {
						img: '/h5/img/gameSpribeDice.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeDice.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamespribe-dice.png',
							hoverBgImg: 'gamespribe-dicea.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_DICE',
					displayText: 'DICE',
					product: PRODUCTS['GAME_DICE'],
					eventIcons: [
						{
							icon: 'icon icon-new',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['IM'],
						},
					],
				},
				{
					h5: {
						img: '/h5/img/ap.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'ap.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameap.png',
							hoverBgImg: 'gameapa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_CRASH',
					displayText: 'Crash',
					product: PRODUCTS['GAME_CRASH'],
				},
				{
					h5: {
						img: '/h5/img/gameSpribeGoal.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'jili.png',
							},
							{
								className: 'List-bg',
								imgUrl: 'tablelisthover.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamejili.png',
							hoverBgImg: 'gamejilia.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_GORUSH',
					displayText: 'Go Rush',
					product: PRODUCTS['GAME_GORUSH'],
				},
			],
			allowCurrencies: true,
		},
		[MenuKeyEnum.Fishing]: {
			display: 'all',
			h5: {
				icon: 'icon icon-game',
				menuActionType,
			},
			desktop: {
				className: 'fishbtn',
				subMenuClassName: 'fishList',
				menuActionType,
			},
			displayKey: 'Label_General_Fishing',
			pathname: paths.fishing.root,
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
					h5: {
						img: '/h5/img/hb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishhb.png',
							hoverBgImg: 'fishhba.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HAIBA',
					displayKey: 'Label_Product_Haiba',
					product: PRODUCTS['FISHING_HAIBA'],
				},
				{
					h5: {
						img: '/h5/img/hf5.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishhf.png',
							hoverBgImg: 'fishhfa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HUNTING_HAPPY_FISH_5',
					displayKey: 'Label_Fishing_Hunting_Happy_Fish_5',
					product: PRODUCTS['FISHING_HUNTING_HAPPY_FISH_5'],
				},
				{
					h5: {
						img: '/h5/img/ma.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishma.png',
							hoverBgImg: 'fishmaa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HUNTING_MONSTER_AWAKEN',
					displayKey: 'Label_Fishing_Hunting_Monster_Awaken',
					product: PRODUCTS['FISHING_HUNTING_MONSTER_AWAKEN'],
				},
				{
					h5: {
						img: '/h5/img/pd.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishpd.png',
							hoverBgImg: 'fishpda.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_CQ9_PARADISE',
					displayKey: 'Label_Paradise',
					product: PRODUCTS['FISHING_CQ9_PARADISE'],
				},
				{
					h5: {
						img: '/h5/img/ffw.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishgg.png',
							hoverBgImg: 'fishgga.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING',
					displayKey: 'Label_FishingGG',
					product: PRODUCTS['FISHING'],
				},
				{
					h5: {
						img: '/h5/img/fw.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishfw.png',
							hoverBgImg: 'fishfwa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_SGW',
					displayKey: 'Label_Fishing_FishingWar',
					product: PRODUCTS['FISHING_SGW'],
				},
				{
					h5: {
						img: '/h5/img/fg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishfg.png',
							hoverBgImg: 'fishfga.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_SG',
					displayKey: 'Label_Fishing_FishingGod',
					product: PRODUCTS['FISHING_SG'],
					allowCurrencies: ALLOWED_CURRENCIES['FISHING_SG'],
				},
				{
					h5: {
						img: '/h5/img/of.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'fishof.png',
							hoverBgImg: 'fishofa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_CQ9_ONE_SHOT_FISHING',
					displayKey: 'Label_Oneshot_Fishing',
					product: PRODUCTS['FISHING_CQ9_ONE_SHOT_FISHING'],
					allowCurrencies: ALLOWED_CURRENCIES['FISHING_CQ9_ONE_SHOT_FISHING'],
				},
			],
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: true,
		},
		[MenuKeyEnum.Lottery]: {
			display: 'all',
			h5: {
				icon: 'icon icon-kelo',
				menuActionType,
			},
			desktop: { subMenuClassName: 'gameList', menuActionType },
			displayKey: 'Label_General_Lottery',
			pathname: paths.lottery.root,
			subMenu: [
				{
					h5: {
						img: '/h5/img/gpikeno.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterygpikeno.png',
							hoverBgImg: 'lotterygpikenoa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_GPI_KENO',
					displayKey: 'Label_Product_GPI_Keno',
					product: PRODUCTS['LOTTERY_GPI_KENO'],
				},
				{
					h5: {
						img: '/h5/img/gpithai.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterygpithai.png',
							hoverBgImg: 'lotterygpithaia.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_GPI_THAILOTTERY',
					displayKey: 'Label_Product_GPI_ThaiLottery',
					product: PRODUCTS['LOTTERY_GPI_THAILOTTERY'],
					allowCurrencies: ALLOWED_CURRENCIES['LOTTERY_GPI_THAILOTTERY'],
				},
				{
					h5: {
						img: '/h5/img/gpifast3.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterygpifast3.png',
							hoverBgImg: 'lotterygpifast3a.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_GPI_FAST3',
					displayKey: 'Label_Product_GPI_Fast3',
					product: PRODUCTS['LOTTERY_GPI_FAST3'],
				},
				{
					h5: {
						img: '/h5/img/tcg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterytc.png',
							hoverBgImg: 'lotterytca.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_TCG',
					displayKey: 'Label_Product_TcGame',
					product: PRODUCTS['LOTTERY_TCG'],
				},
				{
					h5: {
						img: '/h5/img/keno.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotteryke.png',
							hoverBgImg: 'lotterykea.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_KENO',
					displayKey: 'Label_Product_Keno',
					product: PRODUCTS['LOTTERY_KENO'],
				},
				{
					h5: {
						img: '/h5/img/lottery.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterylo.png',
							hoverBgImg: 'lotteryloa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY',
					displayKey: 'Label_General_Lottery',
					product: PRODUCTS['LOTTERY'],
				},
				{
					h5: {
						img: '/h5/img/numbergame.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotterynu.png',
							hoverBgImg: 'lotterynua.png',
						},
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'LOTTERY_NUMBER_GAME',
					displayKey: 'Label_Product_NumberGame',
					product: PRODUCTS['LOTTERY_NUMBER_GAME'],
					query: { provider: 'saba', type: 'number-game' },
				},
				{
					h5: {
						img: '/h5/img/tablegame.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
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
						lobbyPage: {
							bgImg: 'lotteryta.png',
							hoverBgImg: 'lotterytaa.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_TABLE_GAME',
					displayKey: 'Label_Product_TableGame',
					product: PRODUCTS['LOTTERY_TABLE_GAME'],
					query: { provider: 'saba', type: 'number-game' },
				},
			],
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: true,
		},
		[MenuKeyEnum.Promotion]: {
			display: 'desktop',
			h5: { menuActionType: MenuActionTypeEnum.Link },
			desktop: {
				subMenuClassName: 'promoList',
				menuType: 'banner',
				eventIcons: [
					{
						icon: 'icon icon-mediafire',
						text: 'HOT',
						period: PRODUCT_EVENT_PERIOD['PROMOS'],
					},
				],
				menuActionType: MenuActionTypeEnum.Link,
			},
			displayKey: 'Label_General_Promos',
			pathname: paths.promotion.root,

			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: true,
		},
		[MenuKeyEnum.Affiliates]: {
			display: 'h5',
			h5: {
				icon: 'icon icon-affiliate',
				menuActionType: MenuActionTypeEnum.WindowOpen,
			},
			desktop: { menuActionType: MenuActionTypeEnum.WindowOpen },
			displayKey: 'Label_General_Affiliate',
			pathname: (() => {
				if (Number(currencyId) === CurrenciesEnum.MYR) {
					return `https://aff.nova88mas102.com/?lang=${langId}`
				}

				if (Number(currencyId) === CurrenciesEnum.INR) {
					return `https://aff.nova88india.com/?lang=${langId}`
				}

				return `https://aff.nova88bkk.com/?lang=${langId}`
			})(),
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: true,
		},
		[MenuKeyEnum.VIP]: {
			display: 'all',
			h5: {
				icon: 'icon icon-vip',
				menuActionType: MenuActionTypeEnum.Link,
			},
			desktop: {
				menuType: 'banner',
				subMenuClassName: 'vipList',
				menuActionType: MenuActionTypeEnum.Link,
			},
			displayText: 'VIP',
			pathname: paths.vip.root,

			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: ALLOWED_CURRENCIES['VIP'],
		},
		[MenuKeyEnum.LeaderBoard]: {
			display: 'all',
			h5: {
				icon: 'icon icon-ranking',
				menuActionType: MenuActionTypeEnum.Link,
			},
			desktop: {
				menuType: 'banner',
				subMenuClassName: 'rankingList',
				menuActionType: MenuActionTypeEnum.Link,
			},
			displayKey: 'Label_LeaderBoard',
			pathname: paths.leaderBoard.root,
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: ALLOWED_CURRENCIES['LEADER_BOARD'],
		},
	}
}
