import { useEffect, useRef } from 'react'

const useInterval = (callback: any, delay: number) => {
	const savedCallback = useRef(null)

	useEffect(() => {
		savedCallback.current = callback
	})

	// @ts-ignore
	useEffect(() => {
		function tick() {
			// @ts-ignore
			savedCallback?.current()
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

export default useInterval
