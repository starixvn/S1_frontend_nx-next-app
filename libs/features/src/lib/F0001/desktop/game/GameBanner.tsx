import Image from 'next/future/image'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-games`

const GameBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<Image
							alt='game-banner-img'
							height={500}
							width={1920}
							src={`${baseUrl}/gamelobby_bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameBanner
