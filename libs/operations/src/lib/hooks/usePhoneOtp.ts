import { OtpErrorCodeEnum } from '@nx-next-app/constants'
import {
	useSendOTPSMSMutation,
	useVerifyOTPMutation,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const usePhoneOtp = () => {
	const { t } = useTranslation()

	const [timer, setTimer] = useState<boolean>(false)

	const [sendOtpSMS, { data: { data: { startUnixTime = 0 } = {} } = {} }] =
		useSendOTPSMSMutation()

	const [verifyOtp] = useVerifyOTPMutation()

	const handleVerifyOtp = async ({
		otpCode,
		callbackFn,
	}: {
		otpCode: string
		callbackFn?: () => void
	}) => {
		let errorMsg = ''

		try {
			const { errorCode } = await verifyOtp({ otpCode }).unwrap()

			if (errorCode === 0 && callbackFn) callbackFn()
		} catch (error) {
			const { errorCode, message } =
				(error as {
					errorCode: number
					message: string
					status: number
				}) || {}

			errorMsg = message
			if (errorCode === OtpErrorCodeEnum.WrongPhoneNumber) {
				errorMsg = t('Label_Profile_APISendOTPSMS_5002')
			} else {
				errorMsg = t('Label_Profile_OTPInvalid')
			}
		}
		return errorMsg
	}

	const handleSendOtpSMS = async (errorCallBack: (message: string) => void) => {
		try {
			await sendOtpSMS().unwrap()
			setTimer(true)
		} catch (error) {
			const { message } = (error as { message: string }) || {}
			errorCallBack(message)
		}
	}

	return {
		timer,
		startUnixTime,
		setTimer,
		sendOtpSMS,
		handleVerifyOtp,
		handleSendOtpSMS,
	}
}

export { usePhoneOtp }
