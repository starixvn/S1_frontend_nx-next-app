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
		<div className='pop sponsor'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/sponsorpop-${
					langId || 'en'
				}.png`}
				alt='img-sponsorpop'
			/>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<img
				onClick={() => {
					closeModal()
					closeCallback()
				}}
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/promosBackPopup/delet.png`}
				alt='delete'
				className='closepop'
			/>
		</div>
	)
}

export default SponsorShipModal
