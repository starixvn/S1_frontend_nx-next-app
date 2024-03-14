const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-lottery`

const LotteryBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img
							alt='lottery-banner-img'
							src={`${baseUrl}/lotterylobby_bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotteryBanner
