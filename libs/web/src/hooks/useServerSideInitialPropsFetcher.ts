import { getCookies } from 'cookies-next'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { checkSignIn } from '../data-access/siteApi'

export interface InitialPropsInterface {
	originIsSignIn: boolean
	originCookies: TmpCookiesObj
}

export const useServerSideInitialPropsFetcher = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<InitialPropsInterface> => {
	const { cookie } = context.req.headers
	const originIsSignIn = await checkSignIn(null, { headers: { cookie } })
	const originCookies = getCookies(context)

	return { originIsSignIn, originCookies }
}
