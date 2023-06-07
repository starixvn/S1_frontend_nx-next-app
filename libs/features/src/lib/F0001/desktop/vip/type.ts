export interface IVipEventCurrenciesLimitationInfo {
	[key: number]: {
		dailyWithdrawalLimitation: (number | null)[]
		tierUpGradeBonus: (number | null)[]
		monthlyMinimumDeposit: (number | null)[]
		minimumDepositWithinValidityPeriod: (number | null)[]
		minimumTurnoverWithinValidityPeriod: (number | null)[]
	}
}
