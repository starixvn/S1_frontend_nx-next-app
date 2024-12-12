import { InputBox } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PASSWORD_REGEX } from '@nx-next-app/constants'
import {
	TChangePasswordForm,
	useChangePasswordFetcher,
} from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const ChangePasswordForm = () => {
	// ====== hook =====
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher()
	const { reset, register, handleSubmit, formState } = changePasswordForm
	const { errors, touchedFields, isSubmitting, isDirty, isValid } = formState

	// ====== 函數 ======

	const showErrorModal = (message: string) => {
		modal.error(message)
	}

	const showInfoModal = () => {
		modal.info(
			[
				t('Label_ChangePassword_ChangePswUpdateSuccess'),
				t('Label_ChangePassword_ChangePswSuccessHint'),
			] as string[],
			{
				icon: 'icon icon-icon32px_password',
				title: t('Label_General_ChangePassword'),
				onOK: reset,
			}
		)
	}

	const onSubmit = (passwordData: TChangePasswordForm) => {
		onSetChangePassword(passwordData, showInfoModal, showErrorModal)
	}

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
