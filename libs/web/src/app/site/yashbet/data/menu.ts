import {
	MenuActionTypeEnum,
	MenuKeyEnum,
	LobbyCategoryEnum,
} from '@nx-next-app/types'
import { paths, PRODUCTS, type IProduct } from '@nx-next-app/constants'

const desktopSubmenuBackground = [
	{
		className: 'ListBG-left',
		imgUrl: 'subMenu-Wrapper-ListBG-left.png',
	},
	{
		className: 'ListBG-right',
		imgUrl: 'subMenu-Wrapper-ListBG-right.png',
	},
	{
		className: 'ListBG-center',
		imgUrl: 'subMenu-Wrapper-ListBG-center.png',
	},
]

const h5SubmenuBackground = [
	{
		className: 'list-bg-left',
		imgUrl: 'list-left.png',
	},
	{
		className: 'list-bg-right',
		imgUrl: 'list-right.png',
	},
]

export const desktopSubMenuVipImageList = [
	...desktopSubmenuBackground,
	{
		className: 'List-npc',
		imgUrl: 'home-vip.png',
	},
	{
		className: 'List-bg',
		imgUrl: 'vipbg.png',
	},
]

export const desktopSubMenuLeaderBoardImageList = [
	{
		className: 'List-npc',
		imgUrl: 'home-ranking.png',
	},
	{
		className: 'List-bg',
		imgUrl: 'rankingbg.png',
	},
]

export const desktopSunMenuReferralImageList = [
	{
		className: 'List-npc',
		imgUrl: 'home-refer.png',
	},
	{
		className: 'List-bg',
		imgUrl: 'referbg.png',
	},
]

export type ISubMenuExcludeNpc = {
	className: Exclude<`${string}`, `${string}-npc`>
	imgUrl: string
}

export type ISunMenuNpcImage = {
	className: `${string}-npc`
	remoteImgUrl: string
}
export type IHeaderSubMenuImg = ISubMenuExcludeNpc | ISunMenuNpcImage

export interface ISubMenu extends IProduct {
	h5: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		headerMenuImgList?: Array<IHeaderSubMenuImg>
		hasDesktopLink?: boolean
	}
	desktop: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		headerMenuImgList?: Array<IHeaderSubMenuImg>
		subMenuImageClassName?: string
		// TODO ⚠ lobbyPage 之後必須拔掉，因現在用 nova 資料，
		// TODO ⚠ hoverBgImg 也可以考慮重 api 送 ， 要馬要是都寫在前端，不然就都重 api 送
		lobbyPage?: { npcImg: string; hoverBgImg: string }
	}
	pathname?: string
	query?: {
		provider?: string
		type?: string
		tpId?: string | number
	}
	needLogin?: boolean
}

export type IMenuData = {
	display: 'h5' | 'desktop' | 'all'
	displayKey: string
	pathname?: string
	lobbyCategoryId: number
	subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾(暫時沒有用到)
	query?: { provider: string }
	subMenu: ISubMenu[]
	category: MenuKeyEnum
	h5: {
		icon: string
		subMenuClassName?: string
	}
	desktop: {
		subMenuClassName: string
		menuType?: 'menu' | 'banner'
	}
}

