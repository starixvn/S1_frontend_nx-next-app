import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { store } from '@nx-next-app/store'

import { MetaData } from '@nx-next-app/components/D0001'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<MetaData />

			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	)
}

// https://github.com/i18next/next-i18next#unserializable-configs
export default appWithTranslation(CustomApp)
