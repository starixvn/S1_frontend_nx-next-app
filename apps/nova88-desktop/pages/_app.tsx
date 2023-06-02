import Head from 'next/head'
import { AppProps } from 'next/app'
import { store } from '@nx-next-app/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from '@nx-next-app/components/D0001'
import { appWithTranslation } from 'next-i18next'
import { F0001 } from '@nx-next-app/features'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'
import '../styles/css/datePicker.css'
import { LANG_DATA, VIP_CLUB_IMAGES } from '../data'

const {
	LiveChatScript,
	IovationScript,
	PlayTechScript,
	GTMScript,
	JackpotsScript,
	GoogleTagManagerScript,
} = F0001.Desktop.ThirdPartyJS

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

			<LiveChatScript />
			<IovationScript />
			<PlayTechScript />
			<GTMScript />
			<JackpotsScript />
			<GoogleTagManagerScript />

			{/* // TODO: <SEO /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
