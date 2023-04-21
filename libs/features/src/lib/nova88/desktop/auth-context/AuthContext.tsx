import { useConfig } from '@nx-next-app/components/D0001'
import {
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '@nx-next-app/service'

import { createContext, ReactNode, useState } from 'react'

export interface AuthContextInterface {
	auth: { isLogin: boolean | undefined }
	onSignIn: ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => void
	onSignOut: () => void
	onCheckSignIn: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextInterface>(null!)

export const AuthProvider = ({
	children,
	originIsSignIn,
}: {
	children: ReactNode
	originIsSignIn: boolean
}) => {
	const { modal } = useConfig()
	const [checkSignInQuery] = useLazyCheckSignInQuery()
	const [auth, setAuth] = useState<{ isLogin: boolean | undefined }>({
		isLogin: originIsSignIn,
	})
	const [signIn] = useSignInMutation()
	const [signOut] = useSignOutMutation()

	const onCheckSignIn = async () => {
		try {
			const { errorCode } = await checkSignInQuery(null).unwrap()

			if (errorCode === 0) {
				setAuth({ isLogin: true })
			}
		} catch (error) {
			setAuth({ isLogin: false })
		}
	}

	const onSignIn = async ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => {
		if (typeof window === undefined) return

		const url = window.location.origin
		const { platform } = navigator
		const { userAgent } = navigator
		const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`

		try {
			await signIn({
				userName,
				userpwd: password,
				isPersistent: false,
				url,
				platform,
				userAgent,
				screen,
			}).unwrap()

			setAuth({ isLogin: true })
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onSignOut = async () => {
		try {
			await signOut(null).unwrap()
			setAuth({ isLogin: undefined })
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const value: AuthContextInterface = {
		auth,
		onCheckSignIn,
		onSignIn,
		onSignOut,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
