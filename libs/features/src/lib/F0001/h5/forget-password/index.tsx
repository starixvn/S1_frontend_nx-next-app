import { Form, Header, InputBox } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { EMAIL_REGEX, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperForgotPassWordH5 } from '@nx-next-app/features/F0001/h5/forget-password/styles'
import { FlagEnum, useSetForgetPasswordMutation } from '@nx-next-app/service'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const ForgetPassword = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()
	const [setForgetPassword] = useSetForgetPasswordMutation()

	const { register, handleSubmit, formState, trigger } = useForm<{
		email: string
	}>()
	const { errors, touchedFields } = formState
	const onCancel = () => {
		push(paths.login.root)
	}

	const onSubmit = async ({ email }: { email: string }) => {
		try {
			await setForgetPassword({
				langId,
				email,
				// 目前舊前台固定給1
				flag: FlagEnum.hasLang,
			}).unwrap()
			modal.info(t('Label_General_ForgotPwdMailSent'), {
				title: t('Label_General_ForgetPsw'),
			})
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<WrapperForgotPassWordH5>
			<Header className='header'>
				<Header.Tag title={t('Label_General_ForgetPassword') as string} />
			</Header>
			<main className='main'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputBox
						register={register('email', {
							required: {
								value: true,
								message: t('Label_Join_MailWrongFormat'),
							},
							pattern: {
								value: EMAIL_REGEX,
								message: t('Label_Join_MailWrongFormat'),
							},
							onBlur: async () => {
								await trigger('email')
							},
						})}
						icon='icon icon-mail-line'
						placeholder={t('Label_Email') || ''}
						touched={!!touchedFields['email']}
						title={t('Label_General_Email') || ''}
						infoMessage={
							t('Label_General_ResetPasswordMsg', {
								site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
							}) || ''
						}
						errorMessage={errors['email']?.message as string}
						error={!!errors['email']}
					/>
					<div className='btnGroup'>
						<button
							className='btn-secondary'
							onClick={() => {
								onCancel()
							}}
							type='button'
						>
							{t('Label_General_Back')}
						</button>
						<button
							onClick={handleSubmit(onSubmit)}
							className='btn-primary'
							type='submit'
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				</Form>
			</main>
		</WrapperForgotPassWordH5>
	)
}

export default ForgetPassword
