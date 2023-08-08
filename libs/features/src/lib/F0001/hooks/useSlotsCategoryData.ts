import { useEffect, useState } from 'react'
import { filter, find, random } from 'lodash-es'
import { useRouter } from 'next/router'
import { IGameData, ISlotsGameData } from 'libs/web/src/service/gameApi/type'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/features/F0001/hooks/useMenu'

const useCategoryData = ({
	persistSlotsCategoryData,
	loginCallback,
}: {
	persistSlotsCategoryData: ISlotsGameData
	loginCallback: () => void
}) => {
	const {
		query: { tpId: queryTpId },
	} = useRouter()
	const {
		auth: { isLogin },
	} = useAuth()
	const { onEnterSlotsPage } = useMenu()
	const { SLOT_TP_GAME_TYPE } = useStaticData()

	const [searchCategoryText, setSearchCategoryText] = useState('')

	const [activeCategoryKey, setActiveCategoryKey] =
		useState<keyof ISlotsGameData>('all')

	const [categoryKeys, setCategoryKeys] = useState(
		Object.keys(persistSlotsCategoryData)
	)

	const onSearchCategoryTextChange = (value: string) => {
		setSearchCategoryText(value)
	}

	const onGamePlay = ({ tpId, gameId, playFree }: IGameData) => {
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
				loginCallback()
			}
		} else {
			setActiveCategoryKey(value as keyof ISlotsGameData)
		}
	}

	useEffect(() => {
		// * 遊戲類型filter
		// * 原filterCategoryList
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

	return {
		categoryKeys,
		activeCategoryKey,
		searchCategoryText,
		onSearchCategoryTextChange,
		onCategoryChange,
	}
}
export { useCategoryData }
