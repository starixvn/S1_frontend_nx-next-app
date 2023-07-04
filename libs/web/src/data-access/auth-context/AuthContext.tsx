import { createContext, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
	useGetUserInfoQuery,
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '../../service'
import {
	InitialPropsInterface,
	useInitLocaleEffect,
	useOnlineCheckInterval,
	useSynchronizeCookiesEffect,
} from '../../hooks'
import { IUserInfoData } from '../../service/accountStrict/type'

export interface AuthContextInterface {
	auth: { isLogin: boolean | undefined }
	userInfo: IUserInfoData
	onSignIn: ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => void
	onSignOut: () => Promise<void>
	onCheckSignIn: () => void
	onResetAuth: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextInterface>(null!)

interface IAuthProviderProps
	extends Pick<InitialPropsInterface, 'originIsSignIn' | 'originCookies'> {
	children: ReactNode
}

export const AuthProvider = ({
	children,
	originIsSignIn,
	originCookies,
}: IAuthProviderProps) => {
	const router = useRouter()
	const { t } = useTranslation()
	const [auth, setAuth] = useState<{ isLogin: boolean | undefined }>({
		isLogin: originIsSignIn,
	})

	const [checkSignInQuery] = useLazyCheckSignInQuery()

	// * 未登入時使用 cookie value , 此值因有 middleware 處理，不可能為 undefined
	const {
		data: {
			data: originUserInfo = {
				langId: originCookies[
					`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`
				] as string,
				currencyId: Number(
					originCookies[`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`]
				),
				userName: 'guest',
			},
		} = {},
	} = useGetUserInfoQuery(null, {
		// * 沒有登入時不打
		skip: !auth.isLogin,
		// * 重登帳號時重撈 api
		refetchOnMountOrArgChange: true,
	})

	const userInfo = {
		...originUserInfo,
		currencyName: t(`Label_General_Currency_${originUserInfo.currencyId}`),
	}

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
		onResetAuth()
		localStorage.removeItem('myFavorites')
	}

	const onResetAuth = () => {
		setAuth({ isLogin: undefined })
	}

	// 處理登入狀態同步使用者 cookie, 未登入不做同步
	useSynchronizeCookiesEffect(userInfo)
	// 處理路由導轉
	useInitLocaleEffect({ router, userInfo, isLogin: auth.isLogin })

	// * 輪詢確認使用者是否保持線上狀態
	useOnlineCheckInterval({ isLogin: auth.isLogin, onResetAuth })

	const value: AuthContextInterface = {
		auth,
		userInfo,
		onCheckSignIn,
		onSignIn,
		onSignOut,
		onResetAuth,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
