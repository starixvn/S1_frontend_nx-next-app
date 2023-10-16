import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'
import { ThirdPartyJS } from '@nx-next-app/features/F0001/desktop'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import {
	META_DATA,
	ALLOWED_CURRENCIES,
	FEATURE_BONUS,
	LANG_GROUPS,
	PASSWORD_REGEX,
	SLOT_TP_GAME_TYPE,
	TERMS_CONDITIONS,
	USERNAME_REGEX,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	REALNAME_REGEX,
	MENU_DATA,
	BANNER_IMAGE_LIST,
	LEFT_MENU_DATA,
} from '@nx-next-app/site/leobet'

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
	LiveChatScript,
	IovationScript,
	PlayTechScript,
	GTMScript,
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
						SLOT_TP_GAME_TYPE={SLOT_TP_GAME_TYPE}
						LANG_GROUPS={LANG_GROUPS}
						CURRENCY_TO_TIMEZONE={CURRENCY_TO_TIMEZONE}
						VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}
						VIP_EVENT_CURRENCIES_LIMITATION_INFO={
							VIP_EVENT_CURRENCIES_LIMITATION_INFO
						}
						VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY={
							VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY
						}
						FEATURE_BONUS={FEATURE_BONUS}
						TERMS_CONDITIONS={TERMS_CONDITIONS}
						USERNAME_REGEX={USERNAME_REGEX}
						PASSWORD_REGEX={PASSWORD_REGEX}
						REALNAME_REGEX={REALNAME_REGEX}
						BANNER_IMAGE_LIST={BANNER_IMAGE_LIST}
						LEFT_MENU_DATA={LEFT_MENU_DATA}
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
			<GoogleTagManagerScript />
		</>
	)
}

export default appWithTranslation(CustomApp)
