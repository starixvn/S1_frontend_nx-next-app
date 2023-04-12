import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { store } from '@nx-next-app/store'
import { initLocaleEffect } from '@nx-next-app/hooks'
import { Layout, MetaData } from '@nx-next-app/components/D0001'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	initLocaleEffect(router, 'en')

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
