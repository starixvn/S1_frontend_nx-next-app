interface IGetSafetyLvProps {
	phoneVerification: {
		exist: boolean
		value?: boolean
	}
	emailVerification: {
		exist: boolean
		value?: boolean
	}
}

export const getSafetyLv = ({
	phoneVerification,
	emailVerification,
}: IGetSafetyLvProps) => {
	let safetyLv = 1
	let verifyLv = 1
	let safetyDisplayKey = ''
	// 是否有驗證phone，有的話再判斷是否通過
	if (phoneVerification.exist) {
		verifyLv += 1
		if (phoneVerification.value) {
			safetyLv += 1
		}
	}
	// 是否有驗證email，有的話再判斷是否通過
	if (emailVerification.exist) {
		verifyLv += 1
		if (emailVerification.value) {
			safetyLv += 1
		}
	}

	if (safetyLv === 1) {
		safetyDisplayKey = 'Label_Profile_Weak' // 都沒有驗證通過
	} else if (safetyLv === verifyLv) {
		safetyDisplayKey = 'Label_Profile_Excellent' // 都驗證通過
	} else {
		safetyDisplayKey = 'Label_Profile_Normal' // 部分驗證通過
	}

	return { safetyLv, safetyDisplayKey }
}
