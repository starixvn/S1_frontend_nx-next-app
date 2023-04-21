import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

const AuthRequire = ({ children }: { children: JSX.Element }) => {
	const { pathname } = useRouter()
	const { onCheckSignIn, auth } = useAuth()

	useEffect(() => {
		// * wip feat: 實作登入狀態監聽
		// eslint-disable-next-line no-console
		console.log(auth)
		onCheckSignIn()
	}, [pathname])

	return children
}

export { AuthRequire }
