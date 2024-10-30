export const TERMS_CONDITIONS = ({ langId }: { langId: string }) => {
	const termsConditions = {
		TermsConditions: `/Static/${langId}/TermsConditions.html`,
		OurPolicies: `/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `/Static/${langId}/AccountTerms.html`,
		FAQ: `/Static/${langId}/FAQ.html`,
		AboutUs: `/Static/${langId}/AboutUs.html`,
		Terms: `/Static/${langId}/Terms.html`,
		ContactUs: `/Static/${langId}/ContactUs.html`,
		ResposibleGaming: `/Static/${langId}/ResposibleGaming.html`,
	}

	return termsConditions
}
