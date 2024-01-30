import { ParsedUrlQuery } from 'querystring'
import { assign, includes, isEmpty } from 'lodash-es'
import { getCookies } from 'cookies-next'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import {
	checkSignIn,
	getCustProfile,
	getSEOData,
} from '@nx-next-app/data-access'

import { ISEOData } from '../data-access/type'
import { UserInfoMemberType } from '../service'
import { paths, ENV_COOKIE_NAMES } from '../app/constants'
import { useRedirectDevice } from './useRedirectDevice'
import { useRedirectMaintain } from './useRedirectMaintain'

export interface InitialPropsInterface {
	originLangId: string
	originCurrencyId: number
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

export const useServerSideInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<InitialPropsInterface | undefined> => {
	// 裝置導轉邏輯
	useRedirectDevice(context)

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

	const originIsSignIn = await checkSignIn(null, {
		headers: { cookie: currentHeaderCookies },
	})

	const persistSEOData = await getSEOData(null, {
		headers: { cookie: currentHeaderCookies },
	})

	if (
		// * 判斷是否為為直播主帳號，直播主只允許進入home與slots頁面
		originIsSignIn &&
		!includes(
			[paths.home.root, paths.slots.root],
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
		originIsSignIn,
		originCookies,
		persistSEOData,
		currentHeaderCookies,
	}
}
