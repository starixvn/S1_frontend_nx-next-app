import { useGlobalData } from '@nx-next-app/data-access'

const LotteryBanner = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img
							src={getBannerUrl(
								'/desktop/img/4.0/lobby-lottery/lotterylobby_bn.png'
							)}
							alt='lottery-banner-img'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotteryBanner
