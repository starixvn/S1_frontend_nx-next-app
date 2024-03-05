import { CurrenciesEnum, IFooterData } from '@nx-next-app/types'

export const FOOTER_DATA = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}): IFooterData => {
	// * 根據幣別決定路徑，每間品牌不同
	const getApplyNowLink = (currencyId: number, langId: string) => {
		if (currencyId === CurrenciesEnum.MYR) {
			return ` https://aff.nova88mas102.com/?lang=${langId}`
		}
		if (currencyId === CurrenciesEnum.INR) {
			return `https://aff.nova88india.com/?lang=${langId}`
		}
		return `https://aff.nova88bkk.com/?lang=${langId}`
	}

	return {
		// * platformList 渲染時需透過 tpIds、allowCurrencies 過濾一次
		platformList: [
			{
				productKey: 'SPORTS_SOCCER',
				imgName: 'saba',
			},
			{
				productKey: 'LIVE_CASINO_ALL_BET',
				imgName: 'all',
			},
			{
				productKey: 'LIVE_CASINO_DG',
				imgName: 'dg',
			},
			{
				productKey: 'LIVE_CASINO_AG',
				imgName: 'ag',
			},
			{
				productKey: 'LIVE_CASINO_AE',
				imgName: 'sexy',
			},
			{
				productKey: 'LIVE_CASINO_SA',
				imgName: 'sa',
			},
			{
				productKey: 'SLOTS_PP',
				imgName: 'pp',
			},
			{
				productKey: 'LIVE_CASINO_BG',
				imgName: 'bg',
			},
			{
				productKey: 'LIVE_CASINO_YEE_BET',
				imgName: 'yb',
			},
			{
				productKey: 'SLOTS_MGPSW',
				imgName: 'mic',
			},
			{
				productKey: 'SLOTS_PT',
				imgName: 'pt',
			},
			{
				productKey: 'SLOTS_YGG',
				imgName: 'ygg',
			},
			{
				productKey: 'SLOTS_JOKER',
				imgName: 'joker',
			},
			{
				productKey: 'SLOTS_SG',
				imgName: 'spad',
			},
			{
				productKey: 'SLOTS_JILI',
				imgName: 'jili',
			},
			{
				productKey: 'LOTTERY_TCG',
				imgName: 'tc',
			},
			{
				productKey: 'GAMES_POKER_M_POKER',
				imgName: 'mp',
			},
			{
				productKey: 'SLOTS_RED_TIGER',
				imgName: 'red',
			},
			{
				productKey: 'SLOTS_NET_ENT',
				imgName: 'net',
			},
			{
				productKey: 'SLOTS_ADVANT_PLAY',
				imgName: 'ap',
			},
			{
				productKey: 'LIVE_CASINO_EVO',
				imgName: 'evo',
			},
			{
				productKey: 'SLOTS_HABANERO',
				imgName: 'ha',
			},
			{
				productKey: 'SLOTS_SIMPLE_PLAY',
				imgName: 'simple',
			},
			{
				productKey: 'SLOTS_SKY_WIND',
				imgName: 'sky',
			},
			{
				productKey: 'SLOTS_NEXT_SPIN',
				imgName: 'next',
			},
			{
				productKey: 'SPORTS_E_IMESPORTS',
				imgName: 'im-esports',
			},
			{
				productKey: 'SLOTS_SPRIBE',
				imgName: 'spribe',
			},
			{
				productKey: 'SLOTS_PNG',
				imgName: 'png',
			},
			{
				productKey: 'SLOTS_ES',
				imgName: 'es',
			},
			{
				productKey: 'LIVE_CASINO_WE',
				imgName: 'we',
			},
			{
				productKey: 'SLOTS_AMB',
				imgName: 'askme',
			},
			{
				productKey: 'SLOTS_FA_CHAI',
				imgName: 'fachai',
			},
			{
				productKey: 'SLOTS_BNG',
				imgName: 'bng',
			},
			{
				productKey: 'SLOTS_PEGASUS',
				imgName: 'pegasus',
			},
			{
				productKey: 'GAMES_V8_POKER',
				imgName: 'v8',
			},
			{
				productKey: 'SPORTS_E_SPORTS_TFG',
				imgName: 'tfg',
			},
			{
				productKey: 'SLOTS_NO_LIMIT_CITY',
				imgName: 'nlc',
			},
			{
				productKey: 'SLOTS_AMIGO',
				imgName: 'amigo',
			},
			{
				productKey: 'FOUR_D_GRAND_DRAGON',
				imgName: 'haolong',
			},
		],
		quickLinks: [
			{
				displayKey: 'Label_AboutUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
			},
			{
				displayKey: 'Label_TermsConditions',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`,
			},
			{
				displayKey: 'Label_Affiliate_Program',
				href: getApplyNowLink(currencyId, langId),
			},
			{
				displayKey: 'Label_ContactUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
			},
		],
		promotionTextList: [
			{
				title: 'Label_Soccer_Betting_Live_Betting',
				content: 'Label_Soccer_Betting_Live_Betting_desc',
			},
			{
				title: 'Label_Sports_Betting_In_Play_Betting',
				content: 'Label_Sports_Betting_In_Play_Betting_desc',
			},
			{
				title: 'Label_Online_Casino_Live_Casino',
				content: 'Label_Online_Casino_Live_Casino_desc',
			},
			{
				title: 'Label_Keno_Lottery_Betting',
				content: 'Label_Keno_Lottery_Betting_desc',
			},
			{
				title: 'Label_Virtual_Sports',
				content: 'Label_Virtual_Sports_desc',
			},
			{
				title: 'Label_Fishing_in_footer',
				content: 'Label_Fishing_desc',
			},
			{
				title: 'Label_ESports',
				content: 'Label_ESport_desc',
			},
			{
				title: 'Label_Mobile_Betting',
				content: 'Label_Mobile_Betting_desc',
			},
			{
				title: 'Label_Open_An_Account',
				content: 'Label_Open_An_Account_desc',
			},
			{
				title: 'Label_Payment_Options',
				content: 'Label_Payment_Options_desc',
			},
			{
				title: 'Label_Affiliates_in_footer',
				content: 'Label_Affiliates_desc',
			},
			{
				title: 'Label_Responsible_Gaming',
				content: 'Label_Responsible_Gaming_desc',
			},
			{
				title: 'Label_Security',
				content: 'Label_Security_desc',
			},
		],
		licenseData: {
			defaultScript: 'a7019fa5-9f9a-468b-92da-4890f6a6e4a7',
			defaultXCMScript: '226e4de2-30aa-4077-951b-d440012994f3',
		},
		suggestedBrowser: [
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/chrome.png`,
				alt: 'chrome',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/firefox.png`,
				alt: 'firefox',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/edge.png`,
				alt: 'edge',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/safari.png`,
				alt: 'safari',
				width: 30,
				height: 30,
			},
		],
		paymentMethodsByCurrencyId: {
			[CurrenciesEnum.MYR]: [
				{
					name: 'Maybank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/maybank.jpg`,
				},
				{
					name: 'OCBC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ocbc.jpg`,
				},

				{
					name: 'tngqr',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ambank.jpg`,
				},
				{
					name: 'CIMB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/cimb.jpg`,
				},
				{
					name: 'RHB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rhb.jpg`,
				},
				{
					name: 'AFFIN',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/affin.jpg`,
				},
				{
					name: 'HLB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/hlb.jpg`,
				},
				{
					name: 'PBB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pbb.jpg`,
				},
				{
					name: 'Duitnow',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/duitnow.jpg`,
				},
				{
					name: 'TnG',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tng.jpg`,
				},
				{
					name: 'Boost',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/boost.jpg`,
				},
				{
					name: 'Grabpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/grabpay.jpg`,
				},
				{
					name: 'Shopeepay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shopeepay.jpg`,
				},
			],
			[CurrenciesEnum.THB]: [
				{
					name: 'Kasikorn Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kasikornbank.jpg`,
				},
				{
					name: 'Krung Thai Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ktb.jpg`,
				},
				{
					name: 'Siam Commercial Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/scb.jpg`,
				},
				{
					name: 'Bangkok Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bangkokbank.jpg`,
				},
				{
					name: 'Bank of Ayudhya',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ayudhya.jpg`,
				},
				{
					name: 'Promtpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/promptpay.jpg`,
				},
				{
					name: 'TrueMoney',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.jpg`,
				},
			],
			[CurrenciesEnum.IDR]: [
				{
					name: 'BCA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bca.jpg`,
				},
				{
					name: 'MANDIRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mandiri.jpg`,
				},
				{
					name: 'BRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bri.jpg`,
				},
				{
					name: 'PERMATA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/permata.jpg`,
				},
				{
					name: 'CIMB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/cimb.jpg`,
				},
				{
					name: 'BNI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bni.jpg`,
				},
				{
					name: 'QRIS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/qris.jpg`,
				},
				{
					name: 'GOPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/gopay.jpg`,
				},
				{
					name: 'OVO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ovo.jpg`,
				},
				{
					name: 'DANA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dana.jpg`,
				},
				{
					name: 'SAKUKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sakuku.jpg`,
				},
				{
					name: 'LINKAJA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/linkaja.jpg`,
				},
				{
					name: 'SHOPEEPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shopeepay.jpg`,
				},
				{
					name: 'DOKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doku.jpg`,
				},
			],
			[CurrenciesEnum.INR]: [
				{
					name: 'Federeal Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/federealbank.jpg`,
				},
				{
					name: 'ICICI Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/icici.jpg`,
				},
				{
					name: 'IDFC Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/idfc.jpg`,
				},
				{
					name: 'Indian Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indian.jpg`,
				},
				{
					name: 'IndusInd Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indusind.jpg`,
				},
				{
					name: 'Kotak Mahindra',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kotak.jpg`,
				},
				{
					name: 'UPI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upi.jpg`,
				},
			],
			[CurrenciesEnum.BDT]: [
				{
					name: 'Bkash',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bkash.jpg`,
				},
				{
					name: 'Rocket',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rocket.jpg`,
				},
				{
					name: 'Upay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upay.jpg`,
				},
				{
					name: 'Nagad',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/nagad.jpg`,
				},
			],
			[CurrenciesEnum.KHM]: [
				{
					name: 'ABA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/aba.jpg`,
				},
				{
					name: 'ACLEDA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acleda.jpg`,
				},
				{
					name: 'WING',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wing.jpg`,
				},
				{
					name: 'TRUEMONEY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.jpg`,
				},
				{
					name: 'PIPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pipay.jpg`,
				},
			],
			[CurrenciesEnum.VND]: [
				{
					name: 'ACB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acb.jpg`,
				},
				{
					name: 'DAB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dab.jpg`,
				},
				{
					name: 'Eximbank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/exim.jpg`,
				},
				{
					name: 'VTB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vtb.jpg`,
				},
				{
					name: 'BIDV',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bidv.jpg`,
				},
				{
					name: 'MB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mb.jpg`,
				},
				{
					name: 'TCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tcb.jpg`,
				},
				{
					name: 'VCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vcb.jpg`,
				},
				{
					name: 'VIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vib.jpg`,
				},
				{
					name: 'HDB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/hdb.jpg`,
				},
				{
					name: 'MSB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/msb.jpg`,
				},
				{
					name: 'SACOM',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sacom.jpg`,
				},
				{
					name: 'MOMO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/momo.jpg`,
				},
				{
					name: 'ZALO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/zalo.jpg`,
				},
			],
			[CurrenciesEnum.CNY]: [
				{
					name: '广西省农村信用社',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kwangsi.jpg`,
				},
			],
			[CurrenciesEnum.USD]: [
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'BUSD',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/busd.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'SHIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shib.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
			],
		},
	}
}
