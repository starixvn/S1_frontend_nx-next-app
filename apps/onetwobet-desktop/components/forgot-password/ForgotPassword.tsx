import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import EmailSent from './EmailSent'
import ForgetPasswordForm from './ForgotPasswordForm'
import ResetPasswordWithOtp from './ResetPasswordWithOtp'

enum Step {
	Form,
	EmailSent,
	OtpSent,
}

const ForgetPassword = ({ onCancel }: { onCancel: () => void }) => {
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
						onCancel={onCancel}
					/>
				)
		}
	}

	return <FormProvider {...form}>{renderStep()}</FormProvider>
}

export default ForgetPassword
