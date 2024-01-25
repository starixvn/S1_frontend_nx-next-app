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
	MENU_DATA,
	LANG_GROUPS,
	FEATURE_BONUS,
	LEFT_MENU_DATA,
	VIP_CLUB_IMAGES,
	TERMS_CONDITIONS,
	BANNER_IMAGE_LIST,
	GET_AFFILIATE_LINK,
	ALLOWED_CURRENCIES,
	LIVE_CHAT_ID_BY_LANG_ID,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	ThirdPartyJS,
	LANG_TO_CURRENCY,
} from '@nx-next-app/site/nova88'

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
	GTMScript,
	JackpotsScript,
	GoogleTagManagerScript,
	PixelCodeScript,
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
			<IovationScript />
			<PlayTechScript />
			<GTMScript />
			<JackpotsScript />
			<GoogleTagManagerScript />
			<PixelCodeScript />
		</>
	)
}

export default appWithTranslation(CustomApp)
