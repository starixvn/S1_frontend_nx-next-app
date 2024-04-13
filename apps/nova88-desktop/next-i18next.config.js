/* eslint-disable */
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'my', 'bd', 'id', 'kh', 'hi', 'vn'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'en',
		// 更新後因爲 nx 的資料夾層級改變， i18next 無法正確抓到 root 層的 public/locale資料，故作此修改
		localePath: isDevelopment
			? require('path').resolve('../../public/locales')
			: '/locales',
	},
	reloadOnPrerender: isDevelopment,
}
