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
			let custId: string | undefined
			let category: string | undefined
			if (isLogin) {
				custId = String(userInfo.custId)
			}
			OptimovePageVisitEvent(category, custId)
		}
	}, [isMounted])
}

export { useOptimovePageEvent }
