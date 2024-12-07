import { Form, InputBox } from '@nx-next-app/components/H0001'
import { PASSWORD_REGEX, paths } from '@nx-next-app/constants'
import { ChangePasswordFormType } from 'libs/web/src/hooks/useChangePasswordFetcher'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

interface IChangePasswordFormProps {
	onSubmit: (value: ChangePasswordFormType) => void
	changePasswordForm: UseFormReturn<ChangePasswordFormType>
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
				password
				placeholder={t('Label_ChangePassword_NewPassword') || ''}
				touched={!!touchedFields['newPassword']}
				infoMessage={t('Label_General_PasswordValidate') || ''}
				errorMessage={errors['newPassword']?.message as string}
				error={!!errors['newPassword']}
			/>

			<div className='btnGroup'>
				<Link href={paths.profile.root}>
					<a className='btn-secondary'>{t('Label_General_Back')}</a>
				</Link>
				<button
					className='btn-primary'
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
