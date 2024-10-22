import { ResetPassword } from '@12b-desktop/components/forgot-password'
import { useGlobalData } from '@nx-next-app/data-access'

const ResetPasswordModal = () => {
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
						<ResetPassword />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPasswordModal
