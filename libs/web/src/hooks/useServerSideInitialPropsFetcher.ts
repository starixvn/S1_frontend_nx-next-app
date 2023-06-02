import { getCookies } from 'cookies-next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { assign, isEmpty } from 'lodash-es'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { checkSignIn, getSEOData } from '../data-access/siteApi'
import { ISEOData } from '../data-access/type'

export interface InitialPropsInterface {
	originIsSignIn: boolean
	originCookies: TmpCookiesObj
	persistSEOData: ISEOData
}

// 轉換 response cookie 格式
// 僅會取 langId 與 currencyId 做轉換
const transferCookies = (values: string[]) => {
	const allowedKeys = [
		`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`,
		`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
	]

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

export const useServerSideInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<InitialPropsInterface> => {
	const { cookie } = context.req.headers
	const middlewareCookies = context.res.getHeader('set-cookie')

	let cookiesFromServer = {}

	if (middlewareCookies) {
		cookiesFromServer = transferCookies(middlewareCookies as string[])
	}
	const originIsSignIn = await checkSignIn(null, { headers: { cookie } })

	const persistSEOData = await getSEOData(null, { headers: { cookie } })

	// 如果有 cookiesFromServer , 則取該 cookie 作為 userInfo 資料
	const originCookies = isEmpty(cookiesFromServer)
		? getCookies(context)
		: assign(getCookies(context), cookiesFromServer)

	return { originIsSignIn, originCookies, persistSEOData }
}
