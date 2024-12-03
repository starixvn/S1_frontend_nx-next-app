import { HeaderContainer } from "@nx-next-app/components/H0001/header/styles";
import { HTMLAttributes, ReactNode } from "react";

import AppDownload from "./AppDownload";
import HeaderModule from "./HeaderModule";
import { Tag, Tags } from "./tabs";

interface IHeaderProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
}

const Header = ({ children, ...props }: IHeaderProps) => {
	return (
		<HeaderContainer id='header' {...props}>
			{children}
		</HeaderContainer>
	)
}

Header.AppDownLoad = AppDownload
Header.HeaderModule = HeaderModule
Header.Tag = Tag
Header.Tags = Tags

export default Header
export type { TagOptionType } from './tabs'
export { useAppDownload } from './useAppDownload'
