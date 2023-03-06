import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { MetaData } from '@nx-next-app/components'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
	getLocalStorage,
	LocalStorageEnum,
	setLocalStorage,
} from '@nx-next-app/utils'
import Layout from '../components/Layout/Layout'

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const { pathname, asPath, query } = router

	useEffect(() => {
		// 語系初始化
		const init = () => {
			const localLocale = getLocalStorage(LocalStorageEnum.Locale)
			if (!localLocale || router.locale !== router.defaultLocale) {
				// localStorage 沒資料 或 當前 router 有帶指定 locale ，直接紀錄
				setLocalStorage(LocalStorageEnum.Locale, router.locale)
			} else if (router.locale === router.defaultLocale) {
				// locale === defaultLocale  代表沒帶語系，取 localStorage 內的 locale
				router.push({ pathname, query }, asPath, {
					locale: localLocale,
				})
			}
		}

		// 到 client side 才做
		if (window !== undefined) {
			init()
		}
	}, [])

	return (
		<>
			<MetaData />

			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}

// https://github.com/i18next/next-i18next#unserializable-configs
export default appWithTranslation(CustomApp)
