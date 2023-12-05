import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'
import { ThirdPartyJS } from '@nx-next-app/features/F0002/desktop'
import NextNProgress from 'nextjs-progressbar'

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
	PASSWORD_REGEX,
	REALNAME_REGEX,
	SLOT_TP_GAME_TYPE,
	TERMS_CONDITIONS,
	USERNAME_REGEX,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	BANNER_IMAGE_LIST,
	LEFT_MENU_DATA,
} from '@nx-next-app/site/leobet'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

const {
	LiveChatScript,
	IovationScript,
	PlayTechScript,
	GTMScript,
	JackpotsScript,
	GoogleTagManagerScript,
} = ThirdPartyJS

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress color='#a56a28' />
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
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

			{/* // TODO: <SEO /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
