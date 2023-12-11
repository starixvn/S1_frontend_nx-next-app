import Image from 'next/future/image'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/esport`

const EsportBanner = () => {
	return (
		<div className='mainBanner'>
			<Image
				alt='esport_mainbanner_bg'
				height={500}
				width={1920}
				src={`${baseUrl}/esport_mainbanner_bg.jpg`}
			/>

			<div className='bannerInfo'>
				<div className='text'>
					<Image
						width={419}
						height={117}
						src={`${baseUrl}/esport_logo.png `}
						alt='esport'
					/>
				</div>
				<div className='animation'>
					<Image
						className='leesin'
						width={463}
						height={485}
						src={`${baseUrl}/animation_img/leesin.png`}
						alt='leesin'
					/>
					<Image
						className='spark'
						width={421}
						height={470}
						src={`${baseUrl}/animation_img/spark.png`}
						alt='spark'
					/>
				</div>
			</div>
		</div>
	)
}

export default EsportBanner
