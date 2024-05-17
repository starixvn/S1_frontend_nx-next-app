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

export interface ISubMenu extends IProduct {
	h5: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		hasDesktopLink?: boolean
	}
	desktop: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		subMenuImageClassName?: string
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
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Soccer,
				pathname: paths.sports.root,
				query: { provider: 'Soccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SabaSoccer,
				pathname: paths.sports.root,
				query: { provider: 'SabaSoccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Basketball,
				pathname: paths.sports.root,
				query: { provider: 'Basketball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Cricket,
				pathname: paths.sports.root,
				query: { provider: 'Cricket' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Badminton,
				pathname: paths.sports.root,
				query: { provider: 'Badminton' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					hasDesktopLink: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Volleyball,
				pathname: paths.sports.root,
				query: { provider: 'Volleyball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				pathname: paths.sports.root,
				query: { provider: 'VirtualSports' },
				...PRODUCTS.VirtualSports,
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
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
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
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
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.IMESports,
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
				},
				desktop: {
					subMenuImageClassName: 'livePP',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.BigGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveBG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.YeebetCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'casino-yb',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SkywindCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'casino_Skywind',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MicrogamingCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'casino_MG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.EvolutionGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'casino_EVO',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.PlaytechCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
				},
				desktop: {
					subMenuImageClassName: 'casino_PT',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.UseGoToGame,
				},
			},
			{
				...PRODUCTS.n2LIVE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'casino_N2LIVE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WMCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveWM',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Allbet,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveALL',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveEB',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SAGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveSA',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AESexy,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveAE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.DreamGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveDG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AsiaGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
				desktop: {
					subMenuImageClassName: 'liveAG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_PP',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_SG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_AdvantPlay',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_Endorphina',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_PG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_MGPSW',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_JI',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_SPRIBE',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_JOKER',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_RedTiger',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_NetEnt',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_CQ9',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_GPI',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_YGG',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_AMB',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_Habanero',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_SimplePlay',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_Skywind',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
				},
				desktop: {
					subMenuImageClassName: 'slot_PT',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
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
		desktop: { subMenuClassName: 'livecasinoList' },
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
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AMBPoker,
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
				...PRODUCTS.Vgaming,
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
				...PRODUCTS.KingMaker,
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
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Mines,
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
				...PRODUCTS.Goal,
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
				...PRODUCTS.Dice,
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
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.GoRush,
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
				},
				desktop: {
					subMenuImageClassName: 'fsg',
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
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
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.FishHaiba,
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
				...PRODUCTS.HappyFish5,
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
				...PRODUCTS.MonsterAwaken,
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
				...PRODUCTS.OneshotFishing,
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
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.ThaiLottery,
				pathname: paths.lottery.root,
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
				...PRODUCTS.Fast3,
				pathname: paths.lottery.root,
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
				...PRODUCTS.TCG,
				pathname: paths.lottery.root,
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
				...PRODUCTS.Keno,
				pathname: paths.lottery.root,
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
				...PRODUCTS.Lottery,
				pathname: paths.lottery.root,
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
				...PRODUCTS.NumberGame,
				pathname: paths.sports.root,
				query: { provider: 'NumberGame' },
				h5: {
					hasLobby: false,
					menuActionType: MenuActionTypeEnum.Link,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionTypeEnum.Link,
				},
			},
			{
				...PRODUCTS.TableGame,
				pathname: paths.lottery.root,
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
		subMenuAllowCurrenciesWithAuth: false,
	},
]
