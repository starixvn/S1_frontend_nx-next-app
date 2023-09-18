import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { OtpErrorCodeEnum } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useVerifyOTPMutation,
	useSendOTPSMSMutation,
} from '@nx-next-app/service'

const usePhoneOtp = () => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()

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
			await verifyOtp({ otpCode }).unwrap()

			callbackFn && callbackFn()
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

	const handleSendOtpSMS = async () => {
		try {
			await sendOtpSMS().unwrap()
			setTimer(true)
		} catch (error) {
			modal.error((error as Error).message)
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
