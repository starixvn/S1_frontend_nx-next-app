import { createContext, ReactNode, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '../../service'

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
	const { t } = useTranslation()
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
	}

	const onSignOut = async () => {
		await signOut(null).unwrap()
		setAuth({ isLogin: undefined })
	}

	const value: AuthContextInterface = {
		auth,
		onCheckSignIn,
		onSignIn,
		onSignOut,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
