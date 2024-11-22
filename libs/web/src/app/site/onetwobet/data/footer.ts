import { PRODUCTS } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

export const FOOTER_DATA = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}): IFooterData => {
	// * 根據幣別決定路徑，每間品牌不同
	return {
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

		licenseData: {
			defaultScript: '78d12a5a-22e2-428a-b16e-4f2891672b04',
			defaultXCMScript: '226e4de2-30aa-4077-951b-d440012994f3',
		},
		// TODO: 請ＰＭ給pathname
		aboutUsList: [
			{
				displayText: 'Label_General_AboutUs',
				pathname: '',
			},
			{
				displayText: 'Label_General_HowToBet',
				pathname: '',
			},
			{
				displayText: 'Label_General_HelpAndFAQ',
				pathname: '',
			},
			{
				displayText: 'Label_General_RuleRegulations',
				pathname: '',
			},
			{
				displayText: 'Label_General_TermsOfUse',
				pathname: '',
			},
			{
				displayText: 'Label_General_PrivacyPolicy',
				pathname: '',
			},
			{
				displayText: 'Label_General_TermsConditions',
				pathname: '',
			},
			{
				displayText: 'Label_General_ResponsibleGaming',
				pathname: '',
			},
			{
				displayText: 'Label_General_ContactUs',
				pathname: '',
			},
			{
				displayText: 'Label_General_Careers',
				pathname: '',
			},
			{
				displayText: 'Label_General_Sitemap',
				pathname: '',
			},
		],
	}
}
