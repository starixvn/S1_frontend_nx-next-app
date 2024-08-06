/* eslint-disable react/self-closing-comp */ // << 設計的線是使用空div標籤，搭配 className，但 esLint 會報錯，所以先關掉此規則
import { InputBox } from '@nx-next-app/components/D0001'
import { PASSWORD_REGEX } from '@nx-next-app/constants'
import { TChangePasswordForm } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

interface IChangePasswordFormProps {
	onSubmit: (value: TChangePasswordForm) => void
	changePasswordForm: UseFormReturn<TChangePasswordForm>
}

const ChangePasswordForm = ({
	onSubmit,
	changePasswordForm,
}: IChangePasswordFormProps) => {
	// ====== hook =====
	const { t } = useTranslation()

	const { register, handleSubmit, formState } = changePasswordForm
	const { errors, touchedFields, isSubmitting, isDirty, isValid } = formState

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(onSubmit)
			}}
			className='changepassword-content'
		>
			<div className='resetPassWord'>
				<InputBox
					register={register('oldPassword', {
						// 舊密碼不用驗證 PASSWORD_REGEX 因後台 reset 亂數產生碼是六位數英文數字(ex:有可能全英 違反正規)
						required: {
							value: true,
							message: t('Label_ChangePassword_PasswordReq'),
						},
					})}
					password
					touched={!!touchedFields['oldPassword']}
					errorMessage={errors['oldPassword']?.message as string}
					error={!!errors['oldPassword']}
				/>
			</div>
			<div className='resetPassWord'>
				<InputBox
					register={register('newPassword', {
						required: {
							value: true,
							message: t('Label_ChangePassword_PasswordReq'),
						},
						pattern: {
							value: PASSWORD_REGEX,
							message: t('Label_General_PasswordValidate'),
						},
					})}
					password
					touched={!!touchedFields['newPassword']}
					errorMessage={errors['newPassword']?.message as string}
					error={!!errors['newPassword']}
				/>
			</div>
			<div className='btnGroup'>
				<button
					className='btn-check'
					type='submit'
					onClick={handleSubmit(onSubmit)}
					// 有輸入 => 驗證有通過 => 防連點
					disabled={!isDirty || !isValid || isSubmitting}
				>
					{t('Label_General_Submit')}
				</button>
			</div>
		</form>
	)
}

export { ChangePasswordForm }
