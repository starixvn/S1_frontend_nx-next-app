import { MenuKeyEnum } from '@nx-next-app/types'
import { useState } from 'react'
import MainMenu from './MainMenu'
import SubMenu from './SubMenu'

const Menu = () => {
	// 之後如果會有幣別遮蔽 saba sports 再調整 defaultMenuKey
	// const defaultMenuKey =
	// 	currencyId === CurrenciesEnum.USD || currencyId === CurrenciesEnum.CNY
	// 		? MenuKeyEnum.Casino
	// 		: MenuKeyEnum.Sports

	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | undefined>(
		MenuKeyEnum.Sports
	)
	return (
		<>
			<MainMenu menuKey={menuKey} setMenuKey={setMenuKey} />
			<SubMenu menuKey={menuKey} />
		</>
	)
}

export default Menu
