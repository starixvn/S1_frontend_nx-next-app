export const TERMS_CONDITIONS = ({ langId }: { langId: string }) => {
	const termsConditions = {
		TermsConditions: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/TermsConditions.html`,
		OurPolicies: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AccountTerms.html`,
		FAQ: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/FAQ.html`,
		AboutUs: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
		Terms: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`,
		ContactUs: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
		ResposibleGaming: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`,
	}

	return termsConditions
}
