import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import {
	META_DATA,
	ALLOWED_CURRENCIES,
	FEATURE_BONUS,
	LANG_GROUPS,
	TERMS_CONDITIONS,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
	MENU_DATA,
	BANNER_IMAGE_LIST,
	LEFT_MENU_DATA,
	LIVE_CHAT_ID_BY_LANG_ID,
	ThirdPartyJS,
} from '@nx-next-app/site/yashbet'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/css/style-dark.css'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { CURRENCY_TO_TIMEZONE, PRODUCTS } from '@nx-next-app/constants'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const {
	IovationScript,
	PlayTechScript,
	JackpotsScript,
	GoogleTagManagerScript,
} = ThirdPartyJS

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
			<IovationScript />
			<PlayTechScript />
			{/* <GTMScript /> */}
			<JackpotsScript />
			<GoogleTagManagerScript />
		</>
	)
}

export default appWithTranslation(CustomApp)
