import { useRouter } from 'next/router'
import {
	IViewedGameData,
	useGetRecentlyViewedQuery,
} from '@nx-next-app/service'
import { useMenu } from '@nx-next-app/features/F0006/hooks/useMenu'
import { useAuth } from '@nx-next-app/data-access'
import { MENU_DATA, type ISubMenu } from '@nx-next-app/site/yashbet'
import { CategoryEnum } from '@nx-next-app/features/F0006/types'
import { DeviceTypeEnum, MenuActionTypeEnum } from '@nx-next-app/types'
import { PRODUCTS } from '@nx-next-app/constants'

interface IRecentlyViewReturnType extends IViewedGameData, ISubMenu {}

const useRecentlyViewed = () => {
	const { push } = useRouter()
	const { onEnterPage, onGoToGame } = useMenu()
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()
	const { onEnterSlotsPage } = useMenu()
	const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

	const { data: { data: recentlyViewData } = {} } = useGetRecentlyViewedQuery(
		{
			currencyId,
			deviceType,
		},
		{
			skip: !isLogin,
		}
	)
	const { recentlyViewedList = [] } = recentlyViewData ?? {}

	const mergedProducts = (): Array<IRecentlyViewReturnType> => {
		const allDefProducts = MENU_DATA.flatMap(
			mainMenuItem => mainMenuItem?.subMenu
		)

		return recentlyViewedList.map(gameItem => {
			const defMenuProduct = allDefProducts.find(
				defGameItem => defGameItem.tpGameIdNo === gameItem.tpGameIdNo
			)
			return { ...gameItem, ...(defMenuProduct as ISubMenu) }
		})
	}

	const onCLickRecentlyViewGame = (
		recentlyViewedGameItem: IRecentlyViewReturnType,
		{
			loginCallback,
			underMaintenanceCallback,
			messageCallBack,
		}: {
			loginCallback: () => void
			// * 手機沒有 maintenance popup
			underMaintenanceCallback?: () => void
			messageCallBack?: (message: string) => void
		}
	) => {
		if (!recentlyViewedGameItem) return

		const {
			tpId,
			tpGameType,
			gameId,
			betType,
			isMaintain,
			categoryId,
			pathname,
			query,
			h5,
			desktop,
		} = recentlyViewedGameItem || {}

		const { menuActionType, hasLobby } =
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? desktop || {}
				: h5 || {}

		if (isMaintain && !!underMaintenanceCallback) underMaintenanceCallback()
		if (isMaintain) return

		// * RecentlyView 的導轉方式比較特別，不能用 MENU_DATA 的定義檔 menuActionType 去判斷
		// * Jira 4839 的需求 點擊直接進入該遊戲(Slot 是直接進遊戲) 若有大廳則導轉到大廳
		switch (true) {
			case categoryId === CategoryEnum.SLOTS: {
				onEnterSlotsPage(
					{
						tpId: String(tpId),
						tpGameType: String(tpGameType),
						gameId,
						isFree: false,
					},
					{ loginCallback }
				)

				break
			}
			case hasLobby: {
				push({
					pathname,
					query,
				})
				break
			}

			case menuActionType === MenuActionTypeEnum.UseGoToGame: {
				onGoToGame(
					{
						tpId,
						langId,
						inputs: {
							gameId,
							fun: '0',
							gameType: tpId === PRODUCTS.NewPlayTechSlot.tpId ? 'slot' : '',
							tpGameType,
						},
					},
					{ loginCallback, messageCallBack }
				)
				break
			}

			default: {
				onEnterPage(
					{
						langId,
						tpId,
						gameId,
						tpGameType,
						bettype: betType,
					},
					{ loginCallback }
				)
			}
		}
	}

	return { recentlyViewedList: mergedProducts(), onCLickRecentlyViewGame }
}

export default useRecentlyViewed
