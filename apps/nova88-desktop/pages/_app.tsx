import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import NextNProgress from 'nextjs-progressbar'
import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { CURRENCY_TO_TIMEZONE, PRODUCTS } from '@nx-next-app/constants'
import {
	ALLOWED_CURRENCIES,
	FEATURE_BONUS,
	LANG_GROUPS,
	MENU_DATA,
	META_DATA,
	TERMS_CONDITIONS,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY_DESKTOP,
	VIP_CLUB_IMAGES,
	BANNER_IMAGE_LIST,
	LEFT_MENU_DATA,
	LIVE_CHAT_ID_BY_LANG_ID,
	ThirdPartyJS,
	LANG_TO_CURRENCY,
} from '@nx-next-app/site/nova88'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const {
	LiveChatScript,
	IovationScript,
	PlayTechScript,
	JackpotsScript,
	PixelCodeScript,
	ActivatorScript,
	GTMScript,
} = ThirdPartyJS

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress showOnShallow color='#2b66e6' />
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
				<UIProvider>
					<StaticDataProvider
						MENU_DATA={MENU_DATA}
						META_DATA={META_DATA}
						PRODUCTS={PRODUCTS}
						ALLOWED_CURRENCIES={ALLOWED_CURRENCIES}
						LANG_GROUPS={LANG_GROUPS}
						CURRENCY_TO_TIMEZONE={CURRENCY_TO_TIMEZONE}
						VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}
						VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY={
							VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY_DESKTOP
						}
						FEATURE_BONUS={FEATURE_BONUS}
						TERMS_CONDITIONS={TERMS_CONDITIONS}
						BANNER_IMAGE_LIST={BANNER_IMAGE_LIST}
						LIVE_CHAT_ID_BY_LANG_ID={LIVE_CHAT_ID_BY_LANG_ID}
						LEFT_MENU_DATA={LEFT_MENU_DATA}
						LANG_TO_CURRENCY={LANG_TO_CURRENCY}
					>
						<Component {...pageProps} />
					</StaticDataProvider>
				</UIProvider>
			</Provider>

			<LiveChatScript />
			<IovationScript />
			<PlayTechScript />
			<GTMScript />
			<JackpotsScript />
			{/* <GoogleTagManagerScript /> */}
			<PixelCodeScript />
			<ActivatorScript />

			{/* // TODO: <SEO /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
