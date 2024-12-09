import { PRODUCTS } from '@nx-next-app/constants'
import { CurrenciesEnum, IFooterData } from '@nx-next-app/types'

export const FOOTER_DATA = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}): IFooterData => {
	// * 根據幣別決定路徑，每間品牌不同
	return {
		// * platformList 須經過 useMenu(已包含 排序、tpIds、allowCurrencies) 過濾
		platformList: [
			{
				...PRODUCTS.Soccer,
				imgName: 'saba',
			},
			{
				...PRODUCTS.Allbet,
				imgName: 'all',
			},
			{
				...PRODUCTS.DreamGaming,
				imgName: 'dg',
			},
			{
				...PRODUCTS.AsiaGaming,
				imgName: 'ag',
			},
			{
				...PRODUCTS.AESexy,
				imgName: 'sexy',
			},
			{
				...PRODUCTS.SAGaming,
				imgName: 'sa',
			},
			{
				...PRODUCTS.PragmaticPlayCasino,
				imgName: 'pp',
			},
			{
				...PRODUCTS.BigGaming,
				imgName: 'bg',
			},
			{
				// ??
				...PRODUCTS.YeebetCasino,
				imgName: 'yb',
			},
			{
				...PRODUCTS.MicrogamingSlot,
				imgName: 'mic',
			},
			{
				...PRODUCTS.NewPlayTechSlot,
				imgName: 'pt',
			},
			{
				...PRODUCTS.YGGDrassil,
				imgName: 'ygg',
			},
			{
				...PRODUCTS.Joker,
				imgName: 'joker',
			},
			{
				...PRODUCTS.Spadegaming,
				imgName: 'spad',
			},
			{
				...PRODUCTS.JILI,
				imgName: 'jili',
			},
			{
				...PRODUCTS.TCGaming,
				imgName: 'tc',
			},
			{
				...PRODUCTS.RedTiger,
				imgName: 'red',
			},
			{
				...PRODUCTS.NetEnt,
				imgName: 'net',
			},
			{
				...PRODUCTS.AdvantPlay,
				imgName: 'ap',
			},
			{
				...PRODUCTS.EvolutionGaming,
				imgName: 'evo',
			},
			{
				...PRODUCTS.Habanero,
				imgName: 'ha',
			},
			{
				...PRODUCTS.SimplePlay,
				imgName: 'simple',
			},
			{
				...PRODUCTS.SkywindSlot,
				imgName: 'sky',
			},
			{
				...PRODUCTS.Nextspin,
				imgName: 'next',
			},
			{
				...PRODUCTS.IMESports,
				imgName: 'im-esports',
			},
			{
				...PRODUCTS.SPRIBE,
				imgName: 'spribe',
			},
			{
				...PRODUCTS.PlaynGO,
				imgName: 'png',
			},
			{
				...PRODUCTS.ES,
				imgName: 'es',
			},
			{
				...PRODUCTS.WE,
				imgName: 'we',
			},
			{
				...PRODUCTS.AskmeSlot,
				imgName: 'askme',
			},
			{
				...PRODUCTS.FaChai,
				imgName: 'fachai',
			},
			{
				...PRODUCTS.BNG,
				imgName: 'bng',
			},
			{
				...PRODUCTS.Pegasus,
				imgName: 'pegasus',
			},
			{
				...PRODUCTS.V8Poker,
				imgName: 'v8',
			},
			{
				...PRODUCTS.TFGaming,
				imgName: 'tfg',
			},
			{
				...PRODUCTS.NoLimitCity,
				imgName: 'nlc',
			},
			{
				...PRODUCTS.AmigoGaming,
				imgName: 'amigo',
			},
			{
				...PRODUCTS.MPPoker,
				imgName: 'mp',
			},
			{
				...PRODUCTS.GrandDragon,
				imgName: 'haolong',
			},
			{
				...PRODUCTS.WonCasino,
				imgName: 'woncasino',
			},
		],
		quickLinks: [
			{
				displayKey: 'Label_AboutUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
			},
			{
				displayKey: 'Label_TermsConditions',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/en/TermsConditions.html`, // ms-9149需求希望統一只導到en頁
			},
			// {
			// 	displayKey: 'Label_Affiliate_Program',
			// 	href: GET_AFFILIATE_LINK({ currencyId, langId }),
			// },
			{
				displayKey: 'Label_ContactUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
			},
			// {
			// 	displayKey: 'Label_General_Milestone',
			// 	href: `/${langId}/milestones`,
			// },
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
					name: 'Bangkok Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bangkokbank.webp`,
				},

				{
					name: 'Kasikorn Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kasikornbank.webp`,
				},

				{
					name: 'Siam Commercial Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/scb.webp`,
				},

				{
					name: 'Krung Thai Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ktb.webp`,
				},

				{
					name: 'Bank of Ayudhya',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ayudhya.webp`,
				},

				{
					name: 'TMBThanachart',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/TMBThanachart-Bank.webp`,
				},
				{
					name: 'Government Saving Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Government-Savings-Bank.webp`,
				},
				{
					name: 'United Oversea Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/United-Overseas-Bank.webp`,
				},
				{
					name: 'CIMB Thai',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/CIMB-Thai-Bank.webp`,
				},
				{
					name: 'Land and Houses Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Land-and-Houses-Bank.webp`,
				},

				{
					name: 'Promtpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/promptpay.webp`,
				},
				{
					name: 'TrueMoney',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.webp`,
				},
				{
					name: 'Standard Chartered Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Standard-Chartered-Bank.webp`,
				},
				{
					name: 'HSCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/The-Hongkong-Shanghai-Bank.webp`,
				},
				{
					name: 'Kiatnakin Phatra Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Kiatnakin-Phatra-Bank.webp`,
				},
				{
					name: 'ICBC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Industrial-and-Commercial-Bank.webp`,
				},

				{
					name: 'Tisco Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Tisco-Bank.webp`,
				},
				{
					name: 'Thai Credit Retail Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Thai-Credit-Retail-Bank.webp`,
				},
				{
					name: 'Thanachart Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Thanachart.webp`,
				},
				{
					name: 'Bank of China',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Bank-of-China.webp`,
				},
				// {
				// 	name: 'BTC',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				// },
				// {
				// 	name: 'ETH',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				// },
				// {
				// 	name: 'USDT',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				// },
				// {
				// 	name: 'USDC',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				// },
				// {
				// 	name: 'DAI',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				// },
				// {
				// 	name: 'EOS',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				// },
				// {
				// 	name: 'ADA',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				// },
				// {
				// 	name: 'DOGE',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				// },
			],
			[CurrenciesEnum.THB]: [
				{
					name: 'Bangkok Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bangkokbank.webp`,
				},

				{
					name: 'Kasikorn Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kasikornbank.webp`,
				},

				{
					name: 'Siam Commercial Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/scb.webp`,
				},

				{
					name: 'Krung Thai Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ktb.webp`,
				},

				{
					name: 'Bank of Ayudhya',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ayudhya.webp`,
				},

				{
					name: 'TMBThanachart',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/TMBThanachart-Bank.webp`,
				},
				{
					name: 'Government Saving Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Government-Savings-Bank.webp`,
				},
				{
					name: 'United Oversea Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/United-Overseas-Bank.webp`,
				},
				{
					name: 'CIMB Thai',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/CIMB-Thai-Bank.webp`,
				},
				{
					name: 'Land and Houses Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Land-and-Houses-Bank.webp`,
				},

				{
					name: 'Promtpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/promptpay.webp`,
				},
				{
					name: 'TrueMoney',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.webp`,
				},
				{
					name: 'Standard Chartered Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Standard-Chartered-Bank.webp`,
				},
				{
					name: 'HSCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/The-Hongkong-Shanghai-Bank.webp`,
				},
				{
					name: 'Kiatnakin Phatra Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Kiatnakin-Phatra-Bank.webp`,
				},
				{
					name: 'ICBC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Industrial-and-Commercial-Bank.webp`,
				},

				{
					name: 'Tisco Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Tisco-Bank.webp`,
				},
				{
					name: 'Thai Credit Retail Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Thai-Credit-Retail-Bank.webp`,
				},
				{
					name: 'Thanachart Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Thanachart.webp`,
				},
				{
					name: 'Bank of China',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/Bank-of-China.webp`,
				},
				// {
				// 	name: 'BTC',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				// },
				// {
				// 	name: 'ETH',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				// },
				// {
				// 	name: 'USDT',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				// },
				// {
				// 	name: 'USDC',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				// },
				// {
				// 	name: 'DAI',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				// },
				// {
				// 	name: 'EOS',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				// },
				// {
				// 	name: 'ADA',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				// },
				// {
				// 	name: 'DOGE',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				// },
			],
			[CurrenciesEnum.IDR]: [
				{
					name: 'BCA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bca.webp`,
				},
				{
					name: 'MANDIRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mandiri.webp`,
				},
				{
					name: 'BRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bri.webp`,
				},
				{
					name: 'PERMATA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/permata.webp`,
				},
				{
					name: 'CIMB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/cimb.webp`,
				},
				{
					name: 'BNI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bni.webp`,
				},
				{
					name: 'QRIS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/qris.webp`,
				},
				{
					name: 'GOPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/gopay.webp`,
				},
				{
					name: 'OVO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ovo.webp`,
				},
				{
					name: 'DANA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dana.webp`,
				},
				{
					name: 'SAKUKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sakuku.webp`,
				},
				{
					name: 'LINKAJA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/linkaja.webp`,
				},
				{
					name: 'SHOPEEPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shopeepay.webp`,
				},
				{
					name: 'DOKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doku.webp`,
				},

				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'BNB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bnb.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.INR]: [
				{
					name: 'Federeal Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/federealbank.webp`,
				},
				{
					name: 'ICICI Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/icici.webp`,
				},
				{
					name: 'IDFC Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/idfc.webp`,
				},
				{
					name: 'Indian Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indian.webp`,
				},
				{
					name: 'IndusInd Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indusind.webp`,
				},
				{
					name: 'Kotak Mahindra',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kotak.webp`,
				},
				{
					name: 'UPI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upi.webp`,
				},

				{
					name: 'Tenpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tenpay.webp`,
				},
				{
					name: 'VaderPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vaderpay.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.BDT]: [
				{
					name: 'Bkash',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bkash.webp`,
				},
				{
					name: 'Rocket',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rocket.webp`,
				},
				{
					name: 'Upay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upay.webp`,
				},
				{
					name: 'Nagad',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/nagad.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.KHM]: [
				{
					name: 'ABA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/aba.webp`,
				},
				{
					name: 'ACLEDA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acleda.webp`,
				},
				{
					name: 'WING',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wing.webp`,
				},
				{
					name: 'TRUEMONEY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.webp`,
				},
				{
					name: 'PIPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pipay.webp`,
				},

				{
					name: 'ACLEDA_Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acledabank.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.VND]: [
				{
					name: 'ACB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acb.webp`,
				},
				{
					name: 'DAB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dab.webp`,
				},
				{
					name: 'Eximbank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/exim.webp`,
				},
				{
					name: 'VTB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vtb.webp`,
				},
				{
					name: 'BIDV',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bidv.webp`,
				},
				{
					name: 'MB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mb.webp`,
				},
				{
					name: 'TCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tcb.webp`,
				},
				{
					name: 'VCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vcb.webp`,
				},
				{
					name: 'VIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vib.webp`,
				},
				{
					name: 'HDB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/hdb.webp`,
				},
				{
					name: 'MSB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/msb.webp`,
				},
				{
					name: 'SACOM',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sacom.webp`,
				},
				{
					name: 'MOMO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/momo.webp`,
				},
				{
					name: 'ZALO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/zalo.webp`,
				},

				{
					name: 'YuiPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/yuipay.webp`,
				},
				{
					name: 'HonorPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/honorpay.webp`,
				},
				{
					name: 'Wpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wpay.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.CNY]: [
				{
					name: '广西省农村信用社',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kwangsi.webp`,
				},

				{
					name: 'ChangChenPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/changchenpay.webp`,
				},
				{
					name: 'TenglongPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tenglongpay.webp`,
				},
				{
					name: 'Alipay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/alipay.webp`,
				},
				{
					name: 'QQPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/qqpay.webp`,
				},
				{
					name: 'UnionPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/unionpay.webp`,
				},
				{
					name: 'WechatPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wechatpay.webp`,
				},
				{
					name: 'DouDouPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doudoupay.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.USD]: [
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'BUSD',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/busd.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'SHIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shib.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
			],
			[CurrenciesEnum.KRW]: [
				{
					name: 'HonorPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/honorpay.webp`,
				},
				{
					name: 'SojuPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sojupay.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
			],
			[CurrenciesEnum.BRL]: [
				{
					name: 'PIX',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pix.webp`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.webp`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.webp`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.webp`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.webp`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.webp`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.webp`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.webp`,
				},
				{
					name: 'SHIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shib.webp`,
				},
				{
					name: 'BUSD',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/busd.webp`,
				},
				{
					name: 'XRP',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/xrp.webp`,
				},
			],
		},
	}
}
