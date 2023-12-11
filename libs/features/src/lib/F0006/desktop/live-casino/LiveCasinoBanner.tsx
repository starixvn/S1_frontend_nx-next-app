import Image from 'next/future/image'
import { useAuth } from '@nx-next-app/data-access'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino`

const LiveCasinoBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div className='mainBanner'>
			<Image
				alt='main-banner-img'
				width={1920}
				height={500}
				src={`${baseUrl}/banner-${langId}.jpg`}
			/>

			<div className='bannerInfo'>
				<div className='animation'>
					<Image
						className='dice3'
						width={122}
						height={133}
						src={`${baseUrl}/animation_img/dice01.png`}
						alt='banner-ball'
					/>
					<Image
						className='dice4'
						width={76}
						height={77}
						src={`${baseUrl}/animation_img/dice02.png`}
						alt='banner-ball'
					/>
				</div>
			</div>
		</div>
	)
}

export default LiveCasinoBanner
