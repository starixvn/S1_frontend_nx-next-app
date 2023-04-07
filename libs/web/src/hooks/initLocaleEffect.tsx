import { useEffect } from 'react'
import { NextRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'
import { LocalStorageNames } from '../app/constants/localStorageNames'

/**
 *
 * @param router useRouter
 * @param defaultLang 默認語系
 * 初始語系
 */
export const initLocaleEffect = (router: NextRouter, defaultLang: string) => {
	const [localLocale, setLocalLocale] = useLocalStorage<string | undefined>(
		LocalStorageNames.Locale,
		undefined
	)

	const initLocale = () => {
		const { pathname, asPath, query, locale } = router

		if (locale === 'default') {
			// 把預設改成 default , 假如是預設 沒有 local值時取 default , 有 local值時取local
			if (!localLocale) {
				router.push({ pathname, query }, asPath, {
					locale: defaultLang,
				})
			} else {
				router.push({ pathname, query }, asPath, {
					locale: localLocale,
				})
			}
		} else {
			// 有帶 locale 則直接改成該 locale
			setLocalLocale(locale)
		}
	}

	useEffect(() => {
		// 到 client side 才做
		if (window !== undefined) {
			initLocale()
		}
	}, [])
}
