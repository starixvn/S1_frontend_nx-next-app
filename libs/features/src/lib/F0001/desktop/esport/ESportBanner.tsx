const baseurl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-esports`

const ESportBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img
							alt='esport-banner-img'
							src={`${baseurl}/esportslobby-bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ESportBanner
