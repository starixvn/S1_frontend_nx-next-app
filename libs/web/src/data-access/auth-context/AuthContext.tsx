import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { setAppAuth } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useState } from 'react'
import {
	InitialPropsInterface,
	useDepositWithdrawTracker,
	useFpsChecks,
	useInitLocaleEffect,
	useOnlineCheckInterval,
	useOptimovePageEvent,
	useSynchronizeCookiesEffect,
} from '../../hooks'
import {
	useGetUserInfoQuery,
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '../../service'
import { IUserInfoData } from '../../service/accountStrict/type'

export interface AuthContextInterface {
	auth: { isLogin: boolean | undefined }
	userInfo: IUserInfoData
	dbHost: string
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
				langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
				currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
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

	const { checkDepositSuccessful } = useDepositWithdrawTracker()

	const onCheckSignIn = async () => {
		try {
			const { errorCode } = await checkSignInQuery(null).unwrap()

			if (errorCode === 0) {
				setAuth({ isLogin: true })
				setAppAuth('login')
			}
		} catch (error) {
			setAuth({ isLogin: false })
			setAppAuth('logout')
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

		/** 登入時確認使用者是否有存款成功，如果有成功，觸發 MetaPixelTracker 事件（ 臉書通知 ）通知市場 */
		await checkDepositSuccessful()
		setAuth({ isLogin: true })
		setAppAuth('login')
	}

	const onSignOut = async () => {
		await signOut(null).unwrap()
		onResetAuth()
		localStorage.removeItem('myFavorites')
	}

	const onResetAuth = () => {
		setAppAuth('logout')
		setAuth({ isLogin: undefined })
	}

	const host = typeof window === 'undefined' ? null : window.location.origin
	// * DB 路徑，根據生產模式與開發模式給予不同的路徑
	const dbHost =
		(process.env.NODE_ENV === 'production'
			? host
			: process.env['NEXT_PUBLIC_ENV_DB_HOST']) || ''

	// * 處理登入狀態同步使用者 cookie, 未登入不做同步
	useSynchronizeCookiesEffect(userInfo)
	// * 處理路由導轉
	useInitLocaleEffect({ router, userInfo, isLogin: auth.isLogin })
	// * 輪詢確認使用者是否保持線上狀態
	useOnlineCheckInterval({ isLogin: auth.isLogin, onResetAuth })
	// * FPS 檢查
	useFpsChecks({ isLogin: auth.isLogin })

	useOptimovePageEvent(auth.isLogin, userInfo)

	const value: AuthContextInterface = {
		auth,
		userInfo,
		dbHost,
		onCheckSignIn,
		onSignIn,
		onSignOut,
		onResetAuth,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
