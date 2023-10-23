import { CurrenciesEnum, IFooterData } from '@nx-next-app/types'

export const FOOTER_DATA = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}): IFooterData => {
	// * 根據幣別決定路徑，每間品牌不同
	const getApplyNowLink = (currencyId: number) => {
		// if (currencyId === CurrenciesEnum.MYR) {
		// 	return ` https://aff.nova88mas102.com/?lang=${currentLang}`
		// }
		if (currencyId === CurrenciesEnum.INR) {
			return `https://aff.nova88india.com/?lang=${langId}`
		}
		return `https://aff.nova88bkk.com/?lang=${langId}`
	}

	return {
		copyRightList: [
			{
				displayKey: 'Label_AboutUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
			},
			{
				displayKey: 'Label_ContactUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
			},
			{
				displayKey: 'Label_TermsConditions',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`,
			},
		],
		// * platformList 渲染時需透過 tpIds、allowCurrencies 過濾一次
		platformList: [
			{
				productKey: 'SPORTS_SOCCER',
				imgName: 'saba',
				hoverImgName: 'sabab',
			},
			{
				productKey: 'LIVE_CASINO_ALL_BET',
				imgName: 'ab',
				hoverImgName: 'aba',
			},
			{
				productKey: 'LIVE_CASINO_DG',
				imgName: 'dg',
				hoverImgName: 'dga',
			},
			{
				productKey: 'LIVE_CASINO_AG',
				imgName: 'ag',
				hoverImgName: 'aga',
			},
			{
				productKey: 'LIVE_CASINO_AE',
				imgName: 'ae',
				hoverImgName: 'aea',
			},
			{
				productKey: 'LIVE_CASINO_SA',
				imgName: 'sa',
				hoverImgName: 'saa',
			},
			{
				productKey: 'SLOTS_PP',
				imgName: 'casino_pp',
				hoverImgName: 'casino_ppa',
			},
			{
				productKey: 'LIVE_CASINO_BG',
				imgName: 'bg',
				hoverImgName: 'bga',
			},
			{
				productKey: 'LIVE_CASINO_YEE_BET',
				imgName: 'yb',
				hoverImgName: 'yba',
			},
			{
				productKey: 'SLOTS_MGPSW',
				imgName: 'casino_mg',
				hoverImgName: 'casino_mga',
			},
			{
				productKey: 'SLOTS_PT',
				imgName: 'pt',
				hoverImgName: 'pta',
			},
			{
				productKey: 'SLOTS_YGG',
				imgName: 'casino_ygg',
				hoverImgName: 'casino_ygga',
			},
			{
				productKey: 'SLOTS_JOKER',
				imgName: 'casino_joker',
				hoverImgName: 'casino_jokera',
			},
			{
				productKey: 'SLOTS_SG',
				imgName: 'casino_sg',
				hoverImgName: 'casino_sga',
			},
			{
				productKey: 'SLOTS_JILI',
				imgName: 'casino_jili',
				hoverImgName: 'casino_jilia',
			},
			{
				productKey: 'LOTTERY_TCG',
				imgName: 'tc',
				hoverImgName: 'tcb',
			},
			{
				productKey: 'GAMES_POKER_M_POKER',
				imgName: 'mp',
				hoverImgName: 'mpa',
			},
			{
				productKey: 'SLOTS_RED_TIGER',
				imgName: 'casino_redtiger',
				hoverImgName: 'casino_redtigera',
			},
			{
				productKey: 'SLOTS_NET_ENT',
				imgName: 'casino_netent',
				hoverImgName: 'casino_netenta',
			},
			{
				productKey: 'SLOTS_ADVANT_PLAY',
				imgName: 'casino_ap',
				hoverImgName: 'casino_apa',
			},
			{
				productKey: 'LIVE_CASINO_EVO',
				imgName: 'ev',
				hoverImgName: 'eva',
			},
			{
				productKey: 'SLOTS_HABANERO',
				imgName: 'casino_hb',
				hoverImgName: 'casino_hba',
			},
			{
				productKey: 'SLOTS_SIMPLE_PLAY',
				imgName: 'liveCasino_simpleplay',
				hoverImgName: 'liveCasino_simpleplaya',
			},
			{
				productKey: 'SLOTS_AMB',
				imgName: 'liveCasino_amb',
				hoverImgName: 'liveCasino_amba',
			},
			{
				productKey: 'SLOTS_SKY_WIND',
				imgName: 'sk',
				hoverImgName: 'ska',
			},
		],
		programList: [
			// {
			// 	applyNowLink: getApplyNowLink(currencyId),
			// 	icon: 'icon-friendreferral',
			// 	displayKey: 'Label_Referral_Program',
			// 	description: 'Label_Referral_Program_desc',
			// 	hotKeyName: 'Label_JoinNow',
			// },
			// {
			// 	applyNowLink: getApplyNowLink(currencyId),
			// 	icon: 'icon-affiliate',
			// 	displayKey: 'Label_Affiliate_Program',
			// 	description: 'Label_Affiliate_Program_desc',
			// 	hotKeyName: 'Label_Apply_Now',
			// },
			// {
			// 	applyNowLink: getApplyNowLink(currencyId),
			// 	icon: 'icon-vip',
			// 	displayKey: 'Label_VIP_Program',
			// 	description: 'Label_VIP_Program_desc',
			// 	hotKeyName: 'Label_More_Info',
			// },
			// {
			// 	applyNowLink: getApplyNowLink(currencyId),
			// 	icon: 'icon-livechat1',
			// 	displayKey: 'Label_Customer_Support',
			// 	description: 'Label_Customer_Support_desc',
			// 	hotKeyName: 'Label_Chat_Now',
			// },
		],
		programDescriptionList: [
			// {
			// 	contents: [
			// 		{
			// 			displayKey: `Label_Sports_Betting_Online_${currencyId}`,
			// 			description: 'Label_Sports_Betting_Online_Malaysia_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Soccer_Betting_Live_Betting',
			// 			description: 'Label_Soccer_Betting_Live_Betting_desc',
			// 		},
			// 	],
			// },
			// {
			// 	contents: [
			// 		{
			// 			displayKey: 'Label_Sports_Betting_In_Play_Betting',
			// 			description: 'Label_Sports_Betting_In_Play_Betting_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Online_Casino_Live_Casino',
			// 			description: 'Label_Online_Casino_Live_Casino_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Keno_Lottery_Betting',
			// 			description: 'Label_Keno_Lottery_Betting_desc',
			// 		},
			// 	],
			// },
			// {
			// 	contents: [
			// 		{
			// 			displayKey: 'Label_Virtual_Sports',
			// 			description: 'Label_Virtual_Sports_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Fishing_in_footer',
			// 			description: 'Label_Fishing_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_ESports',
			// 			description: 'Label_ESport_desc',
			// 		},
			// 	],
			// },
			// {
			// 	contents: [
			// 		{
			// 			displayKey: 'Label_Mobile_Betting',
			// 			description: 'Label_Mobile_Betting_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Open_An_Account',
			// 			description: 'Label_Open_An_Account_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Payment_Options',
			// 			description: 'Label_Payment_Options_desc',
			// 		},
			// 	],
			// },
			// {
			// 	contents: [
			// 		{
			// 			displayKey: 'Label_Affiliates_in_footer',
			// 			description: 'Label_Affiliates_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Responsible_Gaming',
			// 			description: 'Label_Responsible_Gaming_desc',
			// 		},
			// 		{
			// 			displayKey: 'Label_Security',
			// 			description: 'Label_Security_desc',
			// 		},
			// 	],
			// },
		],
		licenseData: {
			defaultScript: 'a7019fa5-9f9a-468b-92da-4890f6a6e4a7',
			defaultXCMScript: '226e4de2-30aa-4077-951b-d440012994f3',
		},
		suggestedBrowser: [
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/gga.png`,
				alt: 'chrome',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/ffa.png`,
				alt: 'firefox',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/iea.png`,
				alt: 'edge',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/sfa.png`,
				alt: 'safari',
				width: 30,
				height: 30,
			},
		],
		paymentMethodsByCurrencyId: {
			[CurrenciesEnum.MYR]: [
				{
					name: 'help2pay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
				},
				{
					name: 'fpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fpay.png`,
				},
				{
					name: 'truepay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/truepay.png`,
				},
				{
					name: 'tngqr',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/tngqr.png`,
				},
				{
					name: 'duitnowqr',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/duitnowqr.png`,
				},
			],
			[CurrenciesEnum.THB]: [
				{
					name: 'help2pay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
				},
				{
					name: 'thaiqr',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/thaiqr.png`,
				},
			],
			[CurrenciesEnum.IDR]: [
				{
					name: 'help2pay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
				},
				{
					name: 'ovo',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/ovo.png`,
				},
				{
					name: 'gopay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/gopay.png`,
				},
				{
					name: 'dana',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/dana.png`,
				},
				{
					name: 'sakuku',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/sakuku.png`,
				},
				{
					name: 'linkaja',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/linkaja.png`,
				},
				{
					name: 'shopeepay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/shopeepay.png`,
				},
				{
					name: 'doku',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/doku.png`,
				},
			],
			[CurrenciesEnum.INR]: [
				{
					name: 'tenpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/tenpay.png`,
				},
			],
			[CurrenciesEnum.BDT]: [
				{
					name: 'DirePay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
				},
				{
					name: 'FxBit',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
				},
			],
			[CurrenciesEnum.CNY]: [
				{
					name: 'DirePay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
				},
				{
					name: 'FxBit',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
				},
			],
			[CurrenciesEnum.USD]: [
				{
					name: 'DirePay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
				},
				{
					name: 'FxBit',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
				},
			],
		},
	}
}
