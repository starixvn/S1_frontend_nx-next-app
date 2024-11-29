// 根據 Admin 新的 bonusType 調整
export enum PromotionTypeEnum {
	FirstDeposit = 1,
	Redeposit = 2,
	FreeBet = 3,
	WalletBonus = 5,
	Rebate = 6,
	Cashback = 7,
	SpecialBonus = 8,
	RetentionFreeBet = 9,
	PredictionEvent = 12,

	MissionBonus = 11,
	PromoCode = 9001,
}

export enum PromotionStatusEnum {
	Running = 1,
	Canceled,
	Expiry,
	Fulfill,
	TransferOut,
}

export enum PromotionFilterEnum {
	All,
	NewMember,
	Special,
	SportBook,
	Casino,
	Slot,
	PromoCode,
}

export enum PromotionCategoryIdEnum {
	BonusWallet = 0,
	Slots,
	LiveCasino,
	Fish,
	SabaSports,
	Lottery,
	Sports,
	PtSlots,
	PtLiveCasino,
	SBSW,
	Mega888SlotRNGFishing,
	ESports,
	SportAndSlot = 16,
	SlotAndLiveCasino = 17,
	LiveCasinoAndSport = 18,
	ALLCategory = 19,
	//  ( exclude Lottery and Fishing)
}

export enum PromotionWalletType {
	Transfer = 0,
	Seamless,
}

export enum PromotionPeriodType {
	Daily = 1,
	Weekly,
	Monthly,
}

export enum PromotionActionType {
	Link = 0,
	Detail,
}
