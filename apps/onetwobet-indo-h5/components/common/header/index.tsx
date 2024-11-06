import { HTMLAttributes, ReactNode } from 'react'
import HeaderModule from './HeaderModule'
import { Tag, Tags } from './tabs'

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

Header.HeaderModule = HeaderModule
Header.Tag = Tag
Header.Tags = Tags

export default Header
export type { TagOptionType } from './tabs'
