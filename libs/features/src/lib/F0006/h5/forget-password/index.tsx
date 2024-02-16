import { useState } from 'react'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	useResetPwdByOTPMutation,
	useResetPwdVerifyOTPMutation,
} from '@nx-next-app/service'
import { Header } from '@nx-next-app/components/H0006'
import { useTranslation } from 'next-i18next'
import { ForgetPasswordStepEnum } from '@nx-next-app/features/F0006/types'
import { AREA_CODE, CURRENCY_TO_LANG_KEY, paths } from '@nx-next-app/constants'
import {
	ForgetPasswordForm,
	ForgetPasswordFormType,
} from './ForgetPasswordForm'
import { ResetPasswordForm, ResetPasswordFormType } from './ResetPasswordForm'

const ForgetPassword = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const [step, setStep] = useState(ForgetPasswordStepEnum.ForgetPassword)
	const [OTPUserName, setOTPUserName] = useState<string>('')
	const [resetPwdByOTP, { isLoading: isResetPwdByOTPLoading }] =
		useResetPwdByOTPMutation()

	const [resetPwdVerifyOTP, { isLoading: isResetPwdVerifyOTPLoading }] =
		useResetPwdVerifyOTPMutation()

	const getOTP = async ({ userName, phone }: ForgetPasswordFormType) => {
		try {
			const { errorCode } = await resetPwdByOTP({
				userName,
				phoneNo: phone,
				areaCode:
					AREA_CODE[CURRENCY_TO_LANG_KEY[currencyId].toUpperCase()].AreaCode,
			}).unwrap()
			if (errorCode === 0) {
				setStep(ForgetPasswordStepEnum.ResetPassword)
				setOTPUserName(userName)
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleResetPassword = async ({
		otpCode,
		password,
	}: ResetPasswordFormType) => {
		try {
			const { errorCode, message } = await resetPwdVerifyOTP({
				inputOTPcode: otpCode,
				userName: OTPUserName,
				newPassword: password,
			}).unwrap()
			if (errorCode === 0) {
				modal.info(message, { onOK: () => push(paths.home.root) })
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<>
			<Header className='header'>
				<Header.Tag title={t('Label_ForgetPsw') as string} />
			</Header>
			<main className='main'>
				{step === ForgetPasswordStepEnum.ForgetPassword && (
					<ForgetPasswordForm
						loading={isResetPwdByOTPLoading}
						onSubmit={getOTP}
					/>
				)}
				{step === ForgetPasswordStepEnum.ResetPassword && (
					<ResetPasswordForm
						loading={isResetPwdVerifyOTPLoading}
						onSubmit={handleResetPassword}
					/>
				)}
			</main>
		</>
	)
}

export default ForgetPassword
