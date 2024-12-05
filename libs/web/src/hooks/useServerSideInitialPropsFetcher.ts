import { ENV_COOKIE_NAMES, paths } from '@nx-next-app/constants'
import {
	ISEOData,
	TStaticFileDomainData,
	checkSignIn,
	getCustProfile,
	getSEOData,
	getStaticFileDomain,
} from '@nx-next-app/data-access'
import { getCookies } from 'cookies-next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { assign, includes, isEmpty } from 'lodash-es'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { UserInfoMemberType, setServerSideHeaders } from '../service'
import { useRedirectDevice } from './useRedirectDevice'
import { useRedirectMaintain } from 'libs/web/src/hooks/useRedirectMaintain'

export interface InitialPropsInterface {
	originLangId: string
	originCurrencyId: number
	originIsSignIn: boolean
	originCookies: TmpCookiesObj
	persistSEOData: ISEOData
	persistStaticFileDomainData: TStaticFileDomainData
	currentHeaderCookies: string
}

// Convert response cookie format
// Only langId and currencyId will be converted
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

export const useServerSideInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<InitialPropsInterface | undefined> => {
	// Device redirection logic
	useRedirectDevice(context)

	// Setting required header
	setServerSideHeaders(context)

	// Cookie from middleware, used to replace user cookie lang
	const middlewareCookies = context.res.getHeader('set-cookie')
	let cookiesFromServer = {}
	if (middlewareCookies) {
		cookiesFromServer = transferCookies(middlewareCookies as string[])
	}
	// If there are cookiesFromServer, take the cookie as userInfo data and use it for clientSide
	const originCookies = isEmpty(cookiesFromServer)
		? getCookies(context)
		: assign(getCookies(context), cookiesFromServer)

	const originLangId = originCookies[ENV_COOKIE_NAMES.LangId] as string
	const originCurrencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	// After obtaining the current currencyId, execute maintenance diversion logic
	// TODO
	await useRedirectMaintain(context, originCurrencyId)

	// Bring in the cookies used by api config
	const currentHeaderCookies = transferCookiesObj(originCookies)

	const [originIsSignIn, persistSEOData, persistStaticFileDomainData] =
		await Promise.all([
			checkSignIn(null, {
				headers: { cookie: currentHeaderCookies },
			}),
			getSEOData(null, {
				headers: { cookie: currentHeaderCookies },
			}),
			getStaticFileDomain(null, {
				headers: { cookie: currentHeaderCookies },
			}),
		])

	if (
		// * Determine whether it is the live broadcast main account. The live broadcast owner is only allowed to enter the home and slots pages.
		originIsSignIn &&
		!includes(
			[paths.home.root, paths.slots.root, paths.setting.root],
			String(context.resolvedUrl.split('?')[0])
		)
	) {
		// * getCustProfile does not open the api without logging in
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
		originIsSignIn,
		originCookies,
		persistSEOData,
		persistStaticFileDomainData,
		currentHeaderCookies,
	}
}
