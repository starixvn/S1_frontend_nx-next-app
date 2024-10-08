import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { setAppAuth } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ReactNode, createContext, useEffect, useState } from 'react'
import {
	InitialPropsInterface,
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
	toastSetting: {
		financeNotification: string | undefined
		soundEffects: string | undefined
		isLoadingUserInfo: boolean
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
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextInterface>(null!)

interface IAuthProviderProps
	extends Pick<InitialPropsInterface, 'originIsSignIn' | 'originCookies'> {
	children: ReactNode
	onDepositOrWithdrawalSuccessful?: (
		financeNotification: string | undefined,
		soundEffects: string | undefined
	) => Promise<void>
}

export const AuthProvider = ({
	children,
	originIsSignIn,
	originCookies,
	onDepositOrWithdrawalSuccessful,
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
	 *  使用者資訊中，吐司訊息的設定
	 *  @financeNotification 是否顯示吐司訊息
	 *  @soundEffects 是否播放吐司訊息音效  */
	const { financeNotification, soundEffects } = originUserInfo

	const [signIn] = useSignInMutation()

	const [signOut] = useSignOutMutation()

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
		let di = ''
		let bi = ''
		let detecasAnalysis = ''
		let sessionKey = ''
		let token = ''

		// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
		di = (document.getElementById('__di') as HTMLInputElement)?.value
		bi = (document.getElementById('__bi') as HTMLInputElement)?.value
		detecasAnalysis = (
			document.getElementById('detecas-analysis') as HTMLInputElement
		)?.value
		sessionKey = (document.getElementById('__fdi') as HTMLInputElement)?.value // * fdi = sessionKey
		token = (document.getElementById('__tk') as HTMLInputElement)?.value // * 默認為 empty

		await signIn({
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
	useOnlineCheckInterval({
		isLogin: auth.isLogin,
		onResetAuth,
		toastSetting: {
			financeNotification,
			soundEffects,
			onDepositOrWithdrawalSuccessful,
		},
	})

	useOptimovePageEvent(auth.isLogin, userInfo)

	// ====== useEffect ======

	/**
	 * 當使用者登入時，檢查存/提款通知並觸發對應的吐司訊息。
	 * @onDepositOrWithdrawalSuccessful 是由各平台自定義的回調函數，用於設置吐司通知樣式（不同平台可能有不同樣式，也可能不提供此功能）。
	 * 如果該回調存在且使用者已登入，則檢查使用者的存/提款成功記錄，並依據回調函數發送對應的吐司訊息。 */
	useEffect(() => {
		// 資料尚未載入完成或是使用者未登入不處理
		if (isLoadingUserInfo || !auth.isLogin) return
		const checkNotification = async () => {
			if (onDepositOrWithdrawalSuccessful) {
				await onDepositOrWithdrawalSuccessful(financeNotification, soundEffects)
			}
		}
		checkNotification()
	}, [isLoadingUserInfo])

	const value: AuthContextInterface = {
		auth,
		userInfo,
		dbHost,
		toastSetting: { financeNotification, soundEffects, isLoadingUserInfo },
		onCheckSignIn,
		onSignIn,
		onSignOut,
		onResetAuth,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
