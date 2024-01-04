import Image from 'next/future/image'

const baseurl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-esports`

const ESportBanner = () => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<Image
							alt='esport-banner-img'
							height={500}
							width={1920}
							src={`${baseurl}/esportslobby-bn.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ESportBanner
