import { useEffect } from 'react'
import { useAuth } from '@nx-next-app/data-access'

/**
 * 傳入 userInfo , 用於判斷 userInfo 裡的參數是否顯示其他畫面(大多是彈窗) ex: isResetPwd memberType 等
 * 之後直播主的 memberType 也從這裡改寫即可
 */

const useGlobalModalEffect = (handleModalEffect: () => void) => {
	const { userInfo } = useAuth()

	useEffect(() => {
		if (userInfo.isResetPwd) {
			handleModalEffect()
		}
	}, [userInfo.isResetPwd])
}

export { useGlobalModalEffect }
