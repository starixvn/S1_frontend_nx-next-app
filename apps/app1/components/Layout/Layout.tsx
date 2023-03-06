import { MetaData } from '@nx-next-app/components'
import { ReactNode } from 'react'

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
