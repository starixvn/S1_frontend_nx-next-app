import { PREV_PAGE, PrevPageEnum } from '@nx-next-app/constants'
import { usePhoneOtp } from '@nx-next-app/hooks'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

export const usePhoneOtpModal = () => {
	// ====== hook ======
	const { query } = useRouter()

	const { prevPage } = query

	const { formState, trigger, setError, register, getValues, handleSubmit } =
		useForm()
	const { errors } = formState

	const { timer, startUnixTime, setTimer, handleSendOtpSMS, handleVerifyOtp } =
		usePhoneOtp()

	// ====== 函數 ======

	const handleSubmitForm = async (
		prevPageConfirmCallBack: (
			path: string,
			contentKey: string,
			submitKey: string
		) => void,
		closeModal: () => void
	) => {
		const otpCode = getValues('otpCode')
		const errorMsg = await handleVerifyOtp({
			otpCode,
			callbackFn: () => {
				if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]
					prevPageConfirmCallBack(path, contentKey, submitKey)
				} else {
					closeModal()
				}
			},
		})
		if (errorMsg) setError('otpCode', { type: 'manual', message: errorMsg })
	}

	return {
		timer,
		errors,
		startUnixTime,
		trigger,
		register,
		setTimer,
		handleSubmit,
		handleSubmitForm,
		handleSendOtpSMS,
	}
}
