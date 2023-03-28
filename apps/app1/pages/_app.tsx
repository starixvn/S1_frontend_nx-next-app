import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { MetaData } from '@nx-next-app/components'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { initLocaleEffect } from '@nx-next-app/hooks'
import Layout from '../components/Layout/Layout'

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
