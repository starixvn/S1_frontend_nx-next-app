import { useAuth } from '@nx-next-app/data-access'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino`

const LiveCasinoBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div className='mainBanner'>
			<img alt='main-banner-img' src={`${baseUrl}/banner-${langId}.jpg`} />

			<div className='bannerInfo'>
				<div className='animation'>
					<img
						className='dice3'
						src={`${baseUrl}/animation_img/dice01.png`}
						alt='banner-ball'
					/>
					<img
						className='dice4'
						src={`${baseUrl}/animation_img/dice02.png`}
						alt='banner-ball'
					/>
				</div>
			</div>
		</div>
	)
}

export default LiveCasinoBanner
