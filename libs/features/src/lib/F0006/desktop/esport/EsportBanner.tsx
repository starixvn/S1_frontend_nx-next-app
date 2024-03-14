const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/esport`

const EsportBanner = () => {
	return (
		<div className='mainBanner'>
			<img
				alt='esport_mainbanner_bg'
				src={`${baseUrl}/esport_mainbanner_bg.jpg`}
			/>

			<div className='bannerInfo'>
				<div className='text'>
					<img src={`${baseUrl}/esport_logo.png `} alt='esport' />
				</div>
				<div className='animation'>
					<img
						className='leesin'
						src={`${baseUrl}/animation_img/leesin.png`}
						alt='leesin'
					/>
					<img
						className='spark'
						src={`${baseUrl}/animation_img/spark.png`}
						alt='spark'
					/>
				</div>
			</div>
		</div>
	)
}

export default EsportBanner
