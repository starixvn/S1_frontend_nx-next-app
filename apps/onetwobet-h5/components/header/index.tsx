import { HTMLAttributes, ReactNode } from 'react'
import AppDownload from './AppDownload'
import HeaderModule from './HeaderModule'
import { Tag, Tags } from './tabs/index'

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
Header.Tag = Tag
Header.Tags = Tags

export default Header
export type { TagOptionType } from './tabs'
