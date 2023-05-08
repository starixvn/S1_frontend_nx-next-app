import { createContext, ReactNode, useEffect, useState } from 'react'
import { getCookie, setCookies } from 'cookies-next'
import {
	useGetUserInfoQuery,
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '../../service'
import { IUserInfoData } from '../../service/accountStrict/type'

export interface AuthContextInterface {
	auth: { isLogin: boolean | undefined }
	userInfo:
		| IUserInfoData
		| Pick<IUserInfoData, 'currencyId' | 'langId' | 'userName'>
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
	const [auth, setAuth] = useState<{ isLogin: boolean | undefined }>({
		isLogin: originIsSignIn,
	})

	const [checkSignInQuery] = useLazyCheckSignInQuery()

	// 未登入時使用 cookie value , 此值因有 middleware 處理，不可能為 undefined
	const {
		data: {
			data: userInfo = {
				langId: getCookie(
					`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`
				) as string,
				currencyId: Number(
					getCookie(`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`)
				),
				userName: 'guest',
			},
		} = {},
	} = useGetUserInfoQuery(null, {
		// * 沒有登入時不打
		skip: !auth.isLogin,
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

	// 登入後將 cookie 得值設為該帳號資訊
	// 不能寫在 signIn 的原因為，該 useGetUserInfoQuery 觸發時間與會在 setAuth 異動 isLogin 後才會去取資料
	// 故直接判斷 userName 若非 "guest" 時做設定，實務上登入後便不會一直異動該值
	useEffect(() => {
		if (userInfo.userName !== 'guest') {
			const { langId, currencyId } = userInfo
			setCookies(`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`, langId)
			setCookies(
				`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
				currencyId
			)
		}
	}, [userInfo.userName])

	const onSignOut = async () => {
		await signOut(null).unwrap()
		setAuth({ isLogin: undefined })
	}

	const value: AuthContextInterface = {
		auth,
		userInfo,
		onCheckSignIn,
		onSignIn,
		onSignOut,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
