import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import LoginModal from '@nx-next-app/features/F0001/desktop/modal/LoginModal'
import { useInView } from '@nx-next-app/hooks'
import {
	IBannerData,
	IDisplayLobbyGameData,
	ILobbyCategoryGameData,
	ILobbyGameData,
	IVendorData,
	useGetBannerV3Query,
	useSetFavoriteGameMutation,
} from '@nx-next-app/service'
import { BannerTypeEnum, ProviderEnum } from '@nx-next-app/types'
import { getIsTpMaintain, moveItem } from '@nx-next-app/utils'
import { camelCase, find, findIndex, includes, some, trim } from 'lodash-es'
import { useRouter } from 'next/router'
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback
} from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

interface ILobbyProviderProps {
	children: ReactNode
	persistLobbyGameData: ILobbyCategoryGameData
	persistLobbyCategoryData: ILobbyCategoryGameData
}

export interface LobbyContextInterface {
	lobbyGameList: IDisplayLobbyGameData[]
	imgUrl: string | undefined
	bannerList: IBannerData[]
	vendorList: IVendorData[]
	categoryKeys: string[]
	activeVendorTpId: number | string | null
	activeCategoryKey: string
	activeGame:
	| (IDisplayLobbyGameData & {
		resultTpName?: string
		resultGameImgDisplayText?: string
		resultGameName?: string
	})
	| null
	searchCategoryText: string
	myFavorites: string
	gameListRef: React.MutableRefObject<null>
	navRef: React.MutableRefObject<null>
	isGetBannerV3Fetching: boolean
	isShowSearchInput: boolean
	isNavInView: boolean
	isGameListInView: boolean
	isFavorite: boolean
	isActiveDropdown: boolean
	onVendorChange: ({
		tpId,
		openPath,
		pathRoot,
	}: {
		tpId: number
		openPath: string
		pathRoot: string
	}) => void
	onCategoryChange: (value: string) => void
	onSearchCategoryTextChange: (value: string) => void
	setIsShowSearchInput: Dispatch<SetStateAction<boolean>>
	onInputClose: () => void
	onFavoritesToggle: ({
		tpId,
		gameId,
	}: {
		tpId: number
		gameId: string
	}) => void
	onGameActive: (
		targetData:
			| (IDisplayLobbyGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
			})
			| null
	) => void
	onGamePlay: ({
		tpId,
		gameId,
		playFree,
	}: {
		tpId: number
		gameId: string
		playFree: boolean
	}) => void
	onToggleDropdown: () => void
	isNewGame: () => string[]
	providerSize: number
}

export const LobbyContext = createContext<LobbyContextInterface>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useLobby = () => useContext(LobbyContext)

const removeDuplicates = (data: ILobbyGameData[]) => {
	const seen = new Set()
	const uniqueData = []

	for (let i = 0; i < data.length; i += 1) {
		const str = JSON.stringify(data[i])
		if (!seen.has(str)) {
			seen.add(str)
			uniqueData.push(data[i])
		}
	}

	return uniqueData
}

