import { useEffect, useState } from 'react'
import { camelCase, find, some, trim } from 'lodash-es'
import { useRouter } from 'next/router'
import {
	IDisplayGameData,
	IGameData,
	ISlotsGameData,
} from 'libs/web/src/service/gameApi/type'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import {
	TpMaintainData,
	useSetFavoriteGameMutation,
} from '@nx-next-app/service'
import { TpGameType } from '@nx-next-app/types'
import { SLOT_TP_GAME_TYPE } from '@nx-next-app/site/nova88'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'
import { useMenu } from '@nx-next-app/features/F0001/hooks/useMenu'
import { useInView } from '@nx-next-app/hooks'

const useSlotsGameData = ({
	categoryKey,
	searchCategoryText,
	persistSlotsCategoryData,
	loginCallback,
}: {
	categoryKey: keyof ISlotsGameData
	searchCategoryText: string
	persistSlotsCategoryData: ISlotsGameData
	loginCallback: () => void
}) => {
	const {
		auth: { isLogin },
	} = useAuth()
	const {
		query: { tpId: queryTpId },
	} = useRouter()
	const { onEnterSlotsPage } = useMenu()
	const { tpMaintainList } = useGlobalData()
	const isFirstRender = useIsFirstRender()
	const { ref, isInView } = useInView({})
	const [slotsGameList, setSlotsGameList] = useState<IDisplayGameData[]>([])
	// 初始渲染40筆資料
	const [pageSize, setPageSize] = useState(40)
	const [isProcess, setIsProcess] = useState(true)
	const [myFavorites, setMyFavorites] = useLocalStorage('myFavorites', '')

	const [setFavoriteGame, { isLoading: isSetFavoriteGameLoading }] =
		useSetFavoriteGameMutation()

	const formatTpMaintainList = tpMaintainList?.map((elem: TpMaintainData) => ({
		tpId: elem.tpId,
		tpGameType: elem.tpGameType,
	}))
	const isMaintain = ({ tpId }: { tpId: number }) =>
		formatTpMaintainList?.some(
			item =>
				item.tpId === tpId &&
				(item.tpGameType ===
					Object.values(SLOT_TP_GAME_TYPE).find(obj => obj.TP_ID === tpId)
						?.TP_GAME_TYPE ||
					item.tpGameType === TpGameType.All)
		)

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

	const onFavoritesToggle = async (gameObj: IGameData) => {
		const isRemove = Boolean(
			myFavorites
				.split('&')
				.map(string => string.split('#'))
				.find(
					([tpId, gameId]) =>
						String(gameObj.tpId) === tpId && gameObj.gameId === gameId
				)
		)

		if (isRemove) {
			const filteredMyFavoriteStr = myFavorites
				.split('&')
				.map(string => string.split('#'))
				.filter(
					([tpId, gameId]) =>
						!(String(gameObj.tpId) === tpId && gameObj.gameId === gameId)
				)
				.map(([tpId, gameId]) => `${tpId}#${gameId}`)
				.join('&')

			setMyFavorites(trim(filteredMyFavoriteStr))
		} else {
			const newFavorite = `${myFavorites === '' ? '' : '&'}${gameObj.tpId}#${
				gameObj.gameId
			}`
			setMyFavorites(prev => `${prev}${newFavorite}`)
		}
		if (isLogin && !isSetFavoriteGameLoading) {
			await setFavoriteGame({
				providerId: gameObj.tpId,
				gameId: gameObj.gameId,
				isRemove,
			}).unwrap()
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
		const tpGameType =
			find(Object.values(SLOT_TP_GAME_TYPE), { TP_ID: tpId })?.TP_GAME_TYPE ||
			''
		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback }
		)
	}

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

	useEffect(() => {
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
		}
	}, [isFirstRender])

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
			categoryKey === 'myFavorite'
				? removeDuplicates(resultList)
				: ((persistSlotsCategoryData[categoryKey] || []) as IGameData[])
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
				isMaintain: isMaintain({ tpId: gameObj.tpId }),
				isFavorite: isFavorite({ tpId: gameObj.tpId, gameId: gameObj.gameId }),
			}))
		setSlotsGameList(filteredGameList)
		setIsProcess(false)
	}, [categoryKey, queryTpId, searchCategoryText, myFavorites])

	useEffect(() => {
		if (!isProcess) {
			setPageSize(40)
			setIsProcess(true)
		}
	}, [categoryKey, queryTpId, searchCategoryText, slotsGameList.length])

	useEffect(() => {
		// 每次更新25筆資料
		if (isInView) {
			if (pageSize >= slotsGameList.length) {
				return
			}
			setPageSize(prev => prev + 25)
		}
	}, [isInView])

	return {
		slotsGameList: slotsGameList.slice(0, pageSize),
		ref,
		myFavorites,
		onFavoritesToggle,
		onGamePlay,
	}
}

export { useSlotsGameData }
