import { useEffect } from 'react'
import { NextRouter } from 'next/router'
import { getCookie } from 'cookies-next'

/**
 *
 * @param router useRouter
 * 初始化登入登出狀態時的語系
 */
export const useInitLocaleEffect = (router: NextRouter) => {
	const cookieLang = getCookie(
		`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`
	) as string

	const initLocale = () => {
		const { pathname, asPath, query, locale } = router

		if (locale === 'default' || locale !== cookieLang) {
			router.push({ pathname, query }, asPath, {
				locale: cookieLang,
			})
		}
	}

	useEffect(() => {
		// 到 client side 才做
		if (window !== undefined) {
			initLocale()
		}
	}, [cookieLang])
}
