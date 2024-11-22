import { useLazyFpsChecksQuery } from '@nx-next-app/service'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const getInputValueById = (id: string) =>
	(document.getElementById(id) as HTMLInputElement)?.value || ''

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
				const di = getInputValueById('__di')
				const bi = getInputValueById('__bi')
				const detecasAnalysis = getInputValueById('detecas-analysis')

				// 取得這 3 個值後再送
				if (![di, bi, detecasAnalysis].every(Boolean)) return

				const sessionKey = getInputValueById('__fdi')
				const token = getInputValueById('__tk')
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
