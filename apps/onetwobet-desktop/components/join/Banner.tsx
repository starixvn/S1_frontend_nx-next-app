import { useGlobalData } from '@nx-next-app/data-access'

const Banner = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='banner'>
			<img
				alt='banner'
				src={getBannerUrl('/desktop/img/registration-banner.png')}
			/>
		</div>
	)
}

export default Banner
