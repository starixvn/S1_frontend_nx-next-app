import { GetServerSidePropsContext } from 'next'
import * as process from 'process'

export const useRedirectDevice = (context: GetServerSidePropsContext) => {
	// Production only executes this hooks
	if (process.env.NODE_ENV !== 'production') return

	const { req, locale } = context
	const reqDomain = req.headers.host
	const userAgent = req.headers['user-agent']
	const isMobile = userAgent && userAgent.toLowerCase().includes('mobile')

	const getCname = (envVar: string) =>
		process.env[envVar] ? `${process.env[envVar]}` : ''

	const mobileCName = getCname('NEXT_PUBLIC_M_CNAME')
	const desktopCName = getCname('NEXT_PUBLIC_PC_CNAME')

	let redirectUrl: string | undefined
	let requestUrl: string | undefined

	if (locale === 'default') {
		requestUrl = req.url
	} else {
		requestUrl = `/${locale}${req.url}`
	}

	if (reqDomain && userAgent) {
		// If there is no CNAME, the desktop Cname will be added by default.
		if (
			!reqDomain.startsWith(desktopCName) &&
			!reqDomain.startsWith(mobileCName)
		) {
			const initDomain = `${desktopCName}${reqDomain}`
			redirectUrl = `https://${initDomain}${requestUrl}`
		}

		let targetDomain: string

		if (isMobile) {
			// Mobile phone to mobile phone CName
			// If the same, don’t change it
			targetDomain = reqDomain.startsWith(mobileCName)
				? reqDomain
				: reqDomain.replace(desktopCName, mobileCName)
		} else {
			// Desktop to desktop computer CName

			targetDomain = reqDomain.startsWith(mobileCName)
				? reqDomain.replace(mobileCName, desktopCName)
				: reqDomain
		}

		// If different from the current one, return the forwarding link.
		if (targetDomain !== reqDomain) {
			redirectUrl = `https://${targetDomain}${requestUrl}`
		}
	}

	if (redirectUrl) {
		// 302 redirect
		context.res.writeHead(302, { Location: redirectUrl })
		context.res.end()
	}
}
