/* eslint-disable import/no-cycle */
import { useTranslation } from 'next-i18next'
import { MutableRefObject, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useAuth } from '@nx-next-app/data-access'

const ANIMATION_LOOP_MILLISECOND = 2000

const DELAY_MILLISECOND = 800

const useJackPot = (ref: MutableRefObject<any>) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	const { currencyId } = userInfo
	const [currentText, setCurrentText] = useState('')
	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false)

	useInterval(async () => {
		try {
			const jackpotCurrency = t(`Label_Currency_${currencyId}`)?.toLowerCase()
			if (window !== undefined) {
				const ticker = new (window as any).Ticker({
					info: 2,
					casino: 'hotspin88am',
					currency: jackpotCurrency,
				})
				if (isJackPotLoaded) return
				if (ticker) {
					setIsJackPotLoaded(true)
					ticker.attachToTextBox('jpot-id')
					ticker.tick()
				}
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e)
			setIsJackPotLoaded(false)
		}
	}, 1000)
	useInterval(() => {
		const [_currentText] = String(ref.current?.innerText).split(' ')
		setCurrentText(_currentText)
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND)

	return { isJackPotLoaded, currentText }
}

export { useJackPot, DELAY_MILLISECOND, ANIMATION_LOOP_MILLISECOND }
