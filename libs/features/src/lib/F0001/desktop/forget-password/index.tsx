import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperForgotPassWord } from '@nx-next-app/features/F0001/desktop/forget-password/styles'
import { FlagEnum, useSetForgetPasswordMutation } from '@nx-next-app/service'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
	ForgetPasswordForm,
	ForgetPasswordFormType,
} from './ForgetPasswordForm'

const ForgetPasswordModal = dynamic(
	() => import('../modal/ForgetPasswordModal'),
	{ ssr: false }
)

const ForgetPassword = () => {
	const router = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()
	const [setForgetPassword, { isLoading: isSetForgetPasswordLoading }] =
		useSetForgetPasswordMutation()
	const handleCancel = () => {
		router.push(paths.home.root)
	}

	const handleSubmit = async ({ email }: ForgetPasswordFormType) => {
		try {
			await setForgetPassword({
				langId,
				email,
				// 目前舊前台固定給1
				flag: FlagEnum.hasLang,
			}).unwrap()
			modal.open(<ForgetPasswordModal />)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<main>
			<WrapperForgotPassWord>
				<div className='img-forgotpassword'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/forgetpasswordbg.webp`}
						alt='forget-password-background'
					/>
				</div>
				<ForgetPasswordForm
					loading={isSetForgetPasswordLoading}
					onCancel={handleCancel}
					onSubmit={handleSubmit}
				/>
			</WrapperForgotPassWord>
		</main>
	)
}

export default ForgetPassword
