const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-fishing`

const FishingBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img alt='fish-banner-img' src={`${baseUrl}/fishlobby-bn.png`} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FishingBanner
