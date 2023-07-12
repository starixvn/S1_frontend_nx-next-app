/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'

import { IMenuData } from '@nx-next-app/features/F0001/types'
import { MenuKeyEnum } from '@nx-next-app/types'
import { assign, cloneDeep, find, includes, isArray } from 'lodash-es'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useStaticData } from '../data-access/static-data-context'

/**
 * * useMenuData 的顯示邏輯，共用於品牌、裝置
 */
const useMenuData = <T extends IMenuData<any>>() => {
	const {
		auth: { isLogin },
		userInfo: { currencyId },
	} = useAuth()
	const { MENU_DATA } = useStaticData()
	const { tpMaintainList, productTpIds } = useGlobalData()

	const getMenu = () => {
		const menuData = cloneDeep(MENU_DATA as T)
		const result = {} as T

		Object.keys(menuData).forEach(key => {
			const newMenuData = menuData[key as MenuKeyEnum]

			// * 使用者的幣別不符合該 Menu 開放的幣別，不顯示 Menu 選項
			if (
				(isArray(newMenuData.allowCurrencies) &&
					!includes(newMenuData.allowCurrencies, currencyId)) ||
				!newMenuData.allowCurrencies
			) {
				return
			}

			// * 對 SubMenu 做一些規則上的處理
			const { subMenuSort, subMenuAllowCurrenciesWithAuth } =
				menuData[key as MenuKeyEnum]
			let newSubMenu = menuData[key as MenuKeyEnum]?.subMenu

			if (newSubMenu) {
				// * 規則1: 根據 allowCurrencies 過濾不開放的遊戲
				newSubMenu = newSubMenu.filter(item => {
					if (item.allowCurrencies) {
						if (subMenuAllowCurrenciesWithAuth && isLogin) {
							return includes(item.allowCurrencies, currencyId)
						}

						if (!subMenuAllowCurrenciesWithAuth) {
							return includes(item.allowCurrencies, currencyId)
						}
					}

					// * 如果沒有帶 allowCurrencies ，預設為顯示
					return true
				})

				// * 規則2: 有登入時，透過 tpIds 過濾不開放的遊戲，讓後端 api 可控制是否顯示遊戲
				if (productTpIds) {
					newSubMenu = newSubMenu.filter(({ product }) =>
						includes(productTpIds, product?.TP_ID)
					)
				}

				// * 規則3: 排序，根據 subMenuSort 的 productKey 做排序
				if (subMenuSort && subMenuSort[currencyId]) {
					newSubMenu.sort((a, b) => {
						let indexA = subMenuSort[currencyId].indexOf(a.productKey)
						indexA = indexA === -1 ? 999 : indexA // * 不在排序內的選項排到最後面
						let indexB = subMenuSort[currencyId].indexOf(b.productKey)
						indexB = indexA === -1 ? 999 : indexB // * 不在排序內的選項排到最後面

						return indexA - indexB
					})
				}

				// * 規則4: 最後將排序或已過濾出來的產品加入是否維護中參數，在 Menu 的 SubMenu 加入 isTpMaintain 參數
				newSubMenu = newSubMenu.map(item => {
					const tpMaintain = find(tpMaintainList, { tpId: item.product?.TP_ID })

					const isTpMaintain =
						tpMaintain &&
						(tpMaintain?.tpGameType === 0 || // * 0:代表全部
							tpMaintain?.tpGameType === item.product?.TP_GAME_TYPE)

					return { ...item, isTpMaintain }
				})

				assign(newMenuData, { subMenu: newSubMenu })
			}

			assign(result, { [key]: newMenuData })
		})

		// eslint-disable-next-line no-console
		console.log('update menu')
		return result as T
	}

	// * 防止重複渲染菜單:在渲染邏輯上 hover 的動畫會用 setState 實作，這最讓 menu 元件不停 re-render
	return useMemo(
		() => getMenu(),
		[currencyId, isLogin, tpMaintainList, productTpIds]
	)
}

export { useMenuData }
