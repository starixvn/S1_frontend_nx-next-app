import Image from 'next/future/image'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-livecasino`

const LiveCasinoBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<Image
							alt='livecasino-banner-img'
							width={1920}
							height={500}
							src={`${baseUrl}/livecasinolobby-bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveCasinoBanner
