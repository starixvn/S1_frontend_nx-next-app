import { Loading } from '@12b-h5/components/common'
import Header from '@12b-h5/components/header'
import { paths } from '@nx-next-app/constants'
import { useCheckResetPwdTokenMutation } from '@nx-next-app/service'
import { isUndefined } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()

	const [checkResetPwdToken, { isLoading: isCheckResetPwdLoading }] =
		useCheckResetPwdTokenMutation()

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
	}, [query['key']])

	if (isCheckResetPwdLoading) return <Loading />

	return (
		<>
			<Header className='header'>
				<Header.Tag title={t('Label_General_ForgetPsw') as string} />
			</Header>
			<main className='main forget-password'>
				<ResetPasswordForm />
			</main>
		</>
	)
}

export default ResetPassword
