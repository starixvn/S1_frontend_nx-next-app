import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useWalletAllowed } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { includes, isArray } from 'lodash-es'
import { useRouter } from 'next/router'

interface UseLeftMenuProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

/**
 * 自定義 hook 用於處理 LeftMenu 的邏輯。
 * @param {IWithdrawalSetting[]} withdrawalBlockSetting - 提款設定數據。
 * @returns {Object} 菜單列和菜單點擊事件函數。 */
export const useLeftMenu = ({ withdrawalBlockSetting }: UseLeftMenuProps) => {
	const { pathname: routerPath, push } = useRouter()

	const { LEFT_MENU_DATA } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const {
		cardAllowed: { bankCardAllowed, cryptoCardAllowed },
	} = useWalletAllowed({ withdrawalBlockSetting })

	/** 菜單列表 */
	const menuList = Object.values(LEFT_MENU_DATA).map(
		({ displayKey, subMenu }) => {
			/**  過濾子菜單，根據貨幣 ID 和允許的提款方式 */
			const submenuList = Object.values(subMenu)
				.filter(({ pathname, allowCurrencies }) => {
					let isShow = true
					if (isArray(allowCurrencies))
						isShow = includes(allowCurrencies, currencyId)

					//* 與 api 的 withdrawal payment 同步
					if (pathname === paths.bankInfo.root) isShow = bankCardAllowed
					if (pathname === paths.cryptoWallet.root) isShow = cryptoCardAllowed

					return isShow
				})
				.map(({ displayKey, pathname, allowCurrencies }) => {
					const matchPath = routerPath.match(pathname)
					const isMatchCurrency = isArray(allowCurrencies)
						? includes(allowCurrencies, currencyId)
						: !allowCurrencies

					return {
						displayKey,
						pathname,
						isActive: !!matchPath,
						isVisible: isMatchCurrency,
					}
				})

			return {
				displayKey,
				submenuList,
			}
		}
	)
	/**
	 * 處理菜單點擊，如果選擇的路徑不同於當前路徑，則導至新的路徑。
	 * @param {string} pathname - 新的路徑。 */
	const handleMenuClick = (pathname: string) => {
		if (routerPath !== pathname) {
			push(pathname)
		}
	}

	return {
		menuList,
		handleMenuClick,
	}
}
