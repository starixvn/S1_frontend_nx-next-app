export interface IGetNewsArgs {
	langId: string
	pageNumber: number
	pageSize: number
	currencyId: number
}

export interface INewsData {
	content: string
	imageURL: string
	newsId: number
	postTime: string
	sort: number
	title: string
}
