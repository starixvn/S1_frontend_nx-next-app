import { IDepositCashierQRCodeInfo } from '@nx-next-app/service'

export interface ISEOData {
	siteId: number
	title: string
	meta: string
	defaultLang: string
	activeDomain: true
	keyword: string
	followUs: null
	paymentMethod: null
	script: string
	xcmScript: string
	description: string
	links: object[]
}

export interface IDepositMobilePayBankQRModalProps {
	convertedAmount: number
	qrUrl: string
	channelName?: string
}

export interface IDepositLocalPayEWalletQRModalProps {
	convertedAmount: number
	qrUrl: string
	transId: string
}

export interface IDepositQRCodeModalProps {
	title: string
	convertedAmount: number
	info: IDepositCashierQRCodeInfo
}

export type TStaticFileDomainData = {
	bannerDomain: string
	paymentDomain: string
	imgDomain: string
}
