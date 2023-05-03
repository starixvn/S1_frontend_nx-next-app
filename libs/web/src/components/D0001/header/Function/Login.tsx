import { FieldErrors, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Form from '../../form'

export type LoginFormType = {
	userName: string
	password: string
}

export interface ILoginProps {
	onLogin: (values: LoginFormType) => void
	onLoginInvalid: (errors: FieldErrors<LoginFormType>) => void
}

const Login = ({ onLogin, onLoginInvalid }: ILoginProps) => {
	const { register, handleSubmit } = useForm<LoginFormType>()
	const { t } = useTranslation()
	return (
		<>
			<Form onSubmit={handleSubmit(onLogin, onLoginInvalid)} component={false}>
				<input
					defaultValue=''
					placeholder='Username'
					{...register('userName', {
						required: { value: true, message: t('Label_UserNameRequired') },
						minLength: { value: 6, message: t('Label_UserNameLength') },
						maxLength: { value: 18, message: t('Label_UserNameLength') },
					})}
				/>
				<input
					defaultValue=''
					type='password'
					placeholder='Password'
					{...register('password', {
						required: { value: true, message: t('Label_PasswordRequired') },
					})}
				/>
			</Form>

			<button
				type='button'
				className='login'
				onClick={handleSubmit(onLogin, onLoginInvalid)}
			>
				{t('Label_LogIn')}
			</button>
			<Link href='join'>
				<button type='button' className='join'>
					{t('Label_Join')}
				</button>
			</Link>
		</>
	)
}

export default Login
