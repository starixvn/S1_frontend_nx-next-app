import { paths } from '@nx-next-app/constants'
import { PRODUCTS } from '@nx-next-app/site/nova88/data/products'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88/data/allowCurrency'
import {
	CURRENCY_PAYMENT_LIST,
	LANG_TO_CURRENCY,
} from '@nx-next-app/site/nova88'
import {
	IRequestConvertedFooterData,
	IResponseConvertedFooterData,
} from 'libs/web/src/app/types/footer'
import { CurrenciesEnum } from '@nx-next-app/types'

const COPYRIGHT_LIST: { displayName: string; href: string }[] = [
	{
		displayName: 'Label_AboutUs',
		href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/langId/AboutUs.html`,
	},
	{
		displayName: 'Label_ContactUs',
		href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/langId/ContactUs.html`,
	},
	{
		displayName: 'Label_TermsConditions',
		href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/langId/Terms.html`,
	},
]
const PLATFORM_LIST: {
	imgName: string
	hoverImgName: string
	path?: string
	allowCurrencies?: number[]
	parameter?: {
		TP_ID?: number
		NAME?: string
		BET_TYPE?: number
		TP_GAME_TYPE?: number
		GAME_ID?: number | string
	}
	TP_ID?: number
	NAME?: string
	BET_TYPE?: number
	TP_GAME_TYPE?: number
	GAME_ID?: number | string
}[] = [
	{
		...PRODUCTS['SPORTS_SOCCER'],
		path: paths.sports.root,
		parameter: { ...PRODUCTS['SPORTS_SOCCER'] },
		imgName: 'saba',
		hoverImgName: 'sabab',
	},
	{
		...PRODUCTS['LIVE_CASINO_ALL_BET'],
		imgName: 'ab',
		hoverImgName: 'aba',
	},
	{
		...PRODUCTS['LIVE_CASINO_DG'],
		imgName: 'dg',
		hoverImgName: 'dga',
	},
	{
		...PRODUCTS['LIVE_CASINO_AG'],
		imgName: 'ag',
		hoverImgName: 'aga',
	},
	{
		...PRODUCTS['LIVE_CASINO_AE'],
		imgName: 'ae',
		hoverImgName: 'aea',
	},
	{
		...PRODUCTS['LIVE_CASINO_SA'],
		imgName: 'sa',
		hoverImgName: 'saa',
	},
	{
		...PRODUCTS['SLOTS_PP'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_PP'] },
		imgName: 'casino_pp',
		hoverImgName: 'casino_ppa',
	},
	{
		...PRODUCTS['LIVE_CASINO_BG'],
		imgName: 'bg',
		hoverImgName: 'bga',
	},
	{
		...PRODUCTS['LIVE_CASINO_YEE_BET'],
		imgName: 'yb',
		hoverImgName: 'yba',
	},
	{
		...PRODUCTS['SLOTS_MGPSW'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_MGPSW'] },
		imgName: 'casino_mg',
		hoverImgName: 'casino_mga',
	},
	{
		...PRODUCTS['SLOTS_PT'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_PT'] },
		imgName: 'pt',
		hoverImgName: 'pta',
	},
	{
		...PRODUCTS['SLOTS_YGG'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_YGG'] },
		imgName: 'casino_ygg',
		hoverImgName: 'casino_ygga',
	},
	{
		...PRODUCTS['SLOTS_JOKER'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_JOKER'] },
		imgName: 'casino_joker',
		hoverImgName: 'casino_jokera',
	},
	{
		...PRODUCTS['SLOTS_SG'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_SG'] },
		imgName: 'casino_sg',
		hoverImgName: 'casino_sga',
	},
	{
		...PRODUCTS['SLOTS_JILI'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_JILI'] },
		imgName: 'casino_jili',
		hoverImgName: 'casino_jilia',
	},
	{
		...PRODUCTS['LOTTERY_TCG'],
		parameter: { ...PRODUCTS['LOTTERY_TCG'] },
		imgName: 'tc',
		hoverImgName: 'tcb',
	},
	{
		...PRODUCTS['GAMES_POKER_M_POKER'],
		imgName: 'mp',
		hoverImgName: 'mpa',
		allowCurrencies: ALLOWED_CURRENCIES[
			'GAMES_POKER_M_POKER'
		] as CurrenciesEnum[],
	},
	{
		...PRODUCTS['SLOTS_RED_TIGER'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_RED_TIGER'] },
		imgName: 'casino_redtiger',
		hoverImgName: 'casino_redtigera',
	},
	{
		...PRODUCTS['SLOTS_NET_ENT'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_NET_ENT'] },
		imgName: 'casino_netent',
		hoverImgName: 'casino_netenta',
	},
	{
		...PRODUCTS['SLOTS_ADVANT_PLAY'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_ADVANT_PLAY'] },
		imgName: 'casino_ap',
		hoverImgName: 'casino_apa',
	},
	{
		...PRODUCTS['LIVE_CASINO_EVO'],
		imgName: 'ev',
		hoverImgName: 'eva',
	},
	// {
	// 	...productList.mega888,
	// 	path: path.mega888.root,
	// 	imgName: "casino_mega",
	// 	hoverImgName: "casino_megaa"
	// },
	{
		...PRODUCTS['SLOTS_HABANERO'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_HABANERO'] },
		imgName: 'casino_hb',
		hoverImgName: 'casino_hba',
	},
	{
		...PRODUCTS['SLOTS_SIMPLE_PLAY'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_SIMPLE_PLAY'] },
		imgName: 'liveCasino_simpleplay',
		hoverImgName: 'liveCasino_simpleplaya',
	},
	{
		...PRODUCTS['SLOTS_AMB'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_AMB'] },
		imgName: 'liveCasino_amb',
		hoverImgName: 'liveCasino_amba',
		allowCurrencies: ALLOWED_CURRENCIES['SLOTS_AMB'] as CurrenciesEnum[],
	},
	{
		...PRODUCTS['SLOTS_SKY_WIND'],
		path: paths.liveCasino.root,
		parameter: { ...PRODUCTS['SLOTS_SKY_WIND'] },
		imgName: 'sk',
		hoverImgName: 'ska',
	},
]

const FOOTER_ICONS: {
	key: string
	icon: string
	displayName: string
	description: string
	hotKeyName: string
}[] = [
	{
		key: 'friendReferral',
		icon: 'icon-friendreferral',
		displayName: 'Label_Referral_Program',
		description: 'Label_Referral_Program_desc',
		hotKeyName: 'Label_JoinNow',
	},
	{
		key: 'affiliate',
		icon: 'icon-affiliate',
		displayName: 'Label_Affiliate_Program',
		description: 'Label_Affiliate_Program_desc',
		hotKeyName: 'Label_Apply_Now',
	},
	{
		key: 'vip',
		icon: 'icon-vip',
		displayName: 'Label_VIP_Program',
		description: 'Label_VIP_Program_desc',
		hotKeyName: 'Label_More_Info',
	},
	{
		key: 'liveChat',
		icon: 'icon-livechat1',
		displayName: 'Label_Customer_Support',
		description: 'Label_Customer_Support_desc',
		hotKeyName: 'Label_Chat_Now',
	},
]
const FOOTER_TEXTS: Array<{
	key: number
	content: { title: string; description: string }[]
}> = [
	{
		key: 1,
		content: [
			{
				title: 'Label_Sports_Betting_Online',
				description: 'Label_Sports_Betting_Online_Malaysia_desc',
			},
			{
				title: 'Label_Soccer_Betting_Live_Betting',
				description: 'Label_Soccer_Betting_Live_Betting_desc',
			},
		],
	},
	{
		key: 2,
		content: [
			{
				title: 'Label_Sports_Betting_In_Play_Betting',
				description: 'Label_Sports_Betting_In_Play_Betting_desc',
			},
			{
				title: 'Label_Online_Casino_Live_Casino',
				description: 'Label_Online_Casino_Live_Casino_desc',
			},
			{
				title: 'Label_Keno_Lottery_Betting',
				description: 'Label_Keno_Lottery_Betting_desc',
			},
		],
	},
	{
		key: 3,
		content: [
			{
				title: 'Label_Virtual_Sports',
				description: 'Label_Virtual_Sports_desc',
			},
			{
				title: 'Label_Fishing_in_footer',
				description: 'Label_Fishing_desc',
			},
			{
				title: 'Label_ESports',
				description: 'Label_ESport_desc',
			},
		],
	},
	{
		key: 4,
		content: [
			{
				title: 'Label_Mobile_Betting',
				description: 'Label_Mobile_Betting_desc',
			},
			{
				title: 'Label_Open_An_Account',
				description: 'Label_Open_An_Account_desc',
			},
			{
				title: 'Label_Payment_Options',
				description: 'Label_Payment_Options_desc',
			},
		],
	},
	{
		key: 5,
		content: [
			{
				title: 'Label_Affiliates_in_footer',
				description: 'Label_Affiliates_desc',
			},
			{
				title: 'Label_Responsible_Gaming',
				description: 'Label_Responsible_Gaming_desc',
			},
			{
				title: 'Label_Security',
				description: 'Label_Security_desc',
			},
		],
	},
]

export const footerDataConverter = ({
	currentLang,
	currencyId,
	isLogin,
	tpIds,
}: IRequestConvertedFooterData): IResponseConvertedFooterData => {
	const copyRightListConverter = () =>
		COPYRIGHT_LIST.map(({ displayName, href }) => {
			const langHref = href.replace('langId', currentLang)
			return {
				displayName,
				href: langHref,
			}
		})

	const platFormListConverter = () => {
		const filterPlatformList = PLATFORM_LIST.filter(
			item => !item.TP_ID || (item.TP_ID && tpIds?.includes(item.TP_ID))
		)
		const displayList = isLogin ? filterPlatformList : PLATFORM_LIST

		return displayList
			.filter(platformObj => {
				if (platformObj.allowCurrencies) {
					return platformObj.allowCurrencies.includes(currencyId as number)
				}
				return true
			})
			?.map(({ GAME_ID, TP_ID, parameter, imgName, hoverImgName, path }) => {
				const key = `footer-platform-${TP_ID}-${GAME_ID}`
				return {
					key,
					imgName,
					hoverImgName,
				}
			})
	}

	const servicePlanListConverter = () => {
		const getCurrencyLink = (currencyId: number) => {
			if (currencyId === CurrenciesEnum.MYR) {
				return ` https://aff.nova88mas102.com/?lang=${currentLang}`
			}
			if (currencyId === CurrenciesEnum.INR) {
				return `https://aff.nova88india.com/?lang=${currentLang}`
			}
			return `https://aff.nova88bkk.com/?lang=${currentLang}`
		}

		return {
			allowedCurrencies: ALLOWED_CURRENCIES,
			servicePlanList: FOOTER_ICONS.map(item => {
				return {
					applyNowLink: getCurrencyLink(currencyId),
					...item,
				}
			}),
		}
	}

	const promotionTextListConverter = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [currencyName, _] = Object.entries(CurrenciesEnum).find(
			([key, value]) => value === currencyId
		) ?? ['MYR', 2]

		return FOOTER_TEXTS.map(({ key, content }) => {
			return {
				key,
				content: content.map(({ title, description }, index) => {
					if (key === 1 && index === 0) {
						return { title: `${title}_${currencyName}`, description }
					}
					return { title, description }
				}),
			}
		})
	}

	const getLicenseData = () => {
		return {
			defaultScript: 'a7019fa5-9f9a-468b-92da-4890f6a6e4a7',
			defaultXCMScript: '226e4de2-30aa-4077-951b-d440012994f3',
		}
	}

	const getSfpData = () => {
		return {
			currencyPaymentList: CURRENCY_PAYMENT_LIST,
			langToCurrency: LANG_TO_CURRENCY,
		}
	}

	return {
		copyRightList: copyRightListConverter(),
		platformList: platFormListConverter(),
		servicePlanData: servicePlanListConverter(),
		promotionTextList: promotionTextListConverter(),
		licenseData: getLicenseData(),
		sfpData: getSfpData(),
	}
}
