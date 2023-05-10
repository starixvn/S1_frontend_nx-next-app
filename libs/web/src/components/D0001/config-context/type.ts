export interface LangData {
	langGroups: {
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
		}>
	}
	currencyToLangKey: { [key: number]: string }
	langGroupCountry: { [key: string]: string }
}

export interface IVipClubImage {
	url: string
	displayKey: string
	alt: string
}
