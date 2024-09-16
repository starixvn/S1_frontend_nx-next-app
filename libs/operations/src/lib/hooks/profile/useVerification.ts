import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { getSafetyLv } from '@nx-next-app/utils'

export const useVerification = () => {
	// ====== hook ======
	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()
	const {
		userInfo: {
			userLevel,
			currencyId,
			emailReward,
			phoneReward,
			accountName,
			currencyName,
			phoneVerified,
			emailVerified,
			isLineBinding,
		},
	} = useAuth()

	// 取得 LINE 登錄綁定 URL 的查詢
	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	/** 用戶 VIP 等級對應的圖片 */
	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1 ?? 0]

	/** 處理 LINE 綁定的邏輯 */
	const handleLineBinding = async (
		errorCallBack: (message: string) => void
	) => {
		if (isLineBinding) return
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Binding,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			errorCallBack((error as Error).message)
		}
	}

	// 計算賬戶安全等級
	const phoneVerification = { exist: true, value: phoneVerified }
	const emailVerification = { exist: true, value: emailVerified }
	const { safetyLv, safetyDisplayKey } = getSafetyLv({
		phoneVerification,
		emailVerification,
	})

	return {
		userLevelImageInfo,
		safetyLv,
		safetyDisplayKey,
		ALLOWED_CURRENCIES,
		accountName,
		currencyId,
		currencyName,
		emailReward,
		phoneReward,
		phoneVerified,
		emailVerified,
		isLineBinding,
		handleLineBinding,
	}
}
