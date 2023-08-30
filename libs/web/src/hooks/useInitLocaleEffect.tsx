import { useEffect } from 'react'
import { NextRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { IUserInfoData } from '../service'
import { ENV_COOKIE_NAMES } from '../app/constants/Names'

/**
 *
 * @param router useRouter
 * @param isLogin boolean , 登入與否
 * @param userInfo
 * 初始化登入登出狀態時的語系，需傳入登入狀態以及 user資訊
 */

interface IUseInitLocaleEffectProps {
	router: NextRouter
	userInfo: IUserInfoData
	isLogin: boolean | undefined
}

export const useInitLocaleEffect = ({
	router,
	userInfo,
	isLogin,
}: IUseInitLocaleEffectProps) => {
	const cookieLang = getCookie(ENV_COOKIE_NAMES.LangId) as string

	const initLocale = () => {
		const { pathname, asPath, query, locale } = router
		// 未登入
		if (!isLogin) {
			if (locale === 'default' || locale !== cookieLang) {
				router.push({ pathname, query }, asPath, {
					locale: cookieLang,
				})
			}
		} else {
			// 登入
			const { langId } = userInfo
			if (locale !== langId) {
				router.push({ pathname, query }, asPath, {
					locale: langId,
				})
			}
		}
	}

	useEffect(() => {
		// 到 client side 才做
		if (window !== undefined) {
			initLocale()
		}
	}, [cookieLang, isLogin, userInfo])
}
