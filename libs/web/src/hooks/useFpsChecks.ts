import { useLazyFpsChecksQuery } from '@nx-next-app/service'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const getInputValueByName = (name: string) =>
	(document.getElementsByName(name)?.[0] as HTMLInputElement).value || ''

const useFpsChecks = ({
	isLogin,
	interval = 10000,
}: {
	isLogin?: boolean
	interval?: number
}) => {
	const [isSent, setIsSent] = useState(false)
	const [sendFpsChecks] = useLazyFpsChecksQuery()

	useInterval(
		async () => {
			try {
				const di = getInputValueByName('__di')
				const bi = getInputValueByName('__bi')
				const detecasAnalysis = getInputValueByName('detecas-analysis')
				// 取得這 3 個值後再送
				if (![di, bi, detecasAnalysis].every(Boolean)) return

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

				setIsSent(true)
			} catch {
				// 忽略
			}
		},
		isLogin && !isSent ? interval : null
	)
}

export { useFpsChecks }
