import { useLazyFpsChecksQuery } from '@nx-next-app/service'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const getInputValueByName = (name: string) =>
	(document.getElementsByName(name)?.[0] as HTMLInputElement)?.value || ''

const useFpsChecks = ({
	isLogin,
	interval = 10000,
}: {
	isLogin?: boolean
	interval?: number
}) => {
	const [sendFpsChecks] = useLazyFpsChecksQuery()
	const [isChecked, setIsChecked] = useState(false) // fps是否已經發送過check了

	useInterval(
		async () => {
			try {
				const fpsNeededToCheck = localStorage.getItem('fpsNeededToCheck')
				if (!fpsNeededToCheck) return setIsChecked(true) // 如果localStorage沒有fpsNeededToCheck，就代表不需要check，後面也就不需要執行了

				const di = getInputValueByName('__di')
				const bi = getInputValueByName('__bi')
				const detecasAnalysis = getInputValueByName('detecas-analysis')
				const sessionKey = getInputValueByName('__fdi')
				const token = getInputValueByName('__tk')
				const url = window.location.href

				await sendFpsChecks({
					di,
					bi,
					detecasAnalysis,
					sessionKey,
					token,
					url,
				}).unwrap()
				localStorage.removeItem('fpsNeededToCheck') // 已經發出check之後就不用再保留storage佔位置了
			} catch {
				// 忽略
			}
		},
		isLogin && !isChecked ? interval : null
	)
}
export { useFpsChecks }
