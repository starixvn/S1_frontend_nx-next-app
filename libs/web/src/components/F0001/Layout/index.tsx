import { ReactNode } from 'react'
import MetaData from '../MetaData'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<MetaData />
			<main className='app'>{children}</main>
			footer
		</>
	)
}

export default Layout
