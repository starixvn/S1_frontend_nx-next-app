import { checkMaintain } from '@nx-next-app/data-access'
import { GetServerSidePropsContext } from 'next'

// maintain 專用的對應表
const CURRENCY_TO_LANG_KEY: { [key: number]: string } = {
	2: 'en',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	61: 'hi',
	72: 'kh',
	74: 'bd',
}
export const useRedirectMaintain = async (
	context: GetServerSidePropsContext,
	currencyId: number
) => {
	// production 才執行這個 hooks
	if (process.env.NODE_ENV !== 'production') return

	const isInMaintain = await checkMaintain()
	const { req, res } = context
	const reqDomain = req.headers.host
	const langKey = CURRENCY_TO_LANG_KEY[currencyId] ?? 'en'
	const mobileCName = `${process.env['NEXT_PUBLIC_M_CNAME']}.`
	const desktopCName = `${process.env['NEXT_PUBLIC_PC_CNAME']}.`

	if (isInMaintain && reqDomain) {
		const targetDomain = reqDomain.replace(mobileCName, desktopCName)
		const maintainUrl = `https://${targetDomain}/underMaintenance/${langKey}/index.html`
		res.writeHead(302, { Location: maintainUrl })
		res.end()
	}
}
