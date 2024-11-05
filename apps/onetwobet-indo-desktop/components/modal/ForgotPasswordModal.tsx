import { ForgotPassword } from '@12b-indo-desktop/components/forgot-password'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'

const ForgotPasswordModal = () => {
	const { closeModal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='pop pop-forgetpassword'>
			<div className='forget-password active'>
				<div className='forget-container'>
					<div className='banner'>
						<img
							alt='banner'
							src={getBannerUrl('/desktop/img/forget-banner.png')}
						/>
					</div>
					<div className='form-content'>
						<ForgotPassword onCancel={closeModal} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPasswordModal
