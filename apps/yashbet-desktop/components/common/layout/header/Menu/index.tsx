import { useMenu } from '@nx-next-app/features/F0006/hooks'
import MainMenu from './MainMenu'

const Menu = () => {
	const { menuList = [], onMenuOpen, isLobbyHeaderError } = useMenu()

	return (
		<MainMenu
			menuList={menuList}
			onMenuOpen={onMenuOpen}
			isLobbyHeaderError={isLobbyHeaderError}
		/>
	)
}

export default Menu
