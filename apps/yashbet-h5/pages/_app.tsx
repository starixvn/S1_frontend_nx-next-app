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

import { CURRENCY_TO_TIMEZONE, PRODUCTS } from '@nx-next-app/constants'
import {
	ALLOWED_CURRENCIES,
	BANNER_IMAGE_LIST,
	FEATURE_BONUS,
	LANG_GROUPS,
	LEFT_MENU_DATA,
	LIVE_CHAT_ID_BY_LANG_ID,
	MENU_DATA,
	META_DATA,
	TERMS_CONDITIONS,
	ThirdPartyJS,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
} from '@nx-next-app/site/yashbet'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/css/font.scss'
import '../styles/css/style.scss'
import '../styles/css/swiper.css'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

const { PlayTechScript, JackpotsScript } = ThirdPartyJS

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
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
							VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY
						}
						FEATURE_BONUS={FEATURE_BONUS}
						TERMS_CONDITIONS={TERMS_CONDITIONS}
						BANNER_IMAGE_LIST={BANNER_IMAGE_LIST}
						LIVE_CHAT_ID_BY_LANG_ID={LIVE_CHAT_ID_BY_LANG_ID}
						LEFT_MENU_DATA={LEFT_MENU_DATA}
					>
						<Component {...pageProps} />
					</StaticDataProvider>
				</UIProvider>
			</Provider>
			{/* 手機版 liveChat Layout 會蓋住 more button, footer 下方的 button */}
			{/* 是指定路徑的，所以沒引入這個 script 也不影響 */}
			{/* <LiveChatScript /> */}
			<PlayTechScript />
			{/* <GTMScript /> */}
			<JackpotsScript />
			{/* <GoogleTagManagerScript /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
