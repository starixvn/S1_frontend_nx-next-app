import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { store } from '@nx-next-app/store'
import { initLocaleEffect } from '@nx-next-app/hooks'
import { Layout } from '@nx-next-app/components/D0001'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	initLocaleEffect(router, 'en')

	return (
		<>
			{/* <Head>
				<title>Welcome to nova88!</title>
			</Head> */}
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}

export default appWithTranslation(CustomApp)
