import { InputBox } from '@12b-indo-h5/components/common'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

const LoginForm = () => {
	const { t } = useTranslation()

	const { register, formState, trigger } = useFormContext()
	const { errors, touchedFields } = formState

	return (
		<div className='form-content'>
			<InputBox
				register={register('userName', {
					required: {
						value: true,
						message: t('Label_General_UsernameReq'),
					},
					onBlur: () => trigger('userName'),
				})}
				touched={!!touchedFields['userName']}
				// icon='icon-member'
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
				// icon='icon-key'
				placeholder={t('Label_General_Password') || ''}
				error={!!errors['password']}
				errorMessage={errors['password']?.message as string}
			/>
			<div className='Terms'>
				<Link href={paths.forgetPassword.root}>
					<a>{t('Label_General_ForgetPassword')}</a>
				</Link>
			</div>
			<div className='btn-group'>
				<button type='submit' className='primary'>
					{t('Label_General_LogIn')}
				</button>
			</div>
			<div className='tip-join'>
				{t('Label_Join_DontHaveAccount')}
				<Link href={paths.join.root}>{t('Label_General_JoinNow')}</Link>
			</div>
		</div>
	)
}

export { LoginForm }
