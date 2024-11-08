import { Form, InputBox } from '@12b-indo-h5/components/common'
import { PASSWORD_REGEX, paths } from '@nx-next-app/constants'
import { TChangePasswordForm } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

interface IChangePasswordFormProps {
	onSubmit: (value: TChangePasswordForm) => void
	changePasswordForm: UseFormReturn<TChangePasswordForm>
}

const ChangePasswordForm = ({
	onSubmit,
	changePasswordForm,
}: IChangePasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit, formState } = changePasswordForm
	const { errors, touchedFields, isSubmitting, isDirty, isValid } = formState
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputBox
				register={register('oldPassword', {
					// 舊密碼不用驗證 PASSWORD_REGEX 因後台 reset 亂數產生碼是六位數英文數字(ex:有可能全英 違反正規)
					required: {
						value: true,
						message: t('Label_ChangePassword_PasswordReq'),
					},
				})}
				icon='icon-key'
				password
				placeholder={t('Label_ChangePassword_OldPassword') || ''}
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
				icon='icon-key'
				password
				placeholder={t('Label_ChangePassword_NewPassword') || ''}
				touched={!!touchedFields['newPassword']}
				infoMessage={t('Label_General_PasswordValidate') || ''}
				errorMessage={errors['newPassword']?.message as string}
				error={!!errors['newPassword']}
			/>

			<div className='btn-group'>
				<Link href={paths.profile.root}>
					<button type='button' className='cancel ghost'>
						{t('Label_General_Back')}
					</button>
				</Link>
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
		</Form>
	)
}

export { ChangePasswordForm }
