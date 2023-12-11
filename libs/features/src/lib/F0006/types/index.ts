export enum CategoryEnum {
	SPORTS = 1,
	SLOTS,
	LIVE_CASINO,
	FISHING,
	COCKFIGHTING,
	LOTTERY,
	VIRTUAL_SPORTS,
	POKER,
}

export enum SocialChannelEnum {
	HOME = 1,
	CONTACT_US,
	APP,
	FOOTER,
}

export const footerImgName: Record<string, string> = {
	Youtube: 'yta.png',
	Telegram: 'tga.png',
	Facebook: 'fba.png',
	Twitter: 'twa.png',
	Instagram: 'ina.png',
	Pinterest: 'pta.png',
	WhatsApp: 'waa.png',
	'E-mail': 'ema.png',
	Livechat: 'chat.png',
	LINE: 'line.png',
}

export enum GameTypeEnum {
	All,
}

export const channelIconClass: { [channelName: string]: string } = {
	Livechat: 'icon icon icon-chat',
	WhatsApp: 'icon icon-whatsapp',
	Telegram: 'icon icon-telegram',
	'E-mail': 'icon icon icon-envelope',
	Facebook: 'icon icon-facebook2',
	Twitter: 'icon icon-twitter',
	Instagram: 'icon icon-instagram',
	LINE: 'icon icon-line',
	Youtube: 'icon icon-youtube',
}

export enum WithdrawalStatusEnum {
	Pending = 1,
	OnHold,
	Verify,
	Process,
	Cancelled,
	Approved,
	Rejected,
	ToKyc,
}

export const statusClassNames: { [status: number]: string } = {
	[WithdrawalStatusEnum.Pending]: 'pending',
	[WithdrawalStatusEnum.OnHold]: 'pending',
	[WithdrawalStatusEnum.Verify]: 'pending',
	[WithdrawalStatusEnum.Process]: 'pending',
	[WithdrawalStatusEnum.Cancelled]: 'cancel',
	[WithdrawalStatusEnum.Approved]: 'approved',
	[WithdrawalStatusEnum.Rejected]: 'reject',
	[WithdrawalStatusEnum.ToKyc]: 'pending',
}

// 前端用來管理 withdrawal 介面狀態的 enum
export enum WithdrawalPanelStatusEnum {
	Init,
	Confirm,
}

// 僅用於前端判斷卡片類型使用的 enum
export enum WithdrawalBankCardEnum {
	Undefined,
	LocalBank,
	EWallet,
	Crypto,
}

// 僅用於前端判斷 kyc 狀態的 enum
export enum KycStatusEnum {
	Normal,
	KycUpload,
	KycPending,
}

export * from './home'
