import Head from 'next/head'
import { AppProps } from 'next/app'
import { store } from '@nx-next-app/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from '@nx-next-app/components/D0001'
import { appWithTranslation } from 'next-i18next'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'
import { LANG_DATA, VIP_CLUB_IMAGES } from '../data'

dayjs.extend(localizedFormat)

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to nova88-desktop!</title>
			</Head>
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
				<ConfigProvider langData={LANG_DATA} VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}>
					<Component {...pageProps} />
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default appWithTranslation(CustomApp)
