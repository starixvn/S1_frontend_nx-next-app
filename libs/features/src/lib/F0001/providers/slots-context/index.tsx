import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'
import {
	type IBannerData,
	type IDisplayGameData,
	type IGameData,
	type ISlotsGameData,
	type IVendorData,
	useGetBannerV3Query,
	useGetSlotGamePageQuery,
	useSetFavoriteGameMutation,
} from '@nx-next-app/service'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useInView } from '@nx-next-app/hooks'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import LoginModal from '@nx-next-app/features/F0001/desktop/modal/LoginModal'
import {
	camelCase,
	filter,
	find,
	remove,
	findIndex,
	includes,
	isEmpty,
	pick,
	random,
	some,
	trim,
} from 'lodash-es'
import { getIsTpMaintain } from '@nx-next-app/utils'
import { BannerTypeEnum } from '@nx-next-app/types'
import { CategoryEnum } from '@nx-next-app/features/F0001/types'
import { CATEGORY_SORT } from '@nx-next-app/site/nova88'

interface ISlotsProviderProps {
	children: ReactNode
}

export interface SlotsContextInterface {
	slotsGameList: IDisplayGameData[]
	imgUrl: string | undefined
	bannerList: IBannerData[]
	vendorList: IVendorData[]
	categoryKeys: string[]
	activeVendorTpId: number | string | null
	activeCategoryKey: string
	activeGame:
		| (IDisplayGameData & {
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
	}: {
		tpId: number
		openPath: string
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
			| (IDisplayGameData & {
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
}

export const SlotsContext = createContext<SlotsContextInterface>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useSlots = () => useContext(SlotsContext)

const removeDuplicates = (data: IGameData[]) => {
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

const SlotsProvider = ({ children }: ISlotsProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()
	const {
		push,
		query: { tpId: queryTpId, category: queryCategory = 'all' },
	} = useRouter()
	const { modal } = useGlobalModal()
	const { onEnterSlotsPage } = useMenu()
	const { tpMaintainList, custGameTypeSettingList } = useGlobalData()
	const isFirstRender = useIsFirstRender()
	const { ref: gameListRef, isInView: isGameListInView } = useInView({})
	const { ref: navRef, isInView: isNavInView } = useInView({
		rootMargin: '-160px 0px 0px 0px',
	})
	const [activeVendorTpId, setActiveVendorTpId] = useState<
		number | string | null
	>(null)
	const [searchCategoryText, setSearchCategoryText] = useState('')
	// 初始渲染50筆資料
	const [pageSize, setPageSize] = useState(50)
	const [myFavorites, setMyFavorites] = useLocalStorage('myFavorites', '[]')
	const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)
	const [activeGame, setActiveGame] = useState<
		| (IDisplayGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
		  })
		| null
	>(null)
	const [isActiveDropdown, setIsActiveDropdown] = useState(false)

	const { data: { data: slotGameData = {} } = {} } = useGetSlotGamePageQuery({
		deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		currencyId,
	})
	const { providerList } = slotGameData

	// 第一層 providers
	const filteredProvidersList = (): IVendorData[] | [] => {
		if (!providerList) return []
		// 是直播主的的用戶需篩除不允許的 providers
		if (custGameTypeSettingList && custGameTypeSettingList.length > 0) {
			const uniqueTpIds = Array.from(
				new Set(
					custGameTypeSettingList
						.filter(item => item.categoryId === CategoryEnum.SLOTS)
						.map(item => item.tpId)
				)
			)
			return providerList.filter(({ tpId }) => !uniqueTpIds.includes(tpId))
		}
		return providerList
	}

	// 第二層 categories
	const categoriesKeys = () => {
		const newCategoryKeys: string[] = []
		if (queryTpId) {
			Object.entries(slotsCategoryData).forEach(([key, value]) => {
				const result = value.find(
					(item: IGameData) => String(item.tpId) === queryTpId
				)

				if (result !== undefined) {
					newCategoryKeys.push(key)
				}
			})
			if (!newCategoryKeys.includes('myFavorite')) {
				newCategoryKeys.push('myFavorite')
			}
		}
		return isEmpty(newCategoryKeys)
			? Object.keys(slotsCategoryData)
			: newCategoryKeys
	}

	// 第三層 GamesList
	const filteredSlotsGameList = () => {
		const resultList: IGameData[] = []
		const myLocalStoragesFavorites = JSON.parse(myFavorites) as {
			tpId: number
			gameId: string
		}[]
		myLocalStoragesFavorites.forEach(
			({ tpId: favoriteTpId, gameId: favoriteGameId }) => {
				slotsCategoryData.all?.forEach(game => {
					if (game.tpId === favoriteTpId && game.gameId === favoriteGameId) {
						resultList.push(game)
					}
				})
			}
		)

		const slotGamesList =
			queryCategory === 'myFavorite'
				? removeDuplicates(resultList)
				: (slotsCategoryData[
						queryCategory as keyof ISlotsGameData
				  ] as IGameData[]) || []

		return slotGamesList
			.filter(({ tpId, gameName }) => {
				return (
					(queryTpId ? String(tpId) === queryTpId : true) &&
					(searchCategoryText === '' ||
						some(Object.values(gameName), name =>
							camelCase(trim(name)).match(camelCase(trim(searchCategoryText)))
						))
				)
			})
			.map(gameObj => ({
				...gameObj,
				isMaintain: getIsTpMaintain({
					tpMaintainList,
					tpId: gameObj.tpId,
					tpGameType: find(filteredProvidersList(), {
						tpId: gameObj.tpId,
					})?.tpGameType,
				}),
				isFavorite: isFavorite({ tpId: gameObj.tpId, gameId: gameObj.gameId }),
			}))
			.sort(
				(a, b) =>
					new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
			)
	}

	const slotsCategoryData = pick(slotGameData, CATEGORY_SORT) as ISlotsGameData

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

	// 第一層點擊事件
	const onVendorChange = ({
		tpId,
		openPath,
	}: {
		tpId: number
		openPath: string
	}) => {
		if (tpId === activeVendorTpId) {
			setActiveVendorTpId(null)

			// * 只改變路徑，不重新渲染畫面
			push({ pathname: paths.slots.root }, undefined, { shallow: true })
		} else {
			setActiveVendorTpId(tpId)
			if (openPath) {
				push(`/${openPath}`)
			} else {
				// * 只改變路徑，不重新渲染畫面
				push({ pathname: paths.slots.root, query: { tpId } }, undefined, {
					shallow: true,
				})
			}
		}
		setPageSize(50)
	}

	// 第二層點擊事件
	const onCategoryChange = (value: string) => {
		if (value === 'random') {
			if (isLogin) {
				const categoryData =
					queryTpId !== undefined
						? filter(slotsCategoryData['all'], {
								tpId: Number(queryTpId),
						  }) || []
						: slotsCategoryData['all'] || []
				const randomGame = categoryData[random(categoryData.length)]
				onGamePlay(randomGame)
			} else {
				handleLoginCallback()
			}
		} else {
			push(
				{
					pathname: paths.slots.root,
					query: { tpId: queryTpId, category: value },
				},
				undefined,
				{
					shallow: true,
				}
			)
		}
		setPageSize(50)
	}

	// 第三層點擊事件
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
			find(filteredProvidersList(), {
				tpId,
			}) || {}

		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback: handleLoginCallback }
		)
		setPageSize(50)
	}

