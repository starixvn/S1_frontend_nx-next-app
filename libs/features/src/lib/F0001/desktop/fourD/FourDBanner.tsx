import Image from 'next/future/image'

const FishingBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<Image
							alt='fishmainbanner'
							height={500}
							width={1920}
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-4d/4dlobby_bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FishingBanner
