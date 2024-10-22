import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Header } from '../common'
import EmailSent from './EmailSent'
import ForgetPasswordForm from './ForgotPasswordForm'
import ResetPasswordWithOtp from './ResetPasswordWithOtp'

enum Step {
	Form,
	EmailSent,
	OtpSent,
}

const ForgetPassword = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const [step, setStep] = useState(Step.Form)

	// 用來存取 ResetPasswordWithOtp 需要的 username
	const form = useForm()

	const renderStep = () => {
		switch (step) {
			case Step.EmailSent:
				return <EmailSent onBack={() => setStep(Step.Form)} />
			case Step.OtpSent:
				return <ResetPasswordWithOtp onBack={() => setStep(Step.Form)} />
			default:
				return (
					<ForgetPasswordForm
						onOtpSent={() => setStep(Step.OtpSent)}
						onEmailSent={() => setStep(Step.EmailSent)}
						onCancel={() => router.push(paths.home.root)}
					/>
				)
		}
	}

	return (
		<FormProvider {...form}>
			<Header className='header'>
				<Header.Tag title={t('Label_General_ForgetPsw') as string} />
			</Header>
			<main className='main forget-password'>
				<div className='form-module'>{renderStep()}</div>
			</main>
		</FormProvider>
	)
}

export default ForgetPassword
