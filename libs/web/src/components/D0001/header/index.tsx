import { FC, ReactNode } from 'react'

import Function from './Function'
import Logo from './Logo'
import { HeaderContainer } from './styles'

interface IHeaderProps {
	children: ReactNode
}

interface IHeaderInterface extends FC<IHeaderProps> {
	Logo: typeof Logo
	Function: typeof Function
}

const Header: IHeaderInterface = ({ children }: IHeaderProps) => {
	return <HeaderContainer id='header'>{children}</HeaderContainer>
}

Header.Logo = Logo
Header.Function = Function

export default Header
