import {
	CaptchaActionTypeEnum,
	useLazyGetNumberCaptchaQuery,
} from '@nx-next-app/service'
import { useEffect } from 'react'

export const FallbackCaptcha = () => {
	const [trigger, response] = useLazyGetNumberCaptchaQuery()
	const { data: numberCaptcha } = response?.data || {}

	const refreshCaptcha = () => trigger({ action: CaptchaActionTypeEnum.signup })

	useEffect(() => {
		refreshCaptcha()
	}, [])

	useEffect(() => {
		const { seconds } = numberCaptcha || {}
		if (!seconds) return

		const timer = setTimeout(refreshCaptcha, seconds * 1000)
		return () => clearTimeout(timer)
	}, [numberCaptcha])

	if (!numberCaptcha) return null

	return (
		<button onClick={refreshCaptcha} type='button'>
			<img
				src={`data:image/png;base64,${numberCaptcha.picture}`}
				alt='captcha'
			/>
		</button>
	)
}
