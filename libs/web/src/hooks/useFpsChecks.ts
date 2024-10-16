import { useLazyFpsChecksQuery } from '@nx-next-app/service'
import { useRef } from 'react'
import { useInterval } from 'usehooks-ts'

const useFpsChecks = ({
	isLogin,
	interval = 60000,
}: {
	isLogin?: boolean
	interval?: number
}) => {
	const isSent = useRef(false)
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

				isSent.current = true
			} catch {
				// 忽略
			}
		},
		isLogin && isSent.current === false ? interval : null
	)
}

export { useFpsChecks }
