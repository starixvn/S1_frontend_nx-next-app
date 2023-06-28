import { HTMLAttributes, ReactNode } from 'react'
import AppDownload from './AppDownload'
import HeaderModule from './HeaderModule'

interface IHeaderProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
}

const Header = ({ children, ...props }: IHeaderProps) => {
	return (
		<header id='header' {...props}>
			{children}
		</header>
	)
}

Header.AppDownLoad = AppDownload
Header.HeaderModule = HeaderModule

export default Header
