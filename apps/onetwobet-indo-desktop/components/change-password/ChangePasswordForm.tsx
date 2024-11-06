import { InputBox } from '@12b-indo-desktop/components/common'
import { PASSWORD_REGEX } from '@nx-next-app/constants'
import { TChangePasswordForm } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

interface IChangePasswordFormProps {
	onSubmit: (value: TChangePasswordForm) => void
	changePasswordForm: UseFormReturn<TChangePasswordForm>
	isPopup: boolean
}

const ChangePasswordForm = ({
	onSubmit,
	changePasswordForm,
	isPopup,
}: IChangePasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit, formState } = changePasswordForm
	const { errors, touchedFields, isSubmitting, isDirty, isValid } = formState

	return (
		<form
			className={classNames({
				changePassWord: !isPopup,
				resetPassWord: isPopup,
			})}
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(onSubmit)
			}}
		>
			<InputBox
				register={register('oldPassword', {
					// 舊密碼不用驗證 PASSWORD_REGEX 因後台 reset 亂數產生碼是六位數英文數字(ex:有可能全英 違反正規)
					required: {
						value: true,
						message: t('Label_ChangePassword_PasswordReq'),
					},
				})}
				password
				title={t('Label_ChangePassword_OldPassword') || ''}
				touched={!!touchedFields['oldPassword']}
				errorMessage={errors['oldPassword']?.message as string}
				error={!!errors['oldPassword']}
			/>
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
				title={t('Label_ChangePassword_NewPassword') || ''}
				touched={!!touchedFields['newPassword']}
				errorMessage={errors['newPassword']?.message as string}
				error={!!errors['newPassword']}
			/>

			<div className='btnGroup'>
				<button
					className='primary'
					onClick={handleSubmit(onSubmit)}
					type='submit'
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
