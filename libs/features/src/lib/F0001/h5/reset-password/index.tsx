import { Loading } from '@nx-next-app/components/D0001'
import { Header } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { WrapperResetPassWordH5 } from '@nx-next-app/features/F0001/h5/reset-password/styles'
import {
	useCheckResetPwdTokenMutation,
	useResetPasswordMutation,
} from '@nx-next-app/service'
import { isUndefined } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

type ResetPasswordFormType = {
	newPassword: string
}

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
		<WrapperResetPassWordH5>
			<Header className='header'>
				<Header.Tag title={t('Label_ResetPassword') as string} />
			</Header>
			<main className='main'>
				<ResetPasswordForm
					loading={isSetResetPasswordLoading}
					onSubmit={handleSubmit}
				/>
			</main>
		</WrapperResetPassWordH5>
	)
}

export default ResetPassword
