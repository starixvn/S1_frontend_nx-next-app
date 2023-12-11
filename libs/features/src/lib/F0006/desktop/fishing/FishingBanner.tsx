import Image from 'next/future/image'

const FishingBanner = () => {
	return (
		<div className='mainBanner'>
			<Image
				alt='fishmainbanner'
				height={500}
				width={1920}
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/fishing/fishmainbanner.jpg`}
			/>
		</div>
	)
}

export default FishingBanner
