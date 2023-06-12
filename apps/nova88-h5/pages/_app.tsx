import { AppProps } from 'next/app'
import { store } from '@nx-next-app/store'
import { Provider } from 'react-redux'

import { appWithTranslation } from 'next-i18next'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import '../styles/css/style-dark.css'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

dayjs.extend(localizedFormat)

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default appWithTranslation(CustomApp)