export const MENU_DATA: IMenuData[] = [
	{
		display: 'all',
		lobbyCategoryId: LobbyCategoryEnum.Sports,
		category: MenuKeyEnum.Sports,
		displayKey: 'Label_General_Sports',
		pathname: paths.sports.root,
		query: { provider: 'Soccer' },
		desktop: {
			subMenuClassName: 'sportsList',
		},
		h5: {
			icon: 'icon icon-soccer',
			subMenuClassName: 'sports',
		},
		subMenu: [
			{
				...PRODUCTS.CryptoSports,
				desktop: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'cryptosportNPC.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'sports-cryptosport.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Soccer,
				pathname: paths.sports.root,
				query: { provider: 'Soccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'soccerNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'soccerBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'sports-soccer.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.SabaSoccer,
				pathname: paths.sports.root,
				query: { provider: 'SabaSoccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'sabssoccerNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'soccerBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'sports-sabssoccer.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Basketball,
				pathname: paths.sports.root,
				query: { provider: 'Basketball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'basketballNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'basketballBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'sports-bg-basketball.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'sports-basketball.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Cricket,
				pathname: paths.sports.root,
				query: { provider: 'Cricket' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'cricketNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'cricketBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'sports-bg-cricket.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'sports-cricket.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Badminton,
				pathname: paths.sports.root,
				query: { provider: 'Badminton' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'badmintonNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'badmintonBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'sports-cryptosport.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Volleyball,
				pathname: paths.sports.root,
				query: { provider: 'Volleyball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'volleyballNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'volleyballBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'sports-cryptosport.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
			{
				pathname: paths.sports.root,
				query: { provider: 'VirtualSports' },
				...PRODUCTS.VirtualSports,
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'betradarsoccerNPC.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'soccerBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'sports-bg-soccer.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'sports-betradarsoccer.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
		displayKey: 'Label_General_Exchange',
		category: MenuKeyEnum.Exchange,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Exchange,
		desktop: {
			subMenuClassName: 'exchangeList',
		},
		h5: {
			icon: 'icon icon-sports',
			subMenuClassName: 'exchange',
		},
		subMenu: [
			{
				...PRODUCTS.Nova88Exchange,
				needLogin: true,
				desktop: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: '9wnpc.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'cricketBG.png',
						},
					],
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'List-npc',
							remoteImgUrl: 'sports-9w.png',
						},
						{
							className: 'list-title',
							imgUrl: 'sports-list-title.png',
						},
					],
				},
			},
		],
	},
	{
		display: 'all',
		displayKey: 'Label_General_ESports',
		category: MenuKeyEnum.ESports,
		pathname: paths.eSport.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.ESports,
		desktop: {
			subMenuClassName: 'eSportsList',
		},
		h5: {
			icon: 'icon icon-sports',
			subMenuClassName: 'esport',
		},
		subMenu: [
			{
				...PRODUCTS.ESportALL,
				pathname: paths.eSport.root,
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'esportSABA.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'eSportsListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'esposts-saba.png',
						hoverBgImg: 'esposts-sabaa.png',
					},
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'List-npc',
							remoteImgUrl: 'esports-saba.png',
						},
						{
							className: 'list-title',
							imgUrl: 'esports-list-title.png',
						},
					],
				},
			},
			{
				...PRODUCTS.IMESports,
				pathname: paths.eSport.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'List-npc',
							remoteImgUrl: 'esports-im.png',
						},
						{
							className: 'list-title',
							imgUrl: 'esports-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'esportInplayMatrix.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'eSportsListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'esposts-inplaymatrix.png',
						hoverBgImg: 'esposts-inplaymatrixa.png',
					},
				},
			},
			{
				...PRODUCTS.TFGaming,
				pathname: paths.eSport.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'icon icon-livecasino',
			subMenuClassName: '',
		},
		desktop: {
			subMenuClassName: 'livecasinoList',
		},
		category: MenuKeyEnum.Casino,
		displayKey: 'Label_General_LiveCasino',
		pathname: paths.liveCasino.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Casino,
		subMenu: [
			{
				...PRODUCTS.PragmaticPlayCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-pp.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'casino-pp.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'livePP',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-PP.png',
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
				},
			},
			{
				...PRODUCTS.BigGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-bg.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-bg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveBG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-bg.png',
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
				},
			},
			{
				...PRODUCTS.YeebetCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-yb.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-yb.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino-yb',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-yb.png',
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
				},
			},
			{
				...PRODUCTS.SkywindCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-sk.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'casino-sk.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino_Skywind',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-SK.png',
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
				},
			},
			{
				...PRODUCTS.MicrogamingCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'casino-bg-mg.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-mg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino_MG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-mg.png',
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
				},
			},
			{
				...PRODUCTS.EvolutionGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'casino-bg-ev.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-ev.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino_EVO',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-ev.png',
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
				},
			},
			{
				...PRODUCTS.PlaytechCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-pt.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-pt.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino_PT',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-pt.png',
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
				},
			},
			{
				...PRODUCTS.n2LIVE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-n2.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'casino-n2.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'casino_N2LIVE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-n2.png',
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
				},
			},
			{
				...PRODUCTS.WMCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-wm.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-wm.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveWM',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-WM.png',
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
				},
			},
			{
				...PRODUCTS.Allbet,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-ab.png',
						},
						{
							className: 'list-npc',
							remoteImgUrl: 'casino-ab.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveALL',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-ALL.png',
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
				},
			},
			{
				...PRODUCTS.WE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-eb.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-eb.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveEB',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-EB.png',
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
				},
			},
			{
				...PRODUCTS.SAGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,

						{
							className: 'list-bg',
							imgUrl: 'casino-bg-sa.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-sa.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveSA',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-SA.png',
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
				},
			},
			{
				...PRODUCTS.AESexy,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-ae.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-ae.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveAE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-AE.png',
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
				},
			},
			{
				...PRODUCTS.DreamGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-dg.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-dg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveDG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-DG.png',
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
				},
			},
			{
				...PRODUCTS.AsiaGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'list-bg',
							imgUrl: 'casino-bg-ag.png',
						},

						{
							className: 'list-npc',
							remoteImgUrl: 'casino-ag.png',
						},
						{
							className: 'list-title',
							imgUrl: 'casino-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'liveAG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'casino-AG.png',
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
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'icon icon-icon_777',
			subMenuClassName: 'slot',
		},
		desktop: {
			subMenuClassName: 'livecasinoList',
		},
		category: MenuKeyEnum.Slot,
		displayKey: 'Label_General_Slots',
		pathname: paths.slots.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.SLOTS,
		subMenu: [
			{
				...PRODUCTS.PragmaticPlaySlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-pp.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_PP',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotPP.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PragmaticPlaySlot.tpId,
				},
			},
			{
				...PRODUCTS.Spadegaming,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-sg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_SG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotSG.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Spadegaming.tpId,
				},
			},
			{
				...PRODUCTS.AdvantPlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-apnew.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_AdvantPlay',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotapnew.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AdvantPlay.tpId,
				},
			},
			{
				...PRODUCTS.AmigoGaming,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AmigoGaming.tpId,
				},
			},
			{
				...PRODUCTS.ES,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-endorphina.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_Endorphina',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotEndorphina.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.ES.tpId,
				},
			},
			{
				...PRODUCTS.Nextspin,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Nextspin.tpId,
				},
			},
			{
				...PRODUCTS.PGSoft,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-pg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_PG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotPG.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PGSoft.tpId,
				},
			},
			{
				...PRODUCTS.BNG,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.BNG.tpId,
				},
			},
			{
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.FaChai.tpId,
				},
				...PRODUCTS.FaChai,
			},
			{
				...PRODUCTS.MicrogamingSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-mg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_MGPSW',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotmg.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.MicrogamingSlot.tpId,
				},
			},
			{
				...PRODUCTS.JILI,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-pp.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_JI',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotji.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.JILI.tpId,
				},
			},
			{
				...PRODUCTS.SPRIBE,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-spribe.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_SPRIBE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotSPRIBE.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SPRIBE.tpId,
				},
			},
			{
				...PRODUCTS.Joker,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-joker.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_JOKER',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotJOKER.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Joker.tpId,
				},
			},
			{
				...PRODUCTS.Pegasus,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Pegasus.tpId,
				},
			},
			{
				...PRODUCTS.NoLimitCity,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NoLimitCity.tpId,
				},
			},
			{
				...PRODUCTS.RedTiger,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-rt.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_RedTiger',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotrt.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.RedTiger.tpId,
				},
			},
			{
				...PRODUCTS.NetEnt,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-nt.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_NetEnt',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotnt.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NetEnt.tpId,
				},
			},
			{
				...PRODUCTS.CQ9,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-cq9.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_CQ9',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotCQ9.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.CQ9.tpId,
				},
			},
			{
				...PRODUCTS.PlaynGO,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionTypeEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PlaynGO.tpId,
				},
			},
			{
				...PRODUCTS.GamePlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-gpi.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_GPI',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slotGPI.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.GamePlay.tpId,
				},
			},
			{
				...PRODUCTS.YGGDrassil,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-ygg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_YGG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotYGG.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.YGGDrassil.tpId,
				},
			},
			{
				...PRODUCTS.AMBPoker,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-am.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_AMB',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotam.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AMBPoker.tpId,
				},
			},
			{
				...PRODUCTS.Habanero,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-ho.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_Habanero',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotho.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Habanero.tpId,
				},
			},
			{
				...PRODUCTS.SimplePlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-simpleplay.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_SimplePlay',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotSimplePlay.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SimplePlay.tpId,
				},
			},
			{
				...PRODUCTS.SkywindSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-skywind.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_Skywind',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotsk.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SkywindSlot.tpId,
				},
			},
			{
				...PRODUCTS.PlaytechSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'slot-pt.png',
						},
						{
							className: 'list-title',
							imgUrl: 'slot-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'slot_PT',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						{
							className: 'List-npc',
							remoteImgUrl: 'slotpt.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'slotListHover.png',
						},
					],
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PlaytechSlot.tpId,
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'icon icon-play',
			subMenuClassName: 'play',
		},
		desktop: { subMenuClassName: 'tableList' },
		category: MenuKeyEnum.Game,
		displayKey: 'Label_General_Games',
		pathname: paths.game.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Game,
		subMenu: [
			{
				...PRODUCTS.MPPoker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-mp.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,

						{
							className: 'List-npc',
							remoteImgUrl: 'mp.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamemp.png',
						hoverBgImg: 'gamempa.png',
					},
				},
			},
			{
				...PRODUCTS.AMBPoker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-amb.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'am.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gameamb.png',
						hoverBgImg: 'gameamba.png',
					},
				},
			},
			{
				...PRODUCTS.Vgaming,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-vg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'vg.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamevg.png',
						hoverBgImg: 'gamevga.png',
					},
				},
			},
			{
				...PRODUCTS.KingMaker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-km.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'km.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamekim.png',
						hoverBgImg: 'gamekima.png',
					},
				},
			},
			{
				...PRODUCTS.V8Poker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Aviator,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-spribe-aviator.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'gameSpribeAviator.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamespribe-aciator.png',
						hoverBgImg: 'gamespribe-aciatora.png',
					},
				},
			},
			{
				...PRODUCTS.Mines,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-spribe-mines.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'gameSpribeMines.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamespribe-mines.png',
						hoverBgImg: 'gamespribe-minesa.png',
					},
				},
			},
			{
				...PRODUCTS.Goal,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-spribe-goal.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'gameSpribeGoal.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamespribe-goal.png',
						hoverBgImg: 'gamespribe-goala.png',
					},
				},
			},
			{
				...PRODUCTS.Dice,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-spribe-dice.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'gameSpribeDice.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamespribe-dice.png',
						hoverBgImg: 'gamespribe-dicea.png',
					},
				},
			},
			{
				...PRODUCTS.Spaceman,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Crash,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-ap.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'ap.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gameap.png',
						hoverBgImg: 'gameapa.png',
					},
				},
			},
			{
				...PRODUCTS.GoRush,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'games-spribe-goal.png',
						},
						{
							className: 'list-title',
							imgUrl: 'games-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'jili.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'tablelisthover.png',
						},
					],
					lobbyPage: {
						npcImg: 'gamejili.png',
						hoverBgImg: 'gamejilia.png',
					},
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'icon icon-game',
			subMenuClassName: 'fishing',
		},
		desktop: {
			subMenuClassName: 'fishList',
		},
		category: MenuKeyEnum.Fishing,
		displayKey: 'Label_General_Fishing',
		pathname: paths.fishing.root,
		lobbyCategoryId: LobbyCategoryEnum.Fishing,
		subMenu: [
			{
				...PRODUCTS.FishingGod,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fish-fwo.png',
						},
						{
							className: 'list-title',
							imgUrl: 'fish-list-title.png',
						},
					],
				},
				desktop: {
					subMenuImageClassName: 'fsg',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
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
						npcImg: 'fishfg.png',
						hoverBgImg: 'fishfga.png',
					},
				},
			},
			{
				...PRODUCTS.FishingWar,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'fsgw',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fishSGwar.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishfw.png',
						hoverBgImg: 'fishfwa.png',
					},
				},
			},
			{
				...PRODUCTS.ZombieParty,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AlienHunter,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Paradise,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fish-pd.png',
						},
						{
							className: 'list-title',
							imgUrl: 'fish-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'paradise.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishpd.png',
						hoverBgImg: 'fishpda.png',
					},
				},
			},
			{
				...PRODUCTS.FishHaiba,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fish-hb.png',
						},
						{
							className: 'list-title',
							imgUrl: 'fish-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'hb.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishhb.png',
						hoverBgImg: 'fishhba.png',
					},
				},
			},
			{
				...PRODUCTS.HappyFish5,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fish-hf5.png',
						},
						{
							className: 'list-title',
							imgUrl: 'fish-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'hf5.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishhf.png',
						hoverBgImg: 'fishhfa.png',
					},
				},
			},
			{
				...PRODUCTS.MonsterAwaken,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'fish-ma.png',
						},
						{
							className: 'list-title',
							imgUrl: 'fish-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'ma.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishma.png',
						hoverBgImg: 'fishmaa.png',
					},
				},
			},
			{
				...PRODUCTS.OneshotFishing,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'oneshotfishing.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'fishListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'fishof.png',
						hoverBgImg: 'fishofa.png',
					},
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
		h5: {
			icon: 'four',
			subMenuClassName: '',
		},
		desktop: {
			subMenuClassName: 'fourList',
		},
		displayKey: 'Label_General_FourD',
		pathname: paths.fourD.root,
		category: MenuKeyEnum.FourD,
		lobbyCategoryId: LobbyCategoryEnum.FourD,
		subMenu: [
			{
				...PRODUCTS.GrandDragon,
				pathname: paths.fourD.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
		h5: {
			icon: 'icon icon-kelo',
			subMenuClassName: 'lottery',
		},
		desktop: { subMenuClassName: 'gameList' },
		displayKey: 'Label_General_Lottery',
		pathname: paths.lottery.root,
		category: MenuKeyEnum.Lottery,
		lobbyCategoryId: LobbyCategoryEnum.Lottery,
		subMenu: [
			{
				...PRODUCTS.GPIKeno,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpikeno.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpikeno.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotterygpikeno.png',
						hoverBgImg: 'lotterygpikenoa.png',
					},
				},
			},
			{
				...PRODUCTS.ThaiLottery,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpithaiv.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpithai.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
				},
			},
			{
				...PRODUCTS.Fast3,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpifast3.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-gpifast3.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotterygpifast3.png',
						hoverBgImg: 'lotterygpifast3a.png',
					},
				},
			},
			{
				...PRODUCTS.TCG,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-tcg.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-tcg.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotterytc.png',
						hoverBgImg: 'lotterytca.png',
					},
				},
			},
			{
				...PRODUCTS.Keno,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-keno.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-keno.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotteryke.png',
						hoverBgImg: 'lotterykea.png',
					},
				},
			},
			{
				...PRODUCTS.Lottery,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-lottery.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-lottery.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotterylo.png',
						hoverBgImg: 'lotteryloa.png',
					},
				},
			},
			{
				...PRODUCTS.NumberGame,
				pathname: paths.sports.root,
				query: { provider: 'NumberGame' },
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-numbergame.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
					headerMenuImgList: [
						...desktopSubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-numberGame.png',
						},
						{
							className: 'List-bg',
							imgUrl: 'gameListHover.png',
						},
					],
					lobbyPage: {
						npcImg: 'lotterynu.png',
						hoverBgImg: 'lotterynua.png',
					},
				},
			},
			{
				...PRODUCTS.TableGame,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...h5SubmenuBackground,
						{
							className: 'List-npc',
							remoteImgUrl: 'lo-tablegame.png',
						},
						{
							className: 'list-title',
							imgUrl: 'lottery-list-title.png',
						},
					],
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
					headerMenuImgList: [
						...desktopSubmenuBackground,
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
						npcImg: 'lotteryta.png',
						hoverBgImg: 'lotterytaa.png',
					},
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
]
