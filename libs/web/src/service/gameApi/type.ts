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

export interface IVendorData {
	tpId: number
	tpName: string
	playFree: boolean
	displayText: string
	imgName: string
	gameImgDisplayText: string
	sort: number
	openPath: string
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

export interface IDisplayGameData extends IGameData {
	isMaintain: boolean
	isFavorite: boolean
}
