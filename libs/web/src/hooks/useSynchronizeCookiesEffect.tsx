import { useEffect } from 'react'
import { setCookies } from 'cookies-next'
import { IUserInfoData } from '../service'

/**
 *
 * 傳入 userInfo , 使其在登入後自動同步正確 userInfo Cookie，目前僅會同步 langId 與 currencyId，可在於此 effect 內增加
 */

export const useSynchronizeCookiesEffect = (userInfo: IUserInfoData) => {
	// 登入後將 cookie 得值設為該帳號資訊
	// 不能寫在 signIn 的原因為，該 useGetUserInfoQuery 觸發時間與會在 setAuth 異動 isLogin 後才會去取資料
	// 故直接判斷 userName 若非 "guest" 時做設定，實務上登入後便不會一直異動該值
	useEffect(() => {
		if (userInfo.userName !== 'guest') {
			const { langId, currencyId } = userInfo
			setCookies(`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`, langId)
			setCookies(
				`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
				currencyId
			)
		}
	}, [userInfo.userName])
}
