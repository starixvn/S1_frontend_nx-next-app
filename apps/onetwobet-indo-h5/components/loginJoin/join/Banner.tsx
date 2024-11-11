import { useGlobalData } from '@nx-next-app/data-access'

const Banner = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='banner'>
			<img alt='banner' src={getBannerUrl('/h5/img/registration-banner.png')} />
		</div>
	)
}

export default Banner
