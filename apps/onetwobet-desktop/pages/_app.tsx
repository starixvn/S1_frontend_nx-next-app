import { UIProvider } from '@nx-next-app/components/config-provider'
import { StaticDataProvider } from '@nx-next-app/data-access'
import { store } from '@nx-next-app/store'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'

import { LANG_TO_CURRENCY } from '@apps/onetwobet-desktop/middleware'
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
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY_DESKTOP,
	VIP_CLUB_IMAGES,
} from '@nx-next-app/site/onetwobet'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/css/font.css'
import '../styles/css/style.css'
import '../styles/css/swiper.css'

const {
	LiveChatScript,
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
			<NextNProgress showOnShallow color='#C01D21' />
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
			<OperaPixelCodeScript />
			<ActivatorScript />

			{/* // TODO: <SEO /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
