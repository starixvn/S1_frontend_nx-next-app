import Head from 'next/head'
import { AppProps } from 'next/app'
import { store } from '@nx-next-app/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { useInitLocaleEffect } from '@nx-next-app/hooks'
import { appWithTranslation } from 'next-i18next'
import { Nova88 } from '@nx-next-app/features'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

const { LANG_DATA } = Nova88.Data

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useInitLocaleEffect(router)

	return (
		<>
			<Head>
				<title>Welcome to nova88-desktop!</title>
			</Head>
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
				<ConfigProvider langData={LANG_DATA}>
					<Component {...pageProps} />
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default appWithTranslation(CustomApp)
