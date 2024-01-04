import Image from 'next/future/image'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-fishing`

const FishingBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<Image
							alt='fish-banner-img'
							height={500}
							width={1920}
							src={`${baseUrl}/fishlobby-bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FishingBanner
