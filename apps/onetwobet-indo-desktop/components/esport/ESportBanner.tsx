import { useGlobalData } from '@nx-next-app/data-access'

const ESportBanner = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img
							src={getBannerUrl(
								'/desktop/img/4.0/lobby-esports/esportslobby-bn.png'
							)}
							alt='esport-banner-img'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ESportBanner
