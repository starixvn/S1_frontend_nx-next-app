import type { NextRequest } from 'next/server'
import { siteMiddleware } from '@nx-next-app/utils'
import { LANG_TO_CURRENCY } from './data/langList'

// 此 middleware 僅處理未初始化的 cookie，再進入 'default' 時會給予固定 defaultLang 內的 locale
// 若透過指定語系進入，則會給予指定語系的 locale
const config = {
	defaultLocale: 'en',
	defaultCurrency: LANG_TO_CURRENCY['en'],
	langToCurrency: LANG_TO_CURRENCY,
}

export const middleware = (request: NextRequest) => {
	return siteMiddleware({ request, config })
}
