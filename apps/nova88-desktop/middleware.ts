import type { NextRequest } from 'next/server'
import { siteMiddleware } from '@nx-next-app/middleware'

// langToCurrency 在 middleware 就要使用到，next 規定 middleware 使用的資源要寫在裡面才 build 得過
export const LANG_TO_CURRENCY: { [key: string]: number } = {
	en: 2,
	cs: 2,
	my: 2,
	th: 4,
	id: 15,
	hi: 61,
	kh: 72,
	bd: 74,
	vn: 51,
}

// 此 middleware 僅處理未初始化的 cookie，再進入 'default' 時會給予固定 defaultLang 內的 locale
// 若透過指定語系進入，則會給予指定語系的 locale
const config = {
	defaultLocale: 'en',
	defaultCurrency: 2,
	langToCurrency: LANG_TO_CURRENCY,
}

export const middleware = (request: NextRequest) => {
	return siteMiddleware({ request, config })
}
