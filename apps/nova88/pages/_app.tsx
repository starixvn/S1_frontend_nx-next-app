import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { initLocaleEffect } from '@nx-next-app/hooks'
import { ConfigProvider } from '@nx-next-app/components/D0001'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	initLocaleEffect(router, 'en')

	return (
		<>
			<Head>
				<title>Welcome to nova88!</title>
			</Head>

			<Provider store={store}>
				<ConfigProvider>
					<Component {...pageProps} />
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default appWithTranslation(CustomApp)
