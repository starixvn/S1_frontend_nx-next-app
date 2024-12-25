import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { setAppAuth } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ReactNode, createContext, useState } from 'react'
import {
	InitialPropsInterface,
	useFpsChecks,
	useInitLocaleEffect,
	useOnlineCheckInterval,
	useOptimovePageEvent,
	useSynchronizeCookiesEffect,
} from '../../hooks'
import {
	IAxiosResponse,
	useAppSignInMutation,
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
	notificationSetting: {
		isLoadingUserInfo: boolean
		financeNotification: string | undefined
		soundEffects: string | undefined
		onFinanceNotification?: (
			financeNotification: string | undefined,
			soundEffects: string | undefined
		) => Promise<void>
	}
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
	onAppSignIn: ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => Promise<IAxiosResponse<string> | undefined>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextInterface>(null!)

interface IAuthProviderProps
	extends Pick<InitialPropsInterface, 'originIsSignIn' | 'originCookies'> {
	children: ReactNode
	onFinanceNotification?: (
		financeNotification: string | undefined,
		soundEffects: string | undefined
	) => Promise<void>
}

export const AuthProvider = ({
	children,
	originIsSignIn,
	originCookies,
	onFinanceNotification,
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
		isLoading: isLoadingUserInfo,
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

	/**
	 *  使用者資訊中，通知訊息的設定
	 *  @financeNotification 是否顯示通知訊息
	 *  @soundEffects 是否播放通知訊息音效  */
	const { financeNotification, soundEffects } = originUserInfo

	const [signIn] = useSignInMutation()

	const [signOut] = useSignOutMutation()

	const [appSignIn] = useAppSignInMutation()

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

		setAuth({ isLogin: true })
		setAppAuth('login')
		localStorage.setItem('fpsNeededToCheck', 'true')
	}

	const onSignOut = async () => {
		await signOut(null).unwrap()
		onResetAuth()
		localStorage.removeItem('myFavorites')
		localStorage.removeItem('fpsNeededToCheck')
	}

	const onResetAuth = () => {
		setAppAuth('logout')
		setAuth({ isLogin: undefined })
	}

	const onAppSignIn = async ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => {
		if (typeof window === undefined) return

		const url = window.location.origin
		const { platform, userAgent } = navigator
		const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
		let di = ''
		let bi = ''
		let detecasAnalysis = ''
		let sessionKey = ''
		let token = ''

		// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
		di = (document.getElementById('__di') as any)?.value
		bi = (document.getElementById('__bi') as any)?.value
		detecasAnalysis = (document.getElementById('detecas-analysis') as any)
			?.value
		sessionKey = (document.getElementById('__fdi') as any)?.value // * fdi = sessionKey
		token = (document.getElementById('__tk') as any)?.value // * 默認為 empty

		return appSignIn({
			userName,
			userpwd: password,
			isPersistent: false,
			url,
			platform,
			userAgent,
			screen,
			FPSRequest: {
				di,
				bi,
				detecasAnalysis,
				sessionKey,
				token,
			},
		}).unwrap()
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
	// * FPS 檢查
	useFpsChecks({
		isLogin: auth.isLogin,
	})
	// * 輪詢確認使用者是否保持線上狀態
	useOnlineCheckInterval({
		isLogin: auth.isLogin,
		onResetAuth,
		notificationSetting: {
			financeNotification,
			soundEffects,
			onFinanceNotification,
		},
	})

	useOptimovePageEvent(auth.isLogin, userInfo)

	const value: AuthContextInterface = {
		auth,
		userInfo,
		dbHost,
		notificationSetting: {
			isLoadingUserInfo,
			financeNotification,
			soundEffects,
			onFinanceNotification,
		},
		onCheckSignIn,
		onSignIn,
		onSignOut,
		onResetAuth,
		onAppSignIn,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
