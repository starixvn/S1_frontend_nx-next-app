import { ReactNode } from 'react'
import { Footer, Navbar } from '@nx-next-app/components'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Navbar.No1 />
			<main className='app'>{children}</main>
			<Footer.No1 />
		</>
	)
}

export default Layout
