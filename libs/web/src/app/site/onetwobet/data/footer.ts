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
