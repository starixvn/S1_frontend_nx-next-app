import {
	CurrenciesEnum,
	DeviceTypeEnum,
	IEventPeriod,
	IMenuData,
	MenuActionTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
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
	SPORTS_E_SPORTS_TFG: {
		start: null,
		end: '2023/12/31 23:59:59',
	},
	SLOTS_FA_CHAI: {
		start: null,
		end: '2023/12/31 23:59:59',
	},
	GAMES_V8_POKER: {
		start: null,
		end: '2023/12/31 23:59:59',
	},
	SLOTS_NO_LIMIT_CITY: {
		start: null,
		end: '2024/01/11 23:59:59',
	},
	SLOTS_BNG: {
		start: null,
		end: '2024/01/11 23:59:59',
	},
	FOUR_D_GRAND_DRAGON: {
		start: null,
		end: '2023/12/31 23:59:59',
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
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					displayText: 'VIP',
					pathname: paths.vip.root,
					allowCurrencies: ALLOWED_CURRENCIES['VIP'],
				},
				{
					h5: { menuActionType: MenuActionTypeEnum.Link },
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'home-ranking.png',
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
						],
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					displayKey: 'Label_General_Referral',
					needLogin: true,
					pathname: paths.referral.root,
				},
			],
		},
		[MenuKeyEnum.Reward]: {
			display: 'all',
			h5: {
				className: 'reward',
				img: '/h5/img/88rewards.png',
				menuActionType: MenuActionTypeEnum.WindowOpen,
				allowCurrencies: false, // * 手機版不顯示
			},
			desktop: {
				className: 'reward',
				menuActionType: MenuActionTypeEnum.WindowOpen,
				allowCurrencies: true,
			},
			pathname: `/rewards`,
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: ALLOWED_CURRENCIES['REWARDS'],
		},
		[MenuKeyEnum.Sports]: {
			display: 'all',
			h5: {
				icon: 'icon icon-soccer',
				className: 'btn-sports',
				img: '4.0/sports-icon.png',
				menuActionType,
				subMenuClassName: 'sports',
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
						img: '4.0/dropdown/sports/cryptosportNPC.png',
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
						img: '4.0/dropdown/sports/soccerNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'soccerNPC.png',
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
						img: '4.0/dropdown/sports/sabasoccerNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'sabssoccerNPC.png',
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
						img: '4.0/dropdown/sports/basketballNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'basketballNPC.png',
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
						img: '4.0/dropdown/sports/cricketNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'cricketNPC.png',
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
						img: '4.0/dropdown/sports/badmintonNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'badmintonNPC.png',
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
						img: '4.0/dropdown/sports/volleyballNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'volleyballNPC.png',
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
						img: '4.0/dropdown/sports/betradarsoccerNPC.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'betradarsoccerNPC.png',
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
					'SPORTS_CRICKET',
					'SPORTS_SOCCER',
					'SPORTS_SABA_SOCCER',
					'SPORTS_BASKETBALL',
					'SPORTS_BADMINTON',
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
				icon: '',
				className: 'btn-exchange',
				img: '4.0/exchange-icon.png',
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
						img: '4.0/dropdown/exchange/9wnpc.png',
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: '9wnpc.png',
							},
						],
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					productKey: 'SPORTS_9W_SPORTS',
					displayText: 'Nova88 Exchange',
					product: PRODUCTS['SPORTS_9W_SPORTS'],
					eventIcons: [
						{
							icon: 'new-icon',
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
				icon: '',
				className: 'btn-esports',
				img: '4.0/esports-icon.png',
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
						img: '4.0/dropdown/esports/esportSABA.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'esportSABA.png',
							},
						],
						lobbyPage: {
							bgImg: 'esportlobby-saba.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_E_SABA',
					displayKey: 'Saba',
					product: PRODUCTS['SPORTS_E_SABA'],
				},
				{
					h5: {
						img: '4.0/dropdown/esports/esportInplayMatrix.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'esportInplayMatrix.png',
							},
						],
						lobbyPage: {
							bgImg: 'esportlobby-tfg.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_E_IMESPORTS',
					displayKey: 'IM E-Sports',
					product: PRODUCTS['SPORTS_E_IMESPORTS'],
				},
				{
					h5: {
						img: '4.0/dropdown/esports/esportTFG.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'esportTFG.png',
							},
						],
						lobbyPage: {
							bgImg: 'esportlobby-im.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_E_SPORTS_TFG',
					displayKey: 'TFGaming',
					product: PRODUCTS['SPORTS_E_SPORTS_TFG'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['SPORTS_E_SPORTS_TFG'],
						},
					],
				},
			],
		},
		[MenuKeyEnum.Casino]: {
			display: 'all',
			h5: {
				icon: '',
				className: 'btn-casino',
				img: '4.0/casino-icon.png',
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
			subMenuAllowCurrenciesWithAuth: false,
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
					'LIVE_CASINO_N2',
				],
				[THB]: [
					'LIVE_CASINO_PP',
					'LIVE_CASINO_BG',
					'LIVE_CASINO_YEE_BET',
					'LIVE_CASINO_MG',
					'LIVE_CASINO_EVO',
					'LIVE_CASINO_PT',
					'LIVE_CASINO_DG',
					'LIVE_CASINO_AE',
					'LIVE_CASINO_SA',
					'LIVE_CASINO_ALL_BET',
					'LIVE_CASINO_AG',
					'LIVE_CASINO_WM',
					'LIVE_CASINO_WE',
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
					'LIVE_CASINO_WE',
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
					'LIVE_CASINO_WE',
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
					'LIVE_CASINO_WE',
					'LIVE_CASINO_N2',
				],
			},
			subMenu: [
				{
					h5: {
						img: '4.0/dropdown/casino/casino-PP.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'livePP',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-PP.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-PP.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_PP',
					displayText: 'Pragmatic Play',
					product: PRODUCTS['LIVE_CASINO_PP'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_PP'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-bg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveBG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-bg.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-bg.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_BG',
					displayText: 'Big Gaming',
					product: PRODUCTS['LIVE_CASINO_BG'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['LIVE_CASINO_BG'],
						},
					],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-yb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'casino-yb',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-yb.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-yb.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_YEE_BET',
					displayText: 'YeeBet',
					product: PRODUCTS['LIVE_CASINO_YEE_BET'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-SK.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'casino_Skywind',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-SK.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-SK.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_SKY_WIND',
					displayText: 'Skywind',
					product: PRODUCTS['LIVE_CASINO_SKY_WIND'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_SKY_WIND'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-mg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'casino_MG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-mg.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-mg.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_MG',
					displayText: 'Microgaming',
					product: PRODUCTS['LIVE_CASINO_MG'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_MG'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-ev.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'casino_EVO',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-ev.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-ev.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_EVO',
					displayText: 'Evolution Gaming',
					product: PRODUCTS['LIVE_CASINO_EVO'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-pt.png',
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					desktop: {
						className: 'casino_PT',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-pt.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-pt.png',
						},
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					productKey: 'LIVE_CASINO_PT',
					displayText: 'Playtech',
					product: PRODUCTS['LIVE_CASINO_PT'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_PT'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-n2.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'casino_N2LIVE',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-n2.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-n2.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_N2',
					displayText: 'n2-LIVE',
					product: PRODUCTS['LIVE_CASINO_N2'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_N2'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-WM.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveWM',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-WM.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-WM.png',
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
						img: '4.0/dropdown/casino/casino-ALL.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveALL',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-ALL.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-ALL.png',
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
						img: '4.0/dropdown/casino/casino-EB.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveEB',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-we.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-EB.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_WE',
					displayText: 'WE',
					product: PRODUCTS['LIVE_CASINO_WE'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-SA.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveSA',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-SA.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-SA.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_SA',
					displayText: 'SA Gaming',
					product: PRODUCTS['LIVE_CASINO_SA'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_SA'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-AE.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveAE',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-AE.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-AE.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_AE',
					displayText: 'AE Sexy',
					product: PRODUCTS['LIVE_CASINO_AE'],
				},
				{
					h5: {
						img: '4.0/dropdown/casino/casino-DG.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveDG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-DG.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-DG.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_DG',
					displayText: 'Dream Gaming',
					product: PRODUCTS['LIVE_CASINO_DG'],
				},

				{
					h5: {
						img: '4.0/dropdown/casino/casino-ag.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'liveAG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'casino-ag.png',
							},
						],
						lobbyPage: {
							bgImg: 'casino-ag.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LIVE_CASINO_AG',
					displayText: 'Asia Gaming',
					product: PRODUCTS['LIVE_CASINO_AG'],
					allowCurrencies: ALLOWED_CURRENCIES['LIVE_CASINO_AG'],
				},
			],
		},
		[MenuKeyEnum.Slot]: {
			// 4.0/dropdown/slots/slotap.png
			display: 'all',
			h5: {
				icon: '',
				className: 'btn-slots',
				img: '4.0/slots-icon.png',
				menuActionType,
			},
			desktop: {
				className: 'slotbtn',
				subMenuClassName: 'livecasinoList',
				menuActionType,
			},
			displayKey: 'Label_General_Slots',
			pathname: paths.slots.root,
			subMenuAllowCurrenciesWithAuth: false,
			subMenuSort: {
				[THB]: [
					'SLOTS_PP',
					'SLOTS_SG',
					'SLOTS_ADVANT_PLAY',
					'SLOTS_ES',
					'SLOTS_NEXT_SPIN',
					'SLOTS_PG',
					'SLOTS_BNG',
					'SLOTS_FA_CHAI',
					'SLOTS_MGPSW',
					'SLOTS_JILI',
					'SLOTS_SPRIBE',
					'SLOTS_JOKER',
					'SLOTS_NO_LIMIT_CITY',
					'SLOTS_RED_TIGER',
					'SLOTS_NET_ENT',
					'SLOTS_CQ9',
					'SLOTS_PNG',
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
					'SLOTS_ES',
					'SLOTS_NEXT_SPIN',
					'SLOTS_PG',
					'SLOTS_BNG',
					'SLOTS_FA_CHAI',
					'SLOTS_MGPSW',
					'SLOTS_JILI',
					'SLOTS_SPRIBE',
					'SLOTS_JOKER',
					'SLOTS_PEGASUS',
					'SLOTS_NO_LIMIT_CITY',
					'SLOTS_RED_TIGER',
					'SLOTS_NET_ENT',
					'SLOTS_CQ9',
					'SLOTS_PNG',
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
					'SLOTS_ES',
					'SLOTS_NEXT_SPIN',
					'SLOTS_PG',
					'SLOTS_BNG',
					'SLOTS_FA_CHAI',
					'SLOTS_MGPSW',
					'SLOTS_JILI',
					'SLOTS_SPRIBE',
					'SLOTS_JOKER',
					'SLOTS_NO_LIMIT_CITY',
					'SLOTS_RED_TIGER',
					'SLOTS_SKY_WIND',
					'SLOTS_NET_ENT',
					'SLOTS_CQ9',
					'SLOTS_PNG',
					'SLOTS_GPI',
					'SLOTS_YGG',
					'SLOTS_AMB',
					'SLOTS_HABANERO',
					'SLOTS_SIMPLE_PLAY',
					'SLOTS_PT',
					'SLOTS_ICG',
					'SLOTS_OW',
				],
				[INR]: [
					'SLOTS_PP',
					'SLOTS_SG',
					'SLOTS_ADVANT_PLAY',
					'SLOTS_ES',
					'SLOTS_NEXT_SPIN',
					'SLOTS_PG',
					'SLOTS_BNG',
					'SLOTS_FA_CHAI',
					'SLOTS_MGPSW',
					'SLOTS_JILI',
					'SLOTS_SPRIBE',
					'SLOTS_JOKER',
					'SLOTS_NO_LIMIT_CITY',
					'SLOTS_RED_TIGER',
					'SLOTS_NET_ENT',
					'SLOTS_CQ9',
					'SLOTS_PNG',
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
					'SLOTS_ES',
					'SLOTS_NEXT_SPIN',
					'SLOTS_PG',
					'SLOTS_BNG',
					'SLOTS_FA_CHAI',
					'SLOTS_MGPSW',
					'SLOTS_JILI',
					'SLOTS_SPRIBE',
					'SLOTS_JOKER',
					'SLOTS_NO_LIMIT_CITY',
					'SLOTS_RED_TIGER',
					'SLOTS_NET_ENT',
					'SLOTS_CQ9',
					'SLOTS_PNG',
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
						img: '4.0/dropdown/slots/slotPP.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PP',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotPP.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_PP'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotSG.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_SG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotSG.png',
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
						img: '4.0/dropdown/slots/slotap.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_AdvantPlay',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotap.png',
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
						img: '4.0/dropdown/slots/slotamigo.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_AdvantPlay',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotamigo.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_AMIGO',
					pathname: paths.slots.root,
					displayText: 'Amigo Gaming',
					query: {
						tpId: PRODUCTS['SLOTS_AMIGO'].TP_ID,
					},
					product: PRODUCTS['SLOTS_AMIGO'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotEndorphina.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotEs.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_ES',
					pathname: paths.slots.root,
					displayText: 'ES',

					query: {
						tpId: PRODUCTS['SLOTS_ES'].TP_ID,
					},
					product: PRODUCTS['SLOTS_ES'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotNextspin.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotNextspin.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_NEXT_SPIN',
					pathname: paths.slots.root,
					displayText: 'Nextspin',
					query: {
						tpId: PRODUCTS['SLOTS_NEXT_SPIN'].TP_ID,
					},
					product: PRODUCTS['SLOTS_NEXT_SPIN'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotPG.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotPG.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_PG'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/bng.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slotbng',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotbng.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_BNG',
					pathname: paths.slots.root,
					displayText: 'BNG',
					query: {
						tpId: PRODUCTS['SLOTS_BNG'].TP_ID,
					},
					product: PRODUCTS['SLOTS_BNG'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['SLOTS_BNG'],
						},
					],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/fachai.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotfachai.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_FA_CHAI',
					pathname: paths.slots.root,
					displayText: 'Fa Chai',
					query: {
						tpId: PRODUCTS['SLOTS_FA_CHAI'].TP_ID,
					},
					product: PRODUCTS['SLOTS_FA_CHAI'],
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_FA_CHAI'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['SLOTS_FA_CHAI'],
						},
					],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotmg.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_MGPSW',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotmg.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_MGPSW'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotji.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_JI',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotji.png',
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
						img: '4.0/dropdown/slots/slotSPRIBE.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotSPRIBE.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_SPRIBE',
					pathname: paths.slots.root,
					displayText: 'SPRIBE',
					query: {
						tpId: PRODUCTS['SLOTS_SPRIBE'].TP_ID,
					},
					product: PRODUCTS['SLOTS_SPRIBE'],
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_SPRIBE'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotJOKER.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_JOKER',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotJOKER.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_JOKER'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotpegasus.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotpegasus.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_PEGASUS',
					pathname: paths.slots.root,
					displayText: 'Pegasus',
					query: {
						tpId: PRODUCTS['SLOTS_PEGASUS'].TP_ID,
					},
					product: PRODUCTS['SLOTS_PEGASUS'],
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_PEGASUS'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotnlc.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotnlc.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_NO_LIMIT_CITY',
					pathname: paths.slots.root,
					displayText: 'NoLimit City',
					query: {
						tpId: PRODUCTS['SLOTS_NO_LIMIT_CITY'].TP_ID,
					},
					product: PRODUCTS['SLOTS_NO_LIMIT_CITY'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['SLOTS_NO_LIMIT_CITY'],
						},
					],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotrt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_RedTiger',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotrt.png',
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
						img: '4.0/dropdown/slots/slotnt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_NetEnt',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotnt.png',
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
						img: '4.0/dropdown/slots/slotCQ9.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_CQ9',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotCQ9.png',
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
						img: '4.0/dropdown/slots/slotplayngo.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotplayngo.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_PNG',
					pathname: paths.slots.root,
					displayText: "Play' n GO",
					query: {
						tpId: PRODUCTS['SLOTS_PNG'].TP_ID,
					},
					product: PRODUCTS['SLOTS_PNG'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotGPI.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_GPI',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotGPI.png',
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
						img: '4.0/dropdown/slots/slotYGG.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_YGG',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotYGG.png',
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
						img: '4.0/dropdown/slots/slotam.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_AMB',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotam.png',
							},
						],
						menuActionType: MenuActionTypeEnum.Link,
					},
					productKey: 'SLOTS_AMB',
					pathname: paths.slots.root,
					displayText: 'AskmeSlot',
					query: {
						tpId: PRODUCTS['SLOTS_AMB'].TP_ID,
					},
					product: PRODUCTS['SLOTS_AMB'],
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_AMB'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotho.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_Habanero',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotho.png',
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
						img: '4.0/dropdown/slots/slotSimplePlay.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_SimplePlay',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotSimplePlay.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_SIMPLE_PLAY'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotsk.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_Skywind',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotsk.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_SKY_WIND'],
				},
				{
					h5: {
						img: '4.0/dropdown/slots/slotpt.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'slot_PT',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'slotpt.png',
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
					allowCurrencies: ALLOWED_CURRENCIES['SLOTS_PT'],
				},
			],
			allowCurrencies: true,
		},
		[MenuKeyEnum.Game]: {
			display: 'all',
			h5: {
				icon: '',
				className: 'btn-games',
				img: '4.0/games-icon.png',
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
				// 4.0/dropdown/games/vg.png
				{
					h5: {
						img: '4.0/dropdown/games/mp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'mp',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'mp.png',
							},
						],
						lobbyPage: {
							bgImg: 'gamemp.png',
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
						img: '4.0/dropdown/games/amb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'am.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameamb.png',
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
						img: '4.0/dropdown/games/vg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'vg.png',
							},
						],
						lobbyPage: {
							bgImg: 'vg.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'SPORTS_SABA_CLUB',
					displayText: 'Vgaming',
					product: PRODUCTS['SPORTS_SABA_CLUB'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/km.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'km.png',
							},
						],
						lobbyPage: {
							bgImg: 'km.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAMES_POKER_KINGMAKER',
					displayText: 'King Maker',
					product: PRODUCTS['GAMES_POKER_KINGMAKER'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/v8.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'v8.png',
							},
						],
						lobbyPage: {
							bgImg: 'v8.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAMES_V8_POKER',
					displayText: 'V8Poker',
					product: PRODUCTS['GAMES_V8_POKER'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['GAMES_V8_POKER'],
						},
					],
					allowCurrencies: ALLOWED_CURRENCIES['GAMES_V8_POKER'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/gameSpribeAviator.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeAviator.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameSpribeAviator.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_AVIATOR',
					displayText: 'Aviator',
					product: PRODUCTS['GAME_AVIATOR'],
					allowCurrencies: ALLOWED_CURRENCIES['GAME_AVIATOR'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/gameSpribeMines.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeMines.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameSpribeMines.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_MINES',
					displayText: 'Mines',
					product: PRODUCTS['GAME_MINES'],
					allowCurrencies: ALLOWED_CURRENCIES['GAME_MINES'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/gameSpribeGoal.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeGoal.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameSpribeGoal.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_GOAL',
					displayText: 'Goal',
					product: PRODUCTS['GAME_GOAL'],
					allowCurrencies: ALLOWED_CURRENCIES['GAME_GOAL'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/gameSpribeDice.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'gameSpribeDice.png',
							},
						],
						lobbyPage: {
							bgImg: 'gameSpribeDice.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_DICE',
					displayText: 'DICE',
					product: PRODUCTS['GAME_DICE'],
					allowCurrencies: ALLOWED_CURRENCIES['GAME_DICE'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/pp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'pp.png',
							},
						],
						lobbyPage: {
							bgImg: 'pp.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_SPACEMAN',
					displayText: 'Spaceman',
					product: PRODUCTS['GAME_SPACEMAN'],
					allowCurrencies: ALLOWED_CURRENCIES['GAME_SPACEMAN'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/ap.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'ap.png',
							},
						],
						lobbyPage: {
							bgImg: 'ap.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'GAME_CRASH',
					displayText: 'Crash',
					product: PRODUCTS['GAME_CRASH'],
				},
				{
					h5: {
						img: '4.0/dropdown/games/jili.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'jili.png',
							},
						],
						lobbyPage: {
							bgImg: 'jili.png',
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
				icon: '',
				className: 'btn-fishing',
				img: '4.0/fishing-icon.png',
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
					'FISHING_ZOMBIE_PARTY',
					'FISHING_ALIEN_HUNTER',
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
					'FISHING_ZOMBIE_PARTY',
					'FISHING_ALIEN_HUNTER',
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
					'FISHING_ZOMBIE_PARTY',
					'FISHING_ALIEN_HUNTER',
					'FISHING_CQ9_PARADISE',
					'FISHING',
					'FISHING_SKY_WIND_OCEAN_RULER',
					'FISHING_ICG_DRAGON_BALL',
					'FISHING_HAIBA',
					'FISHING_HUNTING_HAPPY_FISH_5',
					'FISHING_HUNTING_MONSTER_AWAKEN',
				],
				[INR]: [
					'FISHING_SG',
					'FISHING_SGW',
					'FISHING_ZOMBIE_PARTY',
					'FISHING_ALIEN_HUNTER',
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
						img: '4.0/dropdown/fishing/fishSG.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsg',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'fishSG.png',
							},
						],
						lobbyPage: {
							bgImg: 'fishSGwar.png',
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
						img: '4.0/dropdown/fishing/fishSGwar.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'fishSGwar.png',
							},
						],
						lobbyPage: {
							bgImg: 'fishSGwar.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_SGW',
					displayKey: 'Label_Fishing_FishingWar',
					product: PRODUCTS['FISHING_SGW'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/fishzp.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'fishzp.png',
							},
						],
						lobbyPage: {
							bgImg: 'fishzp.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_ZOMBIE_PARTY',
					displayKey: 'Label_Fishing_ZombieParty',
					product: PRODUCTS['FISHING_ZOMBIE_PARTY'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/fishah.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'fishah.png',
							},
						],
						lobbyPage: {
							bgImg: 'fishah.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_ALIEN_HUNTER',
					displayKey: 'Label_Fishing_AlienHunter',
					product: PRODUCTS['FISHING_ALIEN_HUNTER'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/paradise.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsgw',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'paradise.png',
							},
						],
						lobbyPage: {
							bgImg: 'paradise.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_CQ9_PARADISE',
					displayKey: 'Label_Paradise',
					product: PRODUCTS['FISHING_CQ9_PARADISE'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/hb.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'hb.png',
							},
						],
						lobbyPage: {
							bgImg: 'hb.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HAIBA',
					displayKey: 'Label_Product_Haiba',
					product: PRODUCTS['FISHING_HAIBA'],
					allowCurrencies: ALLOWED_CURRENCIES['FISHING_HAIBA'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/hf5.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'hf5.png',
							},
						],
						lobbyPage: {
							bgImg: 'hf5.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HUNTING_HAPPY_FISH_5',
					displayKey: 'Label_Fishing_Hunting_Happy_Fish_5',
					product: PRODUCTS['FISHING_HUNTING_HAPPY_FISH_5'],
					allowCurrencies: ALLOWED_CURRENCIES['FISHING_HUNTING_HAPPY_FISH_5'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/ma.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'ma.png',
							},
						],
						lobbyPage: {
							bgImg: 'ma.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'FISHING_HUNTING_MONSTER_AWAKEN',
					displayKey: 'Label_Fishing_Hunting_Monster_Awaken',
					product: PRODUCTS['FISHING_HUNTING_MONSTER_AWAKEN'],
				},
				{
					h5: {
						img: '4.0/dropdown/fishing/of.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'fsg',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'oneshotfishing.png',
							},
						],
						lobbyPage: {
							bgImg: 'fishof.png',
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
		[MenuKeyEnum.FourD]: {
			display: 'all',
			h5: {
				icon: '',
				className: 'btn-four',
				img: '4.0/four-icon.png',
				menuActionType,
			},
			desktop: {
				className: '',
				subMenuClassName: 'fourList',
				menuActionType,
			},
			displayText: '4D',
			pathname: paths.fourD.root,
			subMenu: [
				{
					h5: {
						img: '4.0/dropdown/4d/haolong.png',
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					desktop: {
						className: '',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'haolong.png',
							},
						],
						lobbyPage: {
							npcImg: 'haolong.png',
						},
						menuActionType: MenuActionTypeEnum.UseGoToGame,
					},
					productKey: 'FOUR_D_GRAND_DRAGON',
					// * Grand Dragon 目前不分語系
					displayText: 'Grand Dragon',
					product: PRODUCTS['FOUR_D_GRAND_DRAGON'],
					allowCurrencies: ALLOWED_CURRENCIES['FOUR_D_GRAND_DRAGON'],
					eventIcons: [
						{
							icon: 'new-icon',
							text: 'NEW',
							period: PRODUCT_EVENT_PERIOD['FOUR_D_GRAND_DRAGON'],
						},
					],
				},
			],
			subMenuAllowCurrenciesWithAuth: false,
			allowCurrencies: [MYR],
		},
		[MenuKeyEnum.Lottery]: {
			display: 'all',
			h5: {
				icon: '',
				className: 'btn-lottery',
				img: '4.0/lottery-icon.png',
				menuActionType,
			},
			desktop: { subMenuClassName: 'gameList', menuActionType },
			displayKey: 'Label_General_Lottery',
			pathname: paths.lottery.root,
			subMenu: [
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-gpikeno.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-gpikeno.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-gpikeno.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_GPI_KENO',
					displayKey: 'Label_Product_GPI_Keno',
					product: PRODUCTS['LOTTERY_GPI_KENO'],
				},
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-gpithai.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-gpithai.png',
							},
						],
						lobbyPage: {
							bgImg: 'lotterygpithai.png',
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
						img: '4.0/dropdown/lottery/lo-gpifast3.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-gpifast3.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-gpifast3.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_GPI_FAST3',
					displayKey: 'Label_Product_GPI_Fast3',
					product: PRODUCTS['LOTTERY_GPI_FAST3'],
					allowCurrencies: ALLOWED_CURRENCIES['LOTTERY_GPI_FAST3'],
				},
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-tcg.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'indo',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-tcg.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-tcg.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_TCG',
					displayKey: 'Label_Product_TcGame',
					product: PRODUCTS['LOTTERY_TCG'],
				},
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-keno.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'keno',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-keno.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-keno.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY_KENO',
					displayKey: 'Label_Product_Keno',
					product: PRODUCTS['LOTTERY_KENO'],
				},
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-lottery.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'lottery',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-lottery.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-lottery.png',
						},
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					productKey: 'LOTTERY',
					displayKey: 'Label_General_Lottery',
					product: PRODUCTS['LOTTERY'],
				},
				{
					h5: {
						img: '4.0/dropdown/lottery/lo-numberGame.png',
						menuActionType: MenuActionTypeEnum.Link,
					},
					desktop: {
						className: 'numberGame',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-numberGame.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-numberGame.png',
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
						img: '4.0/dropdown/lottery/lo-tableGame.png',
						menuActionType: MenuActionTypeEnum.EnterPage,
					},
					desktop: {
						className: 'numberGame',
						headerMenuImgList: [
							{
								className: 'List-npc',
								imgUrl: 'lo-tableGame.png',
							},
						],
						lobbyPage: {
							bgImg: 'lo-tableGame.png',
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
			h5: {
				className: 'btn-promotion',
				img: '4.0/promotion-icon.png',
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: false,
			},
			desktop: {
				subMenuClassName: 'promoList',
				menuType: 'banner',
				eventIcons: [
					{
						icon: 'icon mediafire',
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
				className: 'btn-affiliate',
				img: '4.0/affiliate-icon.png',
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
			allowCurrencies: false, // * 不顯示在 menu
		},
		[MenuKeyEnum.VIP]: {
			display: 'all',
			h5: {
				icon: '',
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: false,
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
				className: 'btn-ranking',
				img: '4.0/ranking-icon.png',
				menuActionType: MenuActionTypeEnum.Link,
				allowCurrencies: false,
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
