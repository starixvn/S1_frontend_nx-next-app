import { useLazyFpsChecksQuery } from '@nx-next-app/service'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const useFpsChecks = ({
	isLogin,
	interval = 60000,
}: {
	isLogin?: boolean
	interval?: number
}) => {
	const [isSent, setIsSent] = useState(false)
	const [sendFpsChecks] = useLazyFpsChecksQuery()

	useInterval(
		async () => {
			try {
				const values = ['__di', '__bi', 'detecas-analysis'].map(
					id => (document.getElementById(id) as HTMLInputElement)?.value
				)
				if (values.some(value => typeof value !== 'string')) return

				const [di, bi, detecasAnalysis] = values
				const url = window.location.href
				await sendFpsChecks({ di, bi, detecasAnalysis, url }).unwrap()

				setIsSent(true)
			} catch {
				// 忽略
			}
		},
		isLogin && isSent === false ? interval : null
	)
}

export { useFpsChecks }
