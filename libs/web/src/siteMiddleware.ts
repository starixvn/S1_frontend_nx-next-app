import { NextRequest, NextResponse } from 'next/server'
import { ENV_COOKIE_NAMES } from './app/constants/Names'

interface ISiteMiddleware {
	request: NextRequest
	config: {
		defaultLocale: string
		defaultCurrency: number
		langToCurrency: { [key: string]: number }
	}
}

// 此 middleware 僅處理未初始化的 cookie，再進入 'default' 時會給予固定 defaultLang 內的 locale
// 若透過指定語系進入，則會給予指定語系的 locale

export const siteMiddleware = ({ request, config }: ISiteMiddleware) => {
	const { defaultCurrency, defaultLocale, langToCurrency } = config
	const response = NextResponse.next()
	const { locale } = request.nextUrl
	const hasLangId = request.cookies.has(ENV_COOKIE_NAMES.LangId)
	const cookieLang = request.cookies.get(ENV_COOKIE_NAMES.LangId)

	// 沒有 cookie 資料，且無指定語系
	if (!hasLangId) {
		if (locale === 'default') {
			response.cookies.set(ENV_COOKIE_NAMES.LangId, defaultLocale)
			response.cookies.set(ENV_COOKIE_NAMES.CurrencyId, String(defaultCurrency))
		}
	}
	// 有指定語系，且與 cookie 不相符，將 cookie 替換至該語系
	if (locale !== 'default' && locale !== String(cookieLang)) {
		response.cookies.set(ENV_COOKIE_NAMES.LangId, locale)
		response.cookies.set(
			ENV_COOKIE_NAMES.CurrencyId,
			String(langToCurrency[locale])
		)
	}
	return response
}
