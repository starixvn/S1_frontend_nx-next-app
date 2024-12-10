import Adjust from '@adjustcom/adjust-web-sdk'
import { useEffect } from 'react'

export const useInitAdjustSDK = () => {
	// 初始化 SDK
	useEffect(() => {
		Adjust.initSdk({
			appToken: 'YOUR_APP_TOKEN',
			environment: 'sandbox',
		})
	}, [])
}
