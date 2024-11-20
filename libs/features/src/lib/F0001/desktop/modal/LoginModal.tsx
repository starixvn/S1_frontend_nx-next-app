import { InputBox } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperLoginModal } from '@nx-next-app/features/F0001/desktop/modal/styles'
import { useSignInMutation } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const LoginModal = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	const {
		userInfo: { langId },
	} = useAuth()

	const { formState, trigger, setError, register, getValues, handleSubmit } =
		useForm()

	const { errors, touchedFields } = formState

	const [signIn] = useSignInMutation()

	const handleSubmitForm = async () => {
		const { username, password } = getValues()

		if (typeof window === undefined) return

		const url = window.location.origin
		const { platform } = navigator
		const { userAgent } = navigator
		const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
		let di = ''
		let bi = ''
		let detecasAnalysis = ''
		let sessionKey = ''
		let token = ''

		// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
		di = (document.getElementById('__di') as any)?.value
		bi = (document.getElementById('__bi') as any)?.value
		detecasAnalysis = (document.getElementById('detecas-analysis') as any)
			?.value
		sessionKey = (document.getElementById('__fdi') as any)?.value // * fdi = sessionKey
		token = (document.getElementById('__tk') as any)?.value // * 默認為 empty

		try {
			await signIn({
				userName: username,
				userpwd: password,
				isPersistent: false,
				url,
				platform,
				userAgent,
				screen,
				FPSRequest: {
					di,
					bi,
					detecasAnalysis,
					sessionKey,
					token,
				},
			}).unwrap()

			closeModal()
			router.push(`/${langId}${paths.deposit.root}`)
		} catch (error) {
			const { errorCode, message } =
				(error as {
					errorCode: number
					message: string
					status: number
				}) || {}

			const errorCodeType: { [key: string]: number[] } = {
				username: [1101, 1102, 1103, 9000],
				password: [1001],
			}

			const errorCodeIdx = Object.values(errorCodeType).findIndex(arr =>
				arr.includes(errorCode)
			)

			if (errorCodeIdx !== -1) {
				const errorColumn = Object.keys(errorCodeType)[errorCodeIdx]
				setError(errorColumn, { type: 'mismatch', message })
			}
		}
	}

	return (
		<WrapperLoginModal>
			<div className='pop'>
				<div className='loginpop active'>
					<div className='joinloginModule'>
						<div className='login-image'>
							<img
								alt='jion'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/jion.png`}
							/>
						</div>
						<form
							className='joinloginFunction'
							onSubmit={handleSubmit(handleSubmitForm)}
						>
							<div className='heading-login spacing-bt'>
								{t('Label_General_LogIn')}
							</div>
							<div className='slogan'>
								{t('Label_Join_DontHaveAccount')}
								<Link href={paths.join.root}>
									<a onClick={closeModal}>{t('Label_General_Join')}</a>
								</Link>
							</div>
							<div className='inputModule'>
								<InputBox
									register={register('username', {
										required: {
											value: true,
											message: t('Label_General_UsernameReq'),
										},
										onBlur: () => trigger('username'),
									})}
									icon='icon-member txt-blue'
									placeholder={t('Label_General_Username') || ''}
									errorMessage={errors['username']?.message as string}
									error={!!errors['username']}
									touched={!!touchedFields['username']}
									infoMessage={t('Label_Join_UsernameTooltip') || ''}
								/>
								<InputBox
									register={register('password', {
										required: {
											value: true,
											message: t('Label_General_PasswordRequired'),
										},
										onBlur: () => trigger('password'),
									})}
									password
									icon='icon icon-key txt-blue'
									placeholder={t('Label_General_Password') || ''}
									errorMessage={errors['password']?.message as string}
									error={!!errors['password']}
									touched={!!touchedFields['password']}
								/>
								<Link href={paths.forgetPassword.root}>
									<a className='forgot' onClick={closeModal}>
										{t('Label_Header_ForgetPassword')}
									</a>
								</Link>
							</div>
							<div className='btnGroup'>
								<button
									className='btn-cancel'
									type='button'
									onClick={closeModal}
								>
									{t('Label_General_Cancel')}
								</button>
								<button className='btn-check' type='submit'>
									{t('Label_General_LogIn')}
								</button>
							</div>
							<i className='close-popup icon-close-line' onClick={closeModal} />
						</form>
					</div>
				</div>
			</div>
		</WrapperLoginModal>
	)
}

export default LoginModal
