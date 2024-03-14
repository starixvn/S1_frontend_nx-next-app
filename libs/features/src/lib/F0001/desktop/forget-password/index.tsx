import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { FlagEnum, useSetForgetPasswordMutation } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
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
			<section className='inside'>
				<div className='rightModule'>
					<div className='loginpop'>
						<div className='joinloginModule'>
							<div className='loginAnimation'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/forgetpasswordbg.png`}
									alt='forget-password-background'
									style={{ width: '439px', height: '400px' }}
								/>
							</div>
							<ForgetPasswordForm
								loading={isSetForgetPasswordLoading}
								onCancel={handleCancel}
								onSubmit={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ForgetPassword
