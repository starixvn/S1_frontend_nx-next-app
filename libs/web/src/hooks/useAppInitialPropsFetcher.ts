import { ENV_COOKIE_NAMES, paths } from '@nx-next-app/constants'
import {
	TStaticFileDomainData,
	checkSignIn,
	getCustProfile,
	getStaticFileDomain,
	verifyToken,
} from '@nx-next-app/data-access'
import { getCookies } from 'cookies-next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { assign, includes, isEmpty } from 'lodash-es'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { UserInfoMemberType, setServerSideHeaders } from '../service'
import { useRedirectMaintain } from './useRedirectMaintain'

export interface AppInitialPropsInterface {
	originLangId: string
	originCurrencyId: number
	originIsSignIn: boolean
	originCookies: TmpCookiesObj
	persistStaticFileDomainData: TStaticFileDomainData
	currentHeaderCookies: string
}

// 轉換 response cookie 格式
// 僅會取 langId 與 currencyId 做轉換
const transferCookies = (values: string[]) => {
	const allowedKeys = [ENV_COOKIE_NAMES.LangId, ENV_COOKIE_NAMES.CurrencyId]

	const result: {
		[key: string]: string
	} = {}

	values.forEach(value => {
		const [keyValue] = value.split(';')
		const [key, val] = keyValue.split('=')
		if (allowedKeys.includes(key)) {
			result[key] = val
		}
	})
	return result
}

const transferCookiesObj = (cookies: TmpCookiesObj): string => {
	return Object.keys(cookies)
		.map(key => `${key}=${cookies[key]}`)
		.join(';')
}

export const useAppInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<AppInitialPropsInterface | undefined> => {
	const { userName, token } = context.query

	// 設定必要的 header
	setServerSideHeaders(context)

	// 來自 middleware 的 cookie , 用來更替用戶 cookie lang
	const middlewareCookies = context.res.getHeader('set-cookie')
	let cookiesFromServer = {}
	if (middlewareCookies) {
		cookiesFromServer = transferCookies(middlewareCookies as string[])
	}
	// 如果有 cookiesFromServer , 則取該 cookie 作為 userInfo 資料 , 給 clientSide 做使用的
	const originCookies = isEmpty(cookiesFromServer)
		? getCookies(context)
		: assign(getCookies(context), cookiesFromServer)

	const originLangId = originCookies[ENV_COOKIE_NAMES.LangId] as string
	const originCurrencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	// 取得當前 currencyId 後執行維護導轉邏輯
	await useRedirectMaintain(context, originCurrencyId)

	// 帶進 api config 使用的 cookie
	const currentHeaderCookies = transferCookiesObj(originCookies)

	const [tokenResult, originIsSignIn, persistStaticFileDomainData] =
		await Promise.all([
			verifyToken({
				userName: userName as string,
				token: token as string,
			}),
			checkSignIn(null, {
				headers: { cookie: currentHeaderCookies },
			}),
			getStaticFileDomain(null, {
				headers: { cookie: currentHeaderCookies },
			}),
		])

	const isValidToken = tokenResult.data.errorCode === 0

	// 如果token驗證成功 需將member site response的token寫回到client side
	if (isValidToken && tokenResult.headers['set-cookie']) {
		context.res.setHeader('Set-Cookie', tokenResult.headers['set-cookie'])
	}

	const isSignInUser = isValidToken || originIsSignIn

	if (
		// * 判斷是否為為直播主帳號，直播主只允許進入home與slots頁面
		isSignInUser &&
		!includes(
			[paths.home.root, paths.slots.root, paths.menu.root],
			String(context.resolvedUrl.split('?')[0])
		)
	) {
		// * getCustProfile 在沒登入的情況下不打 api
		const profile = await getCustProfile(null, {
			headers: { cookie: currentHeaderCookies },
		})
		if (profile?.memberType === UserInfoMemberType.LiveStreaming) {
			// 302 redirect
			context.res.writeHead(302, { Location: paths.home.root })
			context.res.end()
		}
	}

	return {
		originLangId,
		originCurrencyId,
		originIsSignIn: isSignInUser,
		originCookies,
		currentHeaderCookies,
		persistStaticFileDomainData,
	}
}
