import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AREA_CODE, CURRENCY_TO_LANG_KEY, paths } from '@nx-next-app/constants'
import {
	useResetPwdByOTPMutation,
	useResetPwdVerifyOTPMutation,
} from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ForgetPasswordStepEnum } from '@nx-next-app/features/F0006/types'
import {
	ForgetPasswordForm,
	ForgetPasswordFormType,
} from './ForgetPasswordForm'
import { ResetPasswordForm, ResetPasswordFormType } from './ResetPasswordForm'

const ForgetPassword = () => {
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const [step, setStep] = useState(ForgetPasswordStepEnum.ForgetPassword)
	const [OTPUserName, setOTPUserName] = useState<string>('')
	const [resetPwdByOTP] = useResetPwdByOTPMutation()

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
		<main>
			<section className='inside'>
				<div className='rightModule'>
					<div className='loginpop'>
						<div className='joinloginModule'>
							<div className='loginAnimation'>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/forgetpasswordbg.png`}
									alt='forget-password-background'
									width={439}
									height={400}
									style={{ width: '439px', height: '400px' }}
								/>
							</div>
							{step === ForgetPasswordStepEnum.ForgetPassword && (
								<ForgetPasswordForm onSubmit={getOTP} />
							)}
							{step === ForgetPasswordStepEnum.ResetPassword && (
								<ResetPasswordForm
									loading={isResetPwdVerifyOTPLoading}
									onSubmit={handleResetPassword}
								/>
							)}
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ForgetPassword
