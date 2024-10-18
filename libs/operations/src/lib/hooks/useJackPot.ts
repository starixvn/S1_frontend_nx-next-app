import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

export const useJackPot = (jackpotCurrency: string) => {
	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false)

	useInterval(async () => {
		try {
			if (window !== undefined) {
				if (isJackPotLoaded) return
				const ticker = new (window as any).Ticker({
					info: 2,
					casino: 'hotspin88am',
					currency: jackpotCurrency.toLowerCase(),
				})
				if (ticker) {
					setIsJackPotLoaded(true)
					ticker.attachToTextBox('jpot-id')
					ticker.sign = ''
					ticker.tick()
				}
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e)
			setIsJackPotLoaded(false)
		}
	}, 1000)

	return { isJackPotLoaded }
}
