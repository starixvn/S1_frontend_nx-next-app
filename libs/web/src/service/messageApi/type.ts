export interface IGetAnnouncementArgs {
	langId: string
	currencyId: number
}

export interface IAnnouncementData {
	content: string
	id: number
	startTime: string
	subject: string
}
