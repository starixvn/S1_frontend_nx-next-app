import { ParsedUrlQuery } from 'querystring'
import { IncomingHttpHeaders } from 'http'
import { assign, isEmpty } from 'lodash-es'
import { getCookies, setCookies } from 'cookies-next'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { ISEOData } from '../data-access/type'
import {
	checkSignIn,
	getSEOData,
	getLineUserId,
} from 'libs/web/src/data-access/service'
import { LineLoginDirectTypeEnum } from '../service'
import { paths, ENV_COOKIE_NAMES } from '../app/constants'

export interface InitialPropsInterface {
	originIsSignIn: boolean
	originCookies: TmpCookiesObj
	persistSEOData: ISEOData
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

interface IQueryInterface extends ParsedUrlQuery {
	code?: string
	state?: string
	error?: string
	description?: string
	errormessage?: string
}

type CookieType = IncomingHttpHeaders['cookie']

const handleLineDirectCheck = async ({
	query,
	cookie,
	langId,
}: {
	query: IQueryInterface
	cookie: CookieType
	langId?: string
}) => {
	const { code, state, error, description, errormessage } = query
	let redirectPath = ''

	if (code || state || error) {
		let url
		let platform
		let userAgent
		let screen
		let di = ''

		if (typeof window !== 'undefined') {
			url = window.location.origin
			platform = navigator.platform
			userAgent = navigator.userAgent
			screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
			const element = document.getElementById('__di') as HTMLInputElement | null
			di = element?.value as string
		}

		const lineRegisterData = await getLineUserId(
			{
				langId,
				lineLoginResponse: {
					code,
					state,
					error,
					description,
					errormessage,
				},
				loginData: {
					isPersistent: true,
					url,
					platform,
					userAgent,
					screen,
					di,
				},
			},
			{
				headers: { cookie },
			}
		)

		const { type, userId } = lineRegisterData

		if (type === LineLoginDirectTypeEnum.Register) {
			redirectPath = `/${langId}/${paths.join.root}`
			setCookies(ENV_COOKIE_NAMES.LineUserId, userId)
		} else if (type === LineLoginDirectTypeEnum.Login) {
			redirectPath = `/${langId}/${paths.deposit.root}`
		} else if (type === LineLoginDirectTypeEnum.Binding) {
			redirectPath = `/${langId}/${paths.profile.root}`
		}
	}

	return redirectPath
}

export const useServerSideInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<InitialPropsInterface> => {
	const { query } = context
	const middlewareCookies = context.res.getHeader('set-cookie')
	let cookiesFromServer = {}
	if (middlewareCookies) {
		cookiesFromServer = transferCookies(middlewareCookies as string[])
	}
	// 如果有 cookiesFromServer , 則取該 cookie 作為 userInfo 資料 , 給 clientSide 做使用的
	const originCookies = isEmpty(cookiesFromServer)
		? getCookies(context)
		: assign(getCookies(context), cookiesFromServer)

	// 帶進 api config 使用的 cookie
	const currentHeaderCookies = transferCookiesObj(originCookies)

	const originIsSignIn = await checkSignIn(null, {
		headers: { cookie: currentHeaderCookies },
	})

	const persistSEOData = await getSEOData(null, {
		headers: { cookie: currentHeaderCookies },
	})

	const lineRedirectPath = await handleLineDirectCheck({
		query,
		cookie: currentHeaderCookies,
		langId: originCookies[ENV_COOKIE_NAMES.LangId],
	})

	if (lineRedirectPath) {
		// 302 redirect
		context.res.writeHead(302, { Location: lineRedirectPath })
		context.res.end()
	}

	return { originIsSignIn, originCookies, persistSEOData, currentHeaderCookies }
}
