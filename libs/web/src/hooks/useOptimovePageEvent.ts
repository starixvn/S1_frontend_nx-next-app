import { useIsMounted } from 'usehooks-ts'
import { useEffect } from 'react'
import { IUserInfoData } from '@nx-next-app/service'
import { OptimovePageVisitEvent } from '@nx-next-app/utils'

const useOptimovePageEvent = (
	isLogin: boolean | undefined,
	userInfo: IUserInfoData
) => {
	const isMounted = useIsMounted()
	useEffect(() => {
		// isMounted 確保用戶確實 visit page 並完成載入才做 event 推送
		if (isMounted()) {
			let custId: string | null = null
			// 還沒編列 Category，先固定都給 null
			const category: string | null = null
			if (isLogin && userInfo.custId !== undefined) {
				custId = String(userInfo.custId)
			}
			OptimovePageVisitEvent(category, custId)
		}
	}, [isMounted, isLogin, userInfo.custId])
}

export { useOptimovePageEvent }
