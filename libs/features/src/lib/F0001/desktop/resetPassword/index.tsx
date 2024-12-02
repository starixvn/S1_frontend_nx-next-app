import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useCheckResetPwdTokenMutation,
	useResetPasswordMutation,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'

import { Loading } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { WrapperResetPassword } from '@nx-next-app/features/F0001/desktop/resetPassword/styles'
import { isUndefined } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ResetPasswordForm, ResetPasswordFormType } from './ResetPasswordForm'

const ResetPassword = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()
	const { modal } = useGlobalModal()
	const [setResetPassword, { isLoading: isSetResetPasswordLoading }] =
		useResetPasswordMutation()
	const [checkResetPwdToken, { isLoading: isCheckResetPwdLoading }] =
		useCheckResetPwdTokenMutation()

	const handleSubmit = async ({ newPassword }: ResetPasswordFormType) => {
		try {
			const { message } = await setResetPassword({
				newPassword,
			}).unwrap()
			modal.info(message, { onOK: () => push(paths.home.root) })
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleCheckResetPwdToken = async (key: string) => {
		try {
			const formData = new FormData()
			formData.append('key', key)
			await checkResetPwdToken(formData).unwrap()
		} catch (e) {
			push(paths.home.root)
		}
	}

	useEffect(() => {
		const { key } = query
		if (!isUndefined(key)) {
			handleCheckResetPwdToken(key as string)
		} else {
			push(paths.home.root)
		}
	}, [])

	if (isCheckResetPwdLoading) return <Loading />

	return (
		<WrapperResetPassword>
			<div className='infoModule'>
				<div className='inside-title'>
					<i className='icon icon-lock-2-fill' />
					<span>{t('Label_ResetPassword')}</span>
				</div>
				<div className='forgetPassWord'>
					<ResetPasswordForm
						loading={isSetResetPasswordLoading}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
		</WrapperResetPassword>
	)
}

export default ResetPassword
