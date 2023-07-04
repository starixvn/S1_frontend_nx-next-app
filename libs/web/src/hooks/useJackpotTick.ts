import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInterval from 'libs/web/src/hooks/useInterval'

const ANIMATION_LOOP_MILLISECOND = 2000

const DELAY_MILLISECOND = 800

const useJackPotTick = ({
	ref,
	currencyId,
}: {
	ref: any
	currencyId: number
}) => {
	const { t } = useTranslation()
	const [currentText, setCurrentText] = useState('')
	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false)

	useInterval(() => {
		try {
			const jackpotCurrency =
				currencyId === 13
					? 'cny'
					: t(`Label_General_Currency_${currencyId}`)?.toLowerCase()

			// @ts-ignore
			const ticker = new Ticker({
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
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e)
			setIsJackPotLoaded(false)
		}
	}, 1000)

	useInterval(() => {
		const [_currentText] = String(ref?.current?.innerText).split(' ')

		setCurrentText(_currentText)
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND)

	return { isJackPotLoaded, currentText }
}

export { useJackPotTick, ANIMATION_LOOP_MILLISECOND, DELAY_MILLISECOND }