	const isFavorite = ({ tpId, gameId }: { gameId: string; tpId: number }) => {
		return Boolean(find(JSON.parse(myFavorites), { tpId, gameId }))
	}

	const onFavoritesToggle = async ({
		tpId,
		gameId,
	}: {
		tpId: number
		gameId: string
	}) => {
		const hasFavoriteGame = isFavorite({ tpId, gameId })
		if (hasFavoriteGame) {
			setMyFavorites(prev => {
				return JSON.stringify(
					filter(
						JSON.parse(prev),
						game => game.gameId !== gameId && game.tpId !== String(tpId)
					)
				)
			})
		} else {
			setMyFavorites(prev => {
				return JSON.stringify(JSON.parse(prev).concat({ tpId, gameId }))
			})
		}
		if (isLogin && !isSetFavoriteGameLoading) {
			await setFavoriteGame({
				providerId: tpId,
				gameId,
				isRemove: hasFavoriteGame,
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
			| (IDisplayGameData & {
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

	// const updateVendorList = () => {
	// 	// 篩選直播主vendorList
	// 	let tempVendorList = providerList as IVendorData[]
	// 	if (custGameTypeSettingList && custGameTypeSettingList.length > 0) {
	// 		const uniqueTpIds = Array.from(
	// 			new Set(
	// 				custGameTypeSettingList
	// 					.filter(item => item.categoryId === CategoryEnum.SLOTS)
	// 					.map(item => item.tpId)
	// 			)
	// 		)
	// 		if (!providerList) return
	// 		tempVendorList = providerList.filter(
	// 			({ tpId }) => !uniqueTpIds.includes(tpId)
	// 		)
	// 	}
	//
	// 	const targetIndex = findIndex(tempVendorList, {
	// 		tpId: Number(queryTpId),
	// 	})
	//
	// 	if (targetIndex !== -1) {
	// 		if (
	// 			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
	// 		) {
	// 			// * 當指定廠牌不在頁面上時,展開下拉
	// 			if (targetIndex > 5) {
	// 				setIsActiveDropdown(true)
	// 			} else {
	// 				setIsActiveDropdown(false)
	// 			}
	// 			// setVendorList(tempVendorList)
	// 		}
	//
	// 		if (
	// 			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Mobile
	// 		) {
	// 			// * 將 queryTpId 找到的 vendor slice 到第一個選項並 selected
	// 			// const newVendorList = [
	// 			// 	...tempVendorList.slice(targetIndex),
	// 			// 	...tempVendorList.slice(0, targetIndex),
	// 			// ]
	// 			// setVendorList(newVendorList)
	// 		}
	//
	// 		setActiveVendorTpId(tempVendorList[targetIndex].tpId)
	// 	} else {
	// 		// setVendorList(tempVendorList)
	// 	}
	// }

	// useEffect(() => {
	// 	// * 首次進入slots計算整理myFavorites
	// 	if (isFirstRender) {
	// 		const responseMyFavorites =
	// 			slotsCategoryData.myFavorite?.map(({ tpId, gameId }) => {
	// 				return `${tpId}#${gameId}`
	// 			}) ?? []
	// 		const existingValue = new Set(myFavorites.split('&'))
	// 		let result = ''
	//
	// 		responseMyFavorites.forEach(str => {
	// 			if (!existingValue.has(str)) {
	// 				result += `${result === '' ? '' : '&'}${str}`
	// 				existingValue.add(str)
	// 			}
	// 		})
	// 		// setMyFavorites(
	// 		// 	prev => `${prev}${myFavorites && result ? '&' : ''}${result}`
	// 		// )
	// 		// updateVendorList()
	// 	}
	// }, [isFirstRender])

	// useEffect(() => {
	// 	if (
	// 		queryTpId &&
	// 		!isFirstRender &&
	// 		Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop
	// 	) {
	// 		updateVendorList()
	// 	}
	// }, [queryTpId])

	// * vendor、category 更新時初始 input
	// useEffect(() => {
	// 	onSearchCategoryTextChange('')
	// }, [queryTpId, activeCategoryKey])

	// * 更新遊戲列表
	// useEffect(() => {
	// 	const resultList: IGameData[] = []
	// 	myFavorites
	// 		.split('&')
	// 		.map(string => string.split('#'))
	// 		.forEach(([tpId, gameId]) => {
	// 			slotsCategoryData.all?.forEach(item => {
	// 				if (String(item.tpId) === tpId && item.gameId === gameId) {
	// 					resultList.push(item)
	// 				}
	// 			})
	// 		})
	// 	let originGameList =
	// 		queryCategory === 'myFavorite'
	// 			? removeDuplicates(resultList)
	// 			: ((slotsCategoryData[queryCategory as keyof ISlotsGameData] ||
	// 					[]) as IGameData[])
	//
	// 	if (custGameTypeSettingList && custGameTypeSettingList.length > 0) {
	// 		const uniqueTpIds = Array.from(
	// 			new Set(
	// 				custGameTypeSettingList
	// 					.filter(item => item.categoryId === CategoryEnum.SLOTS)
	// 					.map(item => item.tpId)
	// 			)
	// 		)
	// 		originGameList = originGameList.filter(
	// 			({ tpId }) => !uniqueTpIds.includes(tpId)
	// 		)
	// 	}
	// 	// * 過濾當前 tpId 與 searchCategoryText
	// 	const filteredGameList = originGameList
	// 		.filter(({ tpId, gameName }) => {
	// 			return (
	// 				(queryTpId ? String(tpId) === queryTpId : true) &&
	// 				(searchCategoryText === '' ||
	// 					some(Object.values(gameName), name =>
	// 						camelCase(trim(name)).match(camelCase(trim(searchCategoryText)))
	// 					))
	// 			)
	// 		})
	// 		.map(gameObj => ({
	// 			...gameObj,
	// 			isMaintain: getIsTpMaintain({
	// 				tpMaintainList,
	// 				tpId: gameObj.tpId,
	// 				tpGameType: find(filteredProvidersList(), {
	// 					tpId: gameObj.tpId,
	// 				})?.tpGameType,
	// 			}),
	// 			isFavorite: isFavorite({ tpId: gameObj.tpId, gameId: gameObj.gameId }),
	// 		}))
	// 		.sort(
	// 			(a, b) =>
	// 				new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
	// 		)
	// }, [queryCategory, queryTpId, searchCategoryText, myFavorites])

	// 更新遊戲列表預設給定40筆資料
	// useEffect(() => {
	// 	if (!isProcess) {
	// 		setPageSize(50)
	// 		setIsProcess(true)
	// 	}
	// }, [queryCategory, queryTpId, searchCategoryText, slotsGameList.length])

	// 每次向下更新25筆資料
	useEffect(() => {
		if (isGameListInView) {
			if (pageSize >= filteredSlotsGameList().length) {
				return
			}
			setPageSize(prev => prev + 25)
		}
	}, [isGameListInView])

	const value: SlotsContextInterface = {
		slotsGameList: filteredSlotsGameList().slice(0, pageSize),
		imgUrl: slotGameData?.imgUrl,
		bannerList,
		vendorList: filteredProvidersList(),
		categoryKeys: categoriesKeys(),
		isGetBannerV3Fetching,
		activeVendorTpId,
		activeCategoryKey: queryCategory as string,
		activeGame,
		searchCategoryText,
		myFavorites,
		gameListRef,
		navRef,
		isShowSearchInput,
		isNavInView,
		isGameListInView,
		isFavorite: some(JSON.parse(myFavorites), {
			gameId: activeGame?.gameId,
		}),
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
	}

	return <SlotsContext.Provider value={value}>{children}</SlotsContext.Provider>
}

export { SlotsProvider }
