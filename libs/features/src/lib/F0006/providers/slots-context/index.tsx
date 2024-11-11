import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import LoginModal from '@nx-next-app/features/F0001/desktop/modal/LoginModal'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useInView } from '@nx-next-app/hooks'
import {
	IBannerData,
	IDisplayGameData,
	IGameData,
	ISlotsGameData,
	IVendorData,
	useGetBannerV3Query,
	useSetFavoriteGameMutation,
} from '@nx-next-app/service'
import { BannerTypeEnum } from '@nx-next-app/types'
import { getIsTpMaintain } from '@nx-next-app/utils'
import {
	camelCase,
	filter,
	find,
	findIndex,
	includes,
	random,
	some,
	trim,
} from 'lodash-es'
import { useRouter } from 'next/router'
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

interface ISlotsProviderProps {
	children: ReactNode
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
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

const SlotsProvider = ({
	children,
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()
	const {
		push,
		query: { tpId: queryTpId },
	} = useRouter()
	const { modal } = useGlobalModal()
	const { onEnterSlotsPage } = useMenu()
	const { tpMaintainList } = useGlobalData()
	const isFirstRender = useIsFirstRender()
	const { ref: gameListRef, isInView: isGameListInView } = useInView({})
	const { ref: navRef, isInView: isNavInView } = useInView({
		rootMargin: '-160px 0px 0px 0px',
	})
	const [activeVendorTpId, setActiveVendorTpId] = useState<
		number | string | null
	>(null)
	const [vendorList, setVendorList] = useState<IVendorData[]>(
		persistSlotsGameData.providerList as IVendorData[]
	)
	const [searchCategoryText, setSearchCategoryText] = useState('')
	const [activeCategoryKey, setActiveCategoryKey] =
		useState<keyof ISlotsGameData>('all')
	const [categoryKeys, setCategoryKeys] = useState(
		Object.keys(persistSlotsCategoryData)
	)
	const [slotsGameList, setSlotsGameList] = useState<IDisplayGameData[]>([])
	// 初始渲染40筆資料
	const [pageSize, setPageSize] = useState(40)
	const [isProcess, setIsProcess] = useState(true)
	const [myFavorites, setMyFavorites] = useLocalStorage('myFavorites', '')
	const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)
	const [activeGame, setActiveGame] = useState<
		| (IDisplayGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
		  })
		| null
	>(null)

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
			find(persistSlotsGameData.providerList, { tpId }) || {}

		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback: handleLoginCallback }
		)
	}

	const onCategoryChange = (value: string) => {
		if (value === 'random') {
			if (isLogin) {
				const categoryData =
					queryTpId !== undefined
						? filter(persistSlotsCategoryData['all'], {
								tpId: Number(queryTpId),
						  }) || []
						: persistSlotsCategoryData['all'] || []
				const randomGame = categoryData[random(categoryData.length)]
				onGamePlay(randomGame)
			} else {
				handleLoginCallback()
			}
		} else {
			setActiveCategoryKey(value as keyof ISlotsGameData)
		}
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
			const newFavorite = `${
				myFavorites === '' ? '' : '&'
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
			| (IDisplayGameData & {
					resultTpName?: string
					resultGameImgDisplayText?: string
					resultGameName?: string
			  })
			| null
	) => {
		setActiveGame(targetData)
	}

	useEffect(() => {
		// * 首次進入slots計算整理myFavorites
		if (isFirstRender) {
			const responseMyFavorites =
				persistSlotsCategoryData.myFavorite?.map(({ tpId, gameId }) => {
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

			const targetIndex = findIndex(vendorList, { tpId: Number(queryTpId) })

			// * 將 queryTpId 找到的 vendor slice 到第一個選項並 selected
			if (targetIndex !== -1) {
				const newVendorList = [
					...vendorList.slice(targetIndex),
					...vendorList.slice(0, targetIndex),
				]
				setVendorList(newVendorList)
				setActiveVendorTpId(vendorList[targetIndex].tpId)
			}
		}
	}, [isFirstRender])

	// * 根據廠商過濾遊戲類型
	useEffect(() => {
		const updateCategoryKeys = () => {
			const newCategoryKeys: string[] = []
			if (queryTpId) {
				Object.entries(persistSlotsCategoryData).forEach(([key, value]) => {
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
				setCategoryKeys(newCategoryKeys)
			} else {
				setCategoryKeys(Object.keys(persistSlotsCategoryData))
			}
		}

		updateCategoryKeys()
		setActiveCategoryKey('all')
	}, [queryTpId])

	// * vendor、category 更新時初始 input
	useEffect(() => {
		onSearchCategoryTextChange('')
	}, [queryTpId, activeCategoryKey])

	// * 更新遊戲列表
	useEffect(() => {
		const resultList: IGameData[] = []
		myFavorites
			.split('&')
			.map(string => string.split('#'))
			.forEach(([tpId, gameId]) => {
				persistSlotsCategoryData.all?.forEach(item => {
					if (String(item.tpId) === tpId && item.gameId === gameId) {
						resultList.push(item)
					}
				})
			})
		const originGameList =
			activeCategoryKey === 'myFavorite'
				? removeDuplicates(resultList)
				: ((persistSlotsCategoryData[activeCategoryKey] || []) as IGameData[])

		// * 過濾當前 tpId 與 searchCategoryText
		const filteredGameList = originGameList
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
					tpGameType: find(persistSlotsGameData.providerList, {
						tpId: gameObj.tpId,
					})?.tpGameType,
				}),
				isFavorite: isFavorite({ tpId: gameObj.tpId, gameId: gameObj.gameId }),
			}))

		setSlotsGameList(filteredGameList)
		setIsProcess(false)
	}, [
		activeCategoryKey,
		queryTpId,
		searchCategoryText,
		myFavorites,
		tpMaintainList,
	])

	// 更新遊戲列表預設給定40筆資料
	useEffect(() => {
		if (!isProcess) {
			setPageSize(40)
			setIsProcess(true)
		}
	}, [activeCategoryKey, queryTpId, searchCategoryText, slotsGameList.length])

	// 每次向下更新25筆資料
	useEffect(() => {
		if (isGameListInView) {
			if (pageSize >= slotsGameList.length) {
				return
			}
			setPageSize(prev => prev + 25)
		}
	}, [isGameListInView])

	const value: SlotsContextInterface = {
		slotsGameList: slotsGameList.slice(0, pageSize),
		imgUrl: persistSlotsGameData.imgUrl,
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
		onVendorChange,
		onCategoryChange,
		onSearchCategoryTextChange,
		setIsShowSearchInput,
		onInputClose,
		onFavoritesToggle,
		onGameActive,
		onGamePlay,
	}

	return <SlotsContext.Provider value={value}>{children}</SlotsContext.Provider>
}

export { SlotsProvider }
