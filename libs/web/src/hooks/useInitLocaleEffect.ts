import { NextRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'
import { LocalStorageNames } from '@nx-next-app/constants'

export const useInitLocaleEffect = () => {
	const [localLocale, setLocalLocale] = useLocalStorage<string | undefined>(
		LocalStorageNames.Locale,
		undefined
	)

	const initLocale = (router: NextRouter) => {
		const { pathname, asPath, query, locale } = router
		if (locale === 'default') {
			// 把預設改成 default , 假如是預設 沒有 local值時取 default , 有 local值時取local
			if (!localLocale) {
				router.push({ pathname, query }, asPath, {
					locale: 'en',
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

	return { initLocale }
}
