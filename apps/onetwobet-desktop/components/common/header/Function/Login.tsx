import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FieldErrors, useForm } from 'react-hook-form'
import Form from '../../form'

export type LoginFormType = {
	userName: string
	password: string
}

const ForgotPasswordModal = dynamic(
	() => import('@12b-desktop/components/modal/ForgotPasswordModal'),
	{ ssr: false }
)

export interface ILoginProps {
	onLogin: (values: LoginFormType) => void
	onLoginInvalid: (errors: FieldErrors<LoginFormType>) => void
	onLineLogin?: (() => void) | boolean
}

const Login = ({ onLogin, onLoginInvalid, onLineLogin }: ILoginProps) => {
	const { register, handleSubmit } = useForm<LoginFormType>()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const handleForgetPassword = () => modal.open(<ForgotPasswordModal />)

	const handleLineLogin = () => {
		if (typeof onLineLogin === 'function') onLineLogin()
	}

	return (
		<>
			<div className='username'>
				<Form
					onSubmit={handleSubmit(onLogin, onLoginInvalid)}
					component={false}
				>
					<input
						defaultValue=''
						placeholder={t('Label_General_Username') || ''}
						{...register('userName', {
							required: t('Label_General_UsernameReq'),
							minLength: {
								value: 6,
								message: t('Label_General_UserNameLength'),
							},
							maxLength: {
								value: 18,
								message: t('Label_General_UserNameLength'),
							},
						})}
					/>
					<input
						defaultValue=''
						type='password'
						placeholder={t('Label_General_Password') || ''}
						{...register('password', {
							required: t('Label_General_PasswordRequired'),
						})}
					/>
					<a className='forgot' onClick={handleForgetPassword}>
						{t('Label_Header_ForgetPassword')}
					</a>
				</Form>
			</div>

			<button
				type='button'
				className='login'
				onClick={handleSubmit(onLogin, onLoginInvalid)}
			>
				{t('Label_General_LogIn')}
			</button>
			<Link href='join'>
				<button type='button' className='join'>
					{t('Label_General_Register')}
				</button>
			</Link>
			{onLineLogin && (
				<a className='line-login' onClick={handleLineLogin}>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/line-2.png`}
						alt='img-line'
					/>
					{t('Label_General_LogIn')}
				</a>
			)}
		</>
	)
}

export default Login
