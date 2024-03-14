const FishingBanner = () => {
	return (
		<div className='mainBanner'>
			<img
				alt='fishmainbanner'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/fishing/fishmainbanner.jpg`}
			/>
		</div>
	)
}

export default FishingBanner