const LobbyProvider = ({
	children,
	persistLobbyGameData,
	persistLobbyCategoryData,
}: ILobbyProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()
	const {
		push,
		query: { tpId: queryTpId },
	} = useRouter()
	const { modal } = useGlobalModal()
	const { tpMaintainList, custGameTypeSettingList } = useGlobalData()
	const isFirstRender = useIsFirstRender()
	const { ref: gameListRef, isInView: isGameListInView } = useInView({})
	const { ref: navRef, isInView: isNavInView } = useInView({
		rootMargin: '-160px 0px 0px 0px',
	})
	const [activeVendorTpId, setActiveVendorTpId] = useState<
		number | string | null
	>(null)
	const [vendorList, setVendorList] = useState<IVendorData[]>(
		persistLobbyGameData.providerList as IVendorData[]
	)
	const [searchCategoryText, setSearchCategoryText] = useState('')
	const [activeCategoryKey, setActiveCategoryKey] =
		useState<keyof ILobbyCategoryGameData>('all')
	const [categoryKeys, setCategoryKeys] = useState(
		Object.keys(persistLobbyCategoryData)
	)
	const [lobbyGameList, setlobbyGameList] = useState<IDisplayLobbyGameData[]>(
		[]
	)

	// 初始渲染40筆資料
	const [pageSize, setPageSize] = useState(50)
	const [isProcess, setIsProcess] = useState(true)
	const [myFavorites, setMyFavorites] = useLocalStorage('myFavorites', '')
	const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)
	const [activeGame, setActiveGame] = useState<
		| (IDisplayLobbyGameData & {
			resultTpName?: string
			resultGameImgDisplayText?: string
			resultGameName?: string
		})
		| null
	>(null)
	const [isActiveDropdown, setIsActiveDropdown] = useState(false)

	const largeScreenSize = 1450
	const maxProviderNumber = 5
	const minProviderNumber = 4
	const [providerSize, setProviderSize] = useState<number>(5)

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			window.innerWidth > largeScreenSize
				? setProviderSize(maxProviderNumber)
				: setProviderSize(minProviderNumber)
		})
	}

	// 找出featured的位置
	const featuredIdx = categoryKeys.findIndex(value => {
		return value === 'featured'
	})

	const [setFavoriteGame, { isLoading: isSetFavoriteGameLoading }] =
		useSetFavoriteGameMutation()

	const {
		data: { data: bannerList = [] } = {},
		isFetching: isGetBannerV3Fetching,
	} = useGetBannerV3Query({
		bannerType: BannerTypeEnum.Slots,
		currencyId,
		langId,
	})

	const onVendorChange = ({
		tpId,
		openPath,
		pathRoot,
	}: {
		tpId: number
		openPath: string
		pathRoot: string
	}) => {
		if (tpId === activeVendorTpId) {
			setActiveVendorTpId(null)

			// * 只改變路徑，不重新渲染畫面
			push({ pathname: pathRoot }, undefined, { shallow: true })
		} else {
			setActiveVendorTpId(tpId)
			if (openPath) {
				push(`/${openPath}`)
			} else {
				// * 只改變路徑，不重新渲染畫面
				push({ pathname: pathRoot, query: { tpId } }, undefined, {
					shallow: true,
				})
			}
		}
	}

	const onSearchCategoryTextChange = (value: string) => {
		setSearchCategoryText(value)
	}

	const handleLoginCallback = () => {
		if (
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
		) {
			modal.open(<LoginModal />)
		}
		if (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile) {
			push(paths.login.root)
		}
	}

	const onGamePlay = ({
		tpId,
		gameId,
		playFree,
	}: {
		tpId: number
		gameId: string
		playFree: boolean
	}) => {
		// * 從 slotGameData 中的 providerList 找對應的 tpGameType
		const { tpGameType = '' } =
			find(persistLobbyGameData.providerList, {
				tpId,
			}) || {}
	}

	const onCategoryChange = (value: string) => {
		setActiveCategoryKey(value as keyof ILobbyCategoryGameData)
	}

	const isFavorite = ({
		tpId: targetTpId,
		gameId: targetGameId,
	}: {
		gameId: string
		tpId: number
	}) => {
		return Boolean(
			myFavorites
				.split('&')
				.map(string => string.split('#'))
				.find(
					([tpId, gameId]) =>
						String(targetTpId) === tpId && targetGameId === gameId
				)
		)
	}

	const onFavoritesToggle = async ({
		tpId: newTpId,
		gameId: newGameId,
	}: {
		tpId: number
		gameId: string
	}) => {
		const isRemove = Boolean(
			myFavorites
				.split('&')
				.map(string => string.split('#'))
				.find(
					([tpId, gameId]) => String(newTpId) === tpId && newGameId === gameId
				)
		)

		if (isRemove) {
			const filteredMyFavoriteStr = myFavorites
				.split('&')
				.map(string => string.split('#'))
				.filter(
					([tpId, gameId]) =>
						!(String(newTpId) === tpId && newGameId === gameId)
				)
				.map(([tpId, gameId]) => `${tpId}#${gameId}`)
				.join('&')

			setMyFavorites(trim(filteredMyFavoriteStr))
		} else {
			const newFavorite = `${myFavorites === '' ? '' : '&'
				}${newTpId}#${newGameId}`
			setMyFavorites(prev => `${prev}${newFavorite}`)
		}
		if (isLogin && !isSetFavoriteGameLoading) {
			await setFavoriteGame({
				providerId: newTpId,
				gameId: newGameId,
				isRemove,
			}).unwrap()
		}
	}

	const onInputClose = () => {
		setIsShowSearchInput(false)
		if (searchCategoryText !== '') {
			onSearchCategoryTextChange('')
		} else {
			setIsShowSearchInput(false)
		}
	}

	const onGameActive = (
		targetData:
			| (IDisplayLobbyGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
			})
			| null
	) => {
		setActiveGame(targetData)
	}

	const onToggleDropdown = () => {
		setIsActiveDropdown(prev => !prev)
	}

	const updateVendorList = () => {
		// 篩選直播主vendorList
		let tempVendorList = vendorList
		if (custGameTypeSettingList && custGameTypeSettingList.length > 0) {
			const uniqueTpIds = Array.from(
				new Set(custGameTypeSettingList.map(item => item.tpId))
			)
			tempVendorList = vendorList.filter(
				({ tpId }) => !uniqueTpIds.includes(tpId)
			)
		}

		const targetIndex = findIndex(tempVendorList, {
			tpId: Number(queryTpId),
		})

		if (targetIndex !== -1) {
			if (
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
			) {
				// * 當指定廠牌不在頁面上時,展開下拉

				if (targetIndex >= providerSize) {
					setIsActiveDropdown(true)
				} else {
					setIsActiveDropdown(false)
				}
				setVendorList(tempVendorList)
			}

			if (
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile
			) {
				// * 將 queryTpId 找到的 vendor slice 到第一個選項並 selected
				const newVendorList = [
					...tempVendorList.slice(targetIndex),
					...tempVendorList.slice(0, targetIndex),
				]
				setVendorList(newVendorList)
			}

			setActiveVendorTpId(tempVendorList[targetIndex].tpId)
		} else {
			setVendorList(tempVendorList)
			// MaxPlay
			if (Number(queryTpId) === ProviderEnum.MaxPlay) {
				setActiveVendorTpId(ProviderEnum.MaxPlay)
			}
		}
	}

	// 將New Game的gameId存在一個陣列，可以讓其他類別的遊戲比對是不是剛好也含有New Game的遊戲
	const isNewGame = () => {
		const newGamesArr: string[] = []
		persistLobbyCategoryData['new']?.map(value =>
			newGamesArr.push(value.gameId)
		)
		return newGamesArr
	}

	const scrollToTop = useCallback(() => {
		const mainContent = document?.getElementById('__top')
		if (!mainContent) return

		mainContent.scrollTop = 0
	}, [])

	useEffect(() => {
		if (isFirstRender) {
			const responseMyFavorites =
				persistLobbyCategoryData.myFavorite?.map(({ tpId, gameId }) => {
					return `${tpId}#${gameId}`
				}) ?? []
			const existingValue = new Set(myFavorites.split('&'))
			let result = ''

			responseMyFavorites.forEach(str => {
				if (!existingValue.has(str)) {
					result += `${result === '' ? '' : '&'}${str}`
					existingValue.add(str)
				}
			})
			setMyFavorites(
				prev => `${prev}${myFavorites && result ? '&' : ''}${result}`
			)
			updateVendorList()
			setActiveCategoryKey('all')
			scrollToTop()
		}
	}, [isFirstRender])

	// * 根據廠商過濾遊戲類型
	useEffect(() => {
		setCategoryKeys(Object.keys(persistLobbyCategoryData))
		setActiveCategoryKey('all') // 一進畫面先顯示哪個類別的遊戲
	}, [queryTpId])

	// useEffect(() => {
	// 	// 如果featured裡面沒有資料，直接帶ALL的
	// 	if (featuredIdx === -1) setActiveCategoryKey('all')
	// }, [lobbyGameList])

	useEffect(() => {
		if (
			queryTpId &&
			!isFirstRender &&
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
		) {
			updateVendorList()
		}
	}, [queryTpId])

	// * vendor、category 更新時初始 input
	useEffect(() => {
		onSearchCategoryTextChange('')
	}, [queryTpId, activeCategoryKey])

	// * 更新遊戲列表
	useEffect(() => {
		const resultList: ILobbyGameData[] = []
		myFavorites
			.split('&')
			.map(string => string.split('#'))
			.forEach(([tpId, gameId]) => {
				persistLobbyCategoryData.all?.forEach(item => {
					if (
						String(item.tpId) === tpId &&
						item.gameId === gameId &&
						resultList.findIndex(x => x.gameId === gameId) === -1
					) {
						resultList.push(item)
					}
				})
			})
		let originGameList =
			activeCategoryKey === 'myFavorite'
				? removeDuplicates(resultList)
				: ((persistLobbyCategoryData[activeCategoryKey] ||
					[]) as ILobbyGameData[])

		if (custGameTypeSettingList && custGameTypeSettingList.length > 0) {
			const uniqueTpIds = Array.from(
				new Set(custGameTypeSettingList.map(item => item.tpId))
			)
			originGameList = originGameList.filter(
				({ tpId }) => !uniqueTpIds.includes(tpId)
			)
		}

		originGameList = originGameList.filter(
			({ tpId }) =>
				(queryTpId ? String(tpId) === queryTpId : true) ||
				(queryTpId === ProviderEnum.MaxPlay.toString() &&
					(tpId === ProviderEnum.MaxGame ||
						tpId === ProviderEnum.Keno ||
						tpId === ProviderEnum.Lottery ||
						tpId === ProviderEnum.TableGame))
		)

		// * 過濾當前 tpId 與 searchCategoryText
		const filteredGameList = originGameList
			.filter(({ tpId, gameName }) => {
				return (
					searchCategoryText === '' ||
					searchCategoryText === '' ||
					some(Object.values(gameName), name =>
						camelCase(trim(gameName)).match(camelCase(trim(searchCategoryText)))
					)
				)
			})
			.map(gameObj => ({
				...gameObj,
				isMaintain: getIsTpMaintain({
					tpMaintainList,
					tpId: gameObj.tpId,
					tpGameType: find(persistLobbyGameData.providerList, {
						tpId: gameObj.tpId,
					})?.tpGameType,
				}),
				isFavorite: isFavorite({ tpId: gameObj.tpId, gameId: gameObj.gameId }),
			}))
		// 原先為按照發佈時間順序排列：
		// .sort(
		// 	(a, b) =>
		// 		new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
		// )
		setlobbyGameList(filteredGameList)
		setIsProcess(false)
	}, [activeCategoryKey, queryTpId, searchCategoryText, myFavorites, tpMaintainList])

	// 更新遊戲列表預設給定40筆資料
	useEffect(() => {
		if (!isProcess) {
			setPageSize(50)
			setIsProcess(true)
		}
	}, [activeCategoryKey, queryTpId, searchCategoryText, lobbyGameList.length])

	// 每次向下更新25筆資料
	useEffect(() => {
		if (isGameListInView) {
			if (pageSize >= lobbyGameList.length) {
				return
			}
			setPageSize(prev => prev + 25)
		}
	}, [isGameListInView])

	const value: LobbyContextInterface = {
		lobbyGameList: lobbyGameList.slice(0, pageSize),
		imgUrl: persistLobbyGameData.imgUrl,
		bannerList,
		vendorList,
		categoryKeys,
		isGetBannerV3Fetching,
		activeVendorTpId,
		activeCategoryKey,
		activeGame,
		searchCategoryText,
		myFavorites,
		gameListRef,
		navRef,
		isShowSearchInput,
		isNavInView,
		isGameListInView,
		isFavorite: includes(myFavorites, activeGame?.gameId),
		isActiveDropdown,
		onVendorChange,
		onCategoryChange,
		onSearchCategoryTextChange,
		setIsShowSearchInput,
		onInputClose,
		onFavoritesToggle,
		onGameActive,
		onGamePlay,
		onToggleDropdown,
		isNewGame,
		providerSize,
	}

	return <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
}

export { LobbyProvider }
