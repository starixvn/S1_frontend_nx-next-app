import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isString } from 'lodash-es'
import { Form, InputBox } from '@nx-next-app/components/H0001'
import { useForm } from 'react-hook-form'
import { useAuth } from '@nx-next-app/data-access'

type LoginFormType = {
	userName: string
	password: string
}
const Login = () => {
	const router = useRouter()
	const { push, query } = useRouter()
	const { t } = useTranslation()
	const { onSignIn } = useAuth()

	const fromRoute = isString(query['from']) ? query['from'] : paths.home.root
	const { register, handleSubmit, formState, trigger } =
		useForm<LoginFormType>()
	const { errors, touchedFields } = formState

	const handleSignIn = async (payload: LoginFormType) => {
		try {
			await onSignIn(payload)
			router.push(paths.home.root)
		} catch (error) {
			// ..error
		}
	}

	return (
		<div className='logoSwitch active'>
			<button onClick={() => push(fromRoute)}>
				<div className='icon icon-close' />
			</button>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/logo_en_w.png`}
				alt='logo'
			/>
			<button className='switch'>
				<div className='switchBg' />
				<div className='switchLogin active'>
					<Link
						href={{
							pathname: paths.login.root,
							query: { from: fromRoute },
						}}
					>
						<a>{t('Label_General_LogIn')}</a>
					</Link>
				</div>
				<div className='switchJoin'>
					<Link
						href={{
							pathname: paths.join.root,
							query: { from: fromRoute },
						}}
					>
						<a>{t('Label_General_Join')}</a>
					</Link>
				</div>
			</button>
			<Form
				onSubmit={e => {
					e.preventDefault()
					handleSubmit(handleSignIn)
				}}
			>
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
						icon='icon-member'
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
						icon='icon-key'
						placeholder={t('Label_General_Password') || ''}
						error={!!errors['password']}
						errorMessage={errors['password']?.message as string}
					/>
				</div>
				<div className='Terms'>
					<a href='/en/forget-password'>Forgot your Password?</a>
				</div>
				<div className='btn-group'>
					<button type='submit' onClick={handleSubmit(handleSignIn)}>
						{t('Label_General_LogIn')}
					</button>
				</div>
			</Form>
			<a href='/en/'>
				<div className='visit'>
					I would like to visit !<i className='icon icon-visit' />
				</div>
			</a>
		</div>
	)
}

export default Login
