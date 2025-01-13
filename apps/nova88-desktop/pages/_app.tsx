import 'react-datepicker/dist/react-datepicker.css'

import { LANG_TO_CURRENCY } from '@apps/nova88-desktop/middleware'
import { UIProvider } from '@nx-next-app/components/config-provider'
import { CURRENCY_TO_TIMEZONE, PRODUCTS } from '@nx-next-app/constants'
import { StaticDataProvider } from '@nx-next-app/data-access'
import {
	ALLOWED_CURRENCIES,
	BANNER_IMAGE_LIST,
	FEATURE_BONUS,
	LANG_GROUPS,
	LEFT_MENU_DATA,
	LIVE_CHAT_ID_BY_LANG_ID,
	MENU_DATA,
	TERMS_CONDITIONS,
	ThirdPartyJS,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY_DESKTOP,
	VIP_CLUB_IMAGES,
} from '@nx-next-app/site/nova88'
import { store } from '@nx-next-app/store'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../../../themes/nsDemo/global.styled'
import { theme } from '../../../themes/nsDemo/theme'

import { GlobalStylesTheme1 } from '../../../themes/themes-1/global.styled'
import { theme1 } from '../../../themes/themes-1/theme'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

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
	// const loadGlobalStyle = () => {
	// 	switch (process.env['THEME_NSDEMO']) {
	// 		case '1':
	// 			return <GlobalStylesTheme1 />
	// 		default:
	// 			return <GlobalStyles />
	// 	}
	// }

	// const loadThemeStyle = () => {
	// 	switch (process.env['THEME_NSDEMO']) {
	// 		case '1':
	// 			return theme1
	// 		default:
	// 			return theme
	// 	}
	// }

	return (
		<>
			<ThemeProvider
				theme={process.env['THEME_NSDEMO'] === 'default' ? theme : theme1}
			>
				{process.env['THEME_NSDEMO'] === '1' && <GlobalStylesTheme1 />}
				{process.env['THEME_NSDEMO'] === 'default' && <GlobalStyles />}

				<NextNProgress showOnShallow color='#2b66e6' />
				<Provider store={store}>
					{/* 提供 Component 狀態管理 */}
					<UIProvider>
						<StaticDataProvider
							MENU_DATA={MENU_DATA}
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
			</ThemeProvider>

			{/*  TODO: ThirdPartyJS
			<LiveChatScript />
			<IovationScript />
			<PlayTechScript />
			<GTMScript />
			<JackpotsScript />
			<OperaPixelCodeScript /> */}
			<ActivatorScript />

			{/* <GoogleTagManagerScript /> */}

			{/* // TODO: <SEO /> */}
		</>
	)
}

export default appWithTranslation(CustomApp)
