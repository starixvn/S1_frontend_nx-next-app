import { FC, ReactNode } from 'react'
import Logo from './Logo'
import Function from './Function'
import Menu from './Menu'

interface IHeaderProps {
	children: ReactNode
}

interface IHeaderInterface extends FC<IHeaderProps> {
	Logo: typeof Logo
	Function: typeof Function
	Menu: typeof Menu
}

const Header: IHeaderInterface = ({ children }: IHeaderProps) => {
	return (
		<header id='header'>
			<div className='header'>{children}</div>
		</header>
	)
}

Header.Logo = Logo
Header.Function = Function
Header.Menu = Menu

export default Header
