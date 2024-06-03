import { useEffect, useState } from 'react'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import {
	useGetPromotionDetailQuery,
	useLazyGetRetentionPromotionQuery,
} from '@nx-next-app/service'
import { getPromotionPercentage } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

export const useRetentionLandingPage = () => {
	const { push } = useRouter()
	const { modal } = useGlobalModal()

	const [retentionBonusCode, setRetentionBonusCode] = useState<
		string | undefined
	>(undefined)

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const [getRetentionPromotion, { isLoading: isGetRetentionPromotionLoading }] =
		useLazyGetRetentionPromotionQuery()

	const {
		data: { data: promotionDetail } = {},
		isLoading: isGetPromotionDetailLoading,
	} = useGetPromotionDetailQuery(
		{
			currencyId,
			langId,
			bonusCode: retentionBonusCode as string,
		},
		{
			skip: !retentionBonusCode,
		}
	)

	const { custTurnOver = 0, custRollOver = 0 } = promotionDetail ?? {}

	// progress bar logics
	const percentage = getPromotionPercentage({
		turnOver: custTurnOver,
		rollOver: custRollOver,
	})

	useEffect(() => {
		const init = async () => {
			try {
				const { data: { bonusCode = null } = {} } = await getRetentionPromotion(
					{ langId }
				).unwrap()
				if (bonusCode) {
					setRetentionBonusCode(bonusCode)
				} else {
					// 如果沒 bonusCode , 需要正確導回去 LuckyWheel
					push(paths.luckyWheel.root)
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		if (langId) {
			init()
		}
	}, [langId])

	const loading = isGetRetentionPromotionLoading || isGetPromotionDetailLoading

	return {
		loading,
		retentionBonusCode,
		promotionDetail,
		percentage,
	}
}
