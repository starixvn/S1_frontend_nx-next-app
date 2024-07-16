import { useEffect } from 'react'
import { setCookie } from 'cookies-next'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IUserInfoData } from '../service'

declare global {
	interface Window {
		gtag: any
	}
}
/**
 *
 * 傳入 userInfo , 使其在登入後自動同步正確 userInfo Cookie，目前僅會同步 langId 與 currencyId，可在於此 effect 內增加
 * 增加 gtag userId 傳送
 */

export const useSynchronizeCookiesEffect = (userInfo: IUserInfoData) => {
	// 登入後將 cookie 得值設為該帳號資訊
	// 不能寫在 signIn 的原因為，該 useGetUserInfoQuery 觸發時間與會在 setAuth 異動 isLogin 後才會去取資料
	// 故直接判斷 userName 若非 "guest" 時做設定，實務上登入後便不會一直異動該值
	useEffect(() => {
		if (userInfo.userName !== 'guest') {
			const { langId, currencyId, custId } = userInfo
			setCookie(ENV_COOKIE_NAMES.LangId, langId)
			setCookie(ENV_COOKIE_NAMES.CurrencyId, currencyId)

			// PRD 環境且有載入才執行
			if (
				process.env['NEXT_PUBLIC_ENV'] === 'PRD' &&
				typeof window.gtag === 'function'
			) {
				window.gtag('set', { user_id: custId })
			}
		}
	}, [userInfo.userName])
}
