import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'

const SponsorShipModal = ({
	closeCallback = () => null,
}: {
	closeCallback?: () => void
}) => {
	const { closeModal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()
	return (
		<div className='pop sponsorpop'>
			<div className='sponsor active'>
				<div className='sponsor-content'>
					<img
						src={`${
							process.env['NEXT_PUBLIC_BANNER_HOST']
						}/desktop/img/sponsorpop-${langId || 'en'}.png`}
						alt='img-sponsorpop'
					/>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/promosBackPopup/delet.png`}
						alt=''
						className='closepop'
						onClick={() => {
							closeModal()
							closeCallback()
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default SponsorShipModal
