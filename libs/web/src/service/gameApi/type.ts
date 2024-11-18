export interface IGameData {
	slotGameId: string
	tpId: number
	gameId: string
	appId: string
	launchDate: string
	reels: string
	rtp: string
	paylines: string
	playFree: boolean
	gameName: {
		[lang: string]: string
	}
	slotGameCategoryList: number[]
	imgName: {
		[lang: string]: string
	}
	sort: number
	top: number
}

export interface ILobbyGameData {
	lobbyCategoryId: number
	lobbyCategory: string
	tpId: number
	tpGameType: number
	gameId: string
	tpName: string
	tpGameIdNo: number
	productName: string
  currencyGameName: string
	iconType: boolean
	iconStartTime: Date
	iconEndTime: Date
	sort: number
	betType: number
  imgProductName: string
}

export interface IVendorData {
	tpId: number
	tpName: string
	tpGameType: number
	playFree: boolean
	displayText: string
	imgName: string
	gameImgDisplayText: string
	sort: number
	openPath: string
  isLobby: boolean
}

export interface ISlotsGameData {
	all?: IGameData[]
	buyFeaturesGames?: IGameData[]
	featured?: IGameData[]
	imgUrl?: string
	jackpot?: IGameData[]
	megaways?: IGameData[]
	mini?: IGameData[]
	myFavorite?: IGameData[]
	new?: IGameData[]
	providerList?: IVendorData[]
	random?: IVendorData[]
	recentlyPlayed?: IGameData[]
	tableAndCards?: IGameData[]
}

export interface ILobbyCategoryGameData {
	all?: ILobbyGameData[]
	buyFeaturesGames?: ILobbyGameData[]
	featured?: ILobbyGameData[]
	imgUrl?: string
	jackpot?: ILobbyGameData[]
	megaways?: ILobbyGameData[]
	mini?: ILobbyGameData[]
	myFavorite?: ILobbyGameData[]
	new?: ILobbyGameData[]
	providerList?: IVendorData[]
	random?: IVendorData[]
	recentlyPlayed?: ILobbyGameData[]
	tableAndCards?: ILobbyGameData[]
}

export interface IDisplayGameData extends IGameData {
	isMaintain: boolean
	isFavorite: boolean
}

export interface IDisplayLobbyGameData extends ILobbyGameData {
	isMaintain: boolean
	isFavorite: boolean
}

export interface IGetRecentlyViewedArgs {
	currencyId: number
}

export type IViewedGameData = {
	betType?: number
	categoryId: number
	gameId?: string | number
	gameLogo: {
		[lang: string]: string
	}
	gameName: {
		[lang: string]: string
	}
	isMaintain: boolean
	tpGameIdNo: number | undefined
	tpGameType: number
	tpId: number
	tpLogo: string
	tpName: string
}
export interface IRecentlyViewedData {
	bannerUrl: string
	imgUrl: string
	recentlyViewedList: IViewedGameData[]
}

export interface ISubMenuData {
	lobbyCategory: string
	tpId: number
	tpName: string
	productName: string
	tpGameIdNo: number | undefined
	gameId?: number | string
	tpGameType: number
	currencyGameName: Record<string, string> | null
	pcHeaderPicUrl: string
	pcLobbyPicUrl: string
	mobileHeaderPicUrl: string
	mobileLobbyPicUrl: string
	sort: number
	iconEndTime: string
	iconStartTime: string
	iconType: number
}
export interface ILobbyHeaderData {
	lobbyCategoryId: number
	data: ISubMenuData[]
}
