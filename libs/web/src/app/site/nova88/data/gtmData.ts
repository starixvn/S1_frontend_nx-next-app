// 用於在 _document 取 gtmID, 根據不同 host 取值
export const getGTMId = (host: string | undefined) => {
	const defaultGTMId = 'GTM-5VD4484'
	const gtmMap = {
		// Global
		'GTM-5VD4484': [
			'nova88.net',
			'nova88101.net',
			'nova88102.net',
			'nova88801.net',
		],
		// Thailand
		'GTM-KSND4MPX': [
			'nova88bkk.com',
			'nova88bkk101.com',
			'nova88bkk102.com',
			'nova88bkk103.com',
			'nova88bkk105.com',
			'nova88bkk106.com',
			'nova88bkk801.com',
		],
		// Malaysia
		'GTM-K59FS4SW': [
			'nova88mas.com',
			'nova88mas101.com',
			'nova88mas102.com',
			'nova88mas103.com',
			'nova88mas105.com',
			'nova88mas106.com',
			'nova88mas801.com',
			'nova88mas802.com',
			'nova88mas803.com',
		],
		// India
		'GTM-NQ9TZ97Z': [
			'nova88india.com',
			'nova88india101.com',
			'nova88india102.com',
			'nova88india103.com',
			'nova88india105.com',
			'nova88india106.com',
			'nova88india801.com',
			'nova88khel.com',
		],
		// Indonesia
		'GTM-P79T37H5': [
			'nova88-indo.info',
			'nova88-indo106.info',
			'nova88-indo101.info',
			'nova88-indo103.info',
			'nova88-indo817.info',
			'nova88-indo803.info',
			'nova88-indo818.info',
			'nova88-indo819.info',
			'nova88-indo820.info',
			'nova88-indo821.info',
			'nova88-indo822.info',
			'nova88-indo823.info',
			'nova88-indo824.info',
			'nova88-indo825.info',
			'nova88-indo826.info',
			'nova88-indo827.info',
			'nova88-indo828.info',
			'nova88-indo829.info',
			'nova88-indo830.info',
			'nova88-indo831.info',
			'nova88-indo832.info',
			'nova88-indo833.info',
			'nova88-indo834.info',
			'nova88-indo835.info',
			'nova88top.com',
			'nova88bca.com',
			'nova88bni.com',
			'nova88hoki.com',
			'nova88cuan.com',
			'nova88gacor.com',
			'nova88jekpot.com',
			'nova88maxwin.com',
			'nova88bri.com',
			'nova88sb.com',
		],
		// Bangladesh
		'GTM-PL7NG4ST': ['nova88106.net'],
		// China
		'GTM-5HX68JVW': ['nova88105.net'],
		// Cambodia
		'GTM-KXNBSGWN': ['nova88103.net'],
		// Vietnam
		'GTM-5MGRSFJP': ['nova88901.net'],
	}

	// 取得主域名
	const mainDomain = host?.split('.').slice(-2).join('.')

	const gtmId = Object.entries(gtmMap).find(([key, domains]) =>
		domains.includes(mainDomain as string)
	)
	return gtmId ? gtmId[0] : defaultGTMId
}
