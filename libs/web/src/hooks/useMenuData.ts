import { getIsTpMaintain } from '@nx-next-app/utils'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import {
	useGetCustTpGameTypeSettingQuery,
	useGetLobbyHeaderQuery,
	type ISubMenuData,
} from '@nx-next-app/service'
import { memberTypeEnum } from 'libs/web/src/app/constants/userInfo'

export interface IAddLiveStreamingProps {
	isTpMaintain: boolean
	noPlay?: boolean
	noShow?: boolean
}

export interface ILobbyHeaderData {
	lobbyCategoryId: number
	data: Array<ISubMenuData & IAddLiveStreamingProps>
}

/**
 * * useMenuData 的顯示邏輯，共用於品牌、裝置
 */

const useMenuData = () => {
	const {
		userInfo: { memberType, currencyId },
	} = useAuth()
	const { tpMaintainList } = useGlobalData()

	const { data: lobbyHeaderList = [], isError } = useGetLobbyHeaderQuery(
		{
			// TODO 因 Yashbet 目前沒有資料，之後需改回來
			siteId: 1,
			// siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
			currencyId,
		},
		{
			selectFromResult: response => {
				const { data, isError } = response
				return { data: data?.data, isError }
			},
		}
	)

	const { data: { data: tpGameTypeSettingList = [] } = {} } =
		useGetCustTpGameTypeSettingQuery(null, {
			skip: memberType !== memberTypeEnum.liveHost || memberType === undefined,
		})

	const getMenu = (): ILobbyHeaderData[] => {
		return lobbyHeaderList.map(mainMenuItem => {
			const { lobbyCategoryId, data = [] } = mainMenuItem || {}

			const mergedSubMenus = data.map(subMenuItem => {
				// * 插入直播主
				const newSettingItem = tpGameTypeSettingList.find(
					settingItem =>
						settingItem.gameType === subMenuItem.tpGameType &&
						settingItem.tpId === subMenuItem.tpId
				)
				// * 插入 maintenance
				const isTpMaintain = getIsTpMaintain({
					tpMaintainList,
					tpId: subMenuItem.tpId,
					tpGameType: subMenuItem.tpGameType,
				})

				const { noPlay, noShow } = newSettingItem || {}

				// * 非直播主
				if (!newSettingItem) {
					return { ...subMenuItem, isTpMaintain }
				}

				return {
					...subMenuItem,
					noPlay,
					noShow,
					isTpMaintain,
				}
			})

			return { lobbyCategoryId, data: mergedSubMenus }
		})
	}

	return { LobberHeaderMenuList: getMenu(), isLobbyHeaderError: isError }
}

export { useMenuData }
