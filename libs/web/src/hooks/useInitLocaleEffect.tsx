import { ENV_COOKIE_NAMES, paths } from '@nx-next-app/constants'
import { getCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { IUserInfoData } from '../service'

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
				// 因此處切換語系的導轉會中斷原本登入頁導回首頁的行為，故在登入頁切語系時順便導回首頁
				const isLoginPage = pathname === '/login'

				router.push(
					{ pathname, query },
					isLoginPage ? paths.home.root : asPath,
					{ locale: langId }
				)
			}
		}
	}

	useEffect(initLocale, [cookieLang, isLogin, userInfo])
}
