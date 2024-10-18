import { checkMaintain } from '@nx-next-app/data-access'
import { GetServerSidePropsContext } from 'next'

// maintain 專用的對應表
const CURRENCY_TO_LANG_KEY: { [key: number]: string } = {
	2: 'en',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	45: 'ko',
	61: 'hi',
	72: 'kh',
	74: 'bd',
	82: 'br',
}
export const useRedirectMaintain = async (
	context: GetServerSidePropsContext,
	currencyId: number
) => {
	// production 才執行這個 hooks (💡12Bet想測試的話可以先把這行註解)
	if (process.env.NODE_ENV !== 'production') return

	const isInMaintain = await checkMaintain()
	const { req, res } = context
	const reqDomain = req.headers.host
	const langKey = CURRENCY_TO_LANG_KEY[currencyId] ?? 'en'
	const mobileCName = `${process.env['NEXT_PUBLIC_M_CNAME']}.`
	const desktopCName = `${process.env['NEXT_PUBLIC_PC_CNAME']}.`

	if (isInMaintain && reqDomain) {
		// 無論如何都導到桌機
		const targetDomain = reqDomain?.replace(mobileCName, desktopCName)

		// TODO: 12Bet尚未有PRD環境，domain先和nova共用，看之後PRD domain出來再怎麼改
		// 且，目前只有cs版本的underMaintenance，已放進apps/onetwobet-desktop/public/underMaintenance/cs/index.html，之後有其他語系靜態檔，再記得加進語系資料夾
		const maintainUrl = `https://${targetDomain}/underMaintenance/${langKey}/index.html`
		res.writeHead(302, {
			Location: maintainUrl,
		})
		res.end()
	}
}
