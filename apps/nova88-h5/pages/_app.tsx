import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { LANG_TO_CURRENCY } from '@apps/nova88-h5/middleware'
import {
	ALLOWED_CURRENCIES,
	BANNER_IMAGE_LIST,
	FEATURE_BONUS,
	GET_AFFILIATE_LINK,
	LANG_GROUPS,
	LEFT_MENU_DATA,
	LIVE_CHAT_ID_BY_LANG_ID,
	MENU_DATA,
	TERMS_CONDITIONS,
	ThirdPartyJS,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
} from '@nx-next-app/site/nova88'

import 'react-datepicker/dist/react-datepicker.css'
// import '../styles/css/style-dark.css'
// import '../styles/css/style.css'
// import '../styles/css/swiper.css'
// import '../styles/css/font.css'
import { CURRENCY_TO_TIMEZONE, PRODUCTS } from '@nx-next-app/constants'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Head from 'next/head'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

const {
	IovationScript,
	PlayTechScript,
	JackpotsScript,
	OperaPixelCodeScript,
	ActivatorScript,
	GTMScript,
} = ThirdPartyJS

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0' />
			</Head>
			<Provider store={store}>
				<UIProvider>
					<StaticDataProvider
						MENU_DATA={MENU_DATA}
						PRODUCTS={PRODUCTS}
						ALLOWED_CURRENCIES={ALLOWED_CURRENCIES}
						LANG_GROUPS={LANG_GROUPS}
						CURRENCY_TO_TIMEZONE={CURRENCY_TO_TIMEZONE}
						VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}
						VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY={
							VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY
						}
						FEATURE_BONUS={FEATURE_BONUS}
						TERMS_CONDITIONS={TERMS_CONDITIONS}
						GET_AFFILIATE_LINK={GET_AFFILIATE_LINK}
						BANNER_IMAGE_LIST={BANNER_IMAGE_LIST}
						LEFT_MENU_DATA={LEFT_MENU_DATA}
						LIVE_CHAT_ID_BY_LANG_ID={LIVE_CHAT_ID_BY_LANG_ID}
						LANG_TO_CURRENCY={LANG_TO_CURRENCY}
					>
						<Component {...pageProps} />
					</StaticDataProvider>
				</UIProvider>
			</Provider>
			{/* 手機版 liveChat Layout 會蓋住 more button, footer 下方的 button */}
			{/* 是指定路徑的，所以沒引入這個 script 也不影響 */}
			{/* <LiveChatScript /> */}
			{/* <IovationScript />
			<PlayTechScript />
			<GTMScript />
			<JackpotsScript />
			<OperaPixelCodeScript /> */}
			<ActivatorScript />
		</>
	)
}

export default appWithTranslation(CustomApp)
