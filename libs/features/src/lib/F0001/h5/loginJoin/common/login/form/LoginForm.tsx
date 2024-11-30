import { InputBox } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { WrapperLoginRegister } from '@nx-next-app/features/F0001/h5/loginJoin/styles'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

const LoginForm = () => {
	const { t } = useTranslation()

	const { register, formState, trigger } = useFormContext()
	const { errors, touchedFields } = formState

	return (
		<WrapperLoginRegister>
			<div className='Login active'>
				<InputBox
					register={register('userName', {
						required: {
							value: true,
							message: t('Label_General_UsernameReq'),
						},
						onBlur: () => trigger('userName'),
					})}
					touched={!!touchedFields['userName']}
					icon='icon-user-line'
					infoMessage={t('Label_General_UsernameTooltip') || ''}
					placeholder={t('Label_General_Username') || ''}
					error={!!errors['userName']}
					errorMessage={errors['userName']?.message as string}
				/>
				<InputBox
					password
					register={register('password', {
						required: {
							value: true,
							message: t('Label_General_PasswordRequired'),
						},
						onBlur: () => trigger('password'),
					})}
					touched={!!touchedFields['password']}
					icon='icon-lock-password-line'
					placeholder={t('Label_General_Password') || ''}
					error={!!errors['password']}
					errorMessage={errors['password']?.message as string}
				/>
				<div className='Terms'>
					<Link href={paths.forgetPassword.root}>
						<a>{t('Label_General_ForgetPassword')}</a>
					</Link>
				</div>
			</div>
			<div className='btn-group'>
				<button type='submit' className='btn-primary'>
					{t('Label_General_LogIn')}
				</button>
			</div>
		</WrapperLoginRegister>
	)
}

export { LoginForm }
