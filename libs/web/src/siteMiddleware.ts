/* eslint-disable no-console */
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { NextRequest, NextResponse } from 'next/server'

interface ISiteMiddleware {
	request: NextRequest
	config: {
		defaultLocale: string
		defaultCurrency: number
		langToCurrency: { [key: string]: number }
	}
}

// * middleware 使用之資源定義在該位置
// * 僅限使用在 middleware 中，middleware 此類 server worker 僅支援 fetch 原生操作
// export const getIpCountry = async (originHeader: Headers): Promise<any> => {
// 	const newHeaders = new Headers(originHeader)
// 	newHeaders.set('ai-host', `${process.env['NEXT_PUBLIC_REFERER_HOST']}`)

// 	return (
// 		fetch(
// 			new URL(
// 				`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/api/Site/GetIpCountry`
// 			),
// 			{
// 				headers: newHeaders,
// 				method: 'POST',
// 			}
// 		)
// 			.then(res => res.json())
// 			.then(response => {
// 				return {
// 					countryCode: response?.data?.code,
// 					isAccess: response?.data?.isAccess,
// 				}
// 			})
// 			// * 加入 catch 防止第一次渲染時 (cookie中沒有 langId、currencyId) 會因 api 錯誤引發畫面錯誤
// 			.catch(error => {
// 				console.error({ getIpCountry: error })
// 			})
// 	)
// }

// * middleware 使用之資源定義在該位置
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const countryCodeMap: {
	[countryCode: string]: {
		currencyId: number
		langId: string
	}
} = {
	TH: { currencyId: CurrenciesEnum.THB, langId: 'th' },
	MY: { currencyId: CurrenciesEnum.MYR, langId: 'my' },
	VN: { currencyId: CurrenciesEnum.VND, langId: 'vn' },
	ID: { currencyId: CurrenciesEnum.IDR, langId: 'id' },
	IN: { currencyId: CurrenciesEnum.INR, langId: 'hi' },
	BDT: { currencyId: CurrenciesEnum.BDT, langId: 'bd' },
	BD: { currencyId: CurrenciesEnum.BDT, langId: 'bd' },
	KH: { currencyId: CurrenciesEnum.KHM, langId: 'kh' },
	CNY_CH: { currencyId: CurrenciesEnum.CNY, langId: 'cs' },
	USD: { currencyId: CurrenciesEnum.USD, langId: 'en' },
	CS: { currencyId: CurrenciesEnum.USD, langId: 'en' },
	KR: { currencyId: CurrenciesEnum.KRW, langId: 'ko' },
	BR: { currencyId: CurrenciesEnum.BRL, langId: 'br' },
	TW: { currencyId: CurrenciesEnum.USD, langId: 'en' }, // * TW for 前端部門組員測試用
}

// 此 middleware 僅處理未初始化的 cookie，再進入 'default' 時會給予固定 defaultLang 內的 locale
// 若透過指定語系進入，則會給予指定語系的 locale
export const siteMiddleware = async ({ request, config }: ISiteMiddleware) => {
	if (
		request.nextUrl.pathname.startsWith('/api/') ||
		request.nextUrl.pathname.startsWith('/health') ||
		request.nextUrl.pathname.startsWith('/_next/') ||
		request.nextUrl.pathname.startsWith('/BLOCKIP/')
	) {
		return NextResponse.next()
	}

	const { defaultCurrency, defaultLocale, langToCurrency } = config
	const response = NextResponse.next()
	const { locale } = request.nextUrl
	const hasLangId = request.cookies.has(ENV_COOKIE_NAMES.LangId)
	const hasCurrencyId = request.cookies.has(ENV_COOKIE_NAMES.CurrencyId)
	const cookieLang = request.cookies.get(ENV_COOKIE_NAMES.LangId)
	const cookieCurrencyId = request.cookies.get(ENV_COOKIE_NAMES.CurrencyId)
	const langList = Object.keys(langToCurrency)
	const currencyList = Object.values(langToCurrency)

	// * 使用幣別語系權重: cookie => ip => default
	// * 沒有 cookie 資料，且無指定語系
	// const { isAccess = true, countryCode } =
	// 	(await getIpCountry(request.headers)) ?? {}
	const isAccess = true

	if (!isAccess && process.env.NODE_ENV === 'production') {
		// 只有在線上會 work
		const url = new URL('/BLOCKIP/index.html', request.url)
		return NextResponse.redirect(url)
	}

	if (!hasLangId) {
		if (locale === 'default') {
			const locale = defaultLocale
			const currencyId = defaultCurrency

			response.cookies.set(ENV_COOKIE_NAMES.LangId, locale)
			response.cookies.set(ENV_COOKIE_NAMES.CurrencyId, String(currencyId))
		}
	}

	// cookie 有資料但不在 langToCurrency 的範圍內
	const invalidLang = hasLangId && !langList.includes(String(cookieLang))
	const invalidCurrency =
		hasCurrencyId && !currencyList.includes(Number(cookieCurrencyId))
	// if (invalidLang || invalidCurrency) {
	// 	response.cookies.set(ENV_COOKIE_NAMES.LangId, defaultLocale)
	// 	response.cookies.set(ENV_COOKIE_NAMES.CurrencyId, String(defaultCurrency))
	// }

	// * 有指定語系，且與 cookie 不相符，將 cookie 替換至該語系
	if (locale !== 'default' && locale !== String(cookieLang)) {
		response.cookies.set(ENV_COOKIE_NAMES.LangId, locale)
		response.cookies.set(
			ENV_COOKIE_NAMES.CurrencyId,
			String(langToCurrency[locale])
		)
	}

	return response
}
