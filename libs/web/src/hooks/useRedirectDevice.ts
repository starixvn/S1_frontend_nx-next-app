import { GetServerSidePropsContext } from 'next'
import * as process from 'process'

export const useRedirectDevice = (context: GetServerSidePropsContext) => {
	// production 才執行這個 hooks
	if (process.env.NODE_ENV !== 'production') return

	const { req } = context
	const reqDomain = req.headers.host
	const userAgent = req.headers['user-agent']
	const isMobile = userAgent && userAgent.toLowerCase().includes('mobile')
	const mobileCName = `${process.env['NEXT_PUBLIC_M_CNAME']}.`
	const desktopCName = `${process.env['NEXT_PUBLIC_PC_CNAME']}.`

	let redirectUrl: string | undefined

	if (reqDomain && userAgent) {
		// 如果沒前墜 CNAME 預設先加上桌機 Cname
		if (
			!reqDomain.startsWith(desktopCName) &&
			!reqDomain.startsWith(mobileCName)
		) {
			const initDomain = `${desktopCName}${reqDomain}`
			redirectUrl = `https://${initDomain}${req.url}`
		}

		let targetDomain: string

		if (isMobile) {
			// 手機改手機 CName
			// 相同則不改
			targetDomain = reqDomain.startsWith(mobileCName)
				? reqDomain
				: reqDomain.replace(desktopCName, mobileCName)
		} else {
			// 桌機改桌機 CName
			targetDomain = reqDomain.startsWith(desktopCName)
				? reqDomain
				: reqDomain.replace(mobileCName, desktopCName)
		}

		// 如果跟當前不同則回傳導轉連結
		if (targetDomain !== reqDomain) {
			redirectUrl = `https://${targetDomain}${req.url}`
		}
	}

	if (redirectUrl) {
		// 302 redirect
		context.res.writeHead(302, { Location: redirectUrl })
		context.res.end()
	}
}
