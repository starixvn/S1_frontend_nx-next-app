const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-livecasino`

const LiveCasinoBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img
							alt='livecasino-banner-img'
							src={`${baseUrl}/livecasinolobby-bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveCasinoBanner
