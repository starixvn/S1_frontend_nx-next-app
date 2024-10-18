import Carousel from '@12b-h5/components/common/carousel'
import { paths } from '@nx-next-app/constants'
import { useBanner, useHome } from '@nx-next-app/operations'
import { useRouter } from 'next/router'

const Banner = () => {
	const { push } = useRouter()
	const { bannerData } = useHome()
	const { bannerDataList, handleBannerClick } = useBanner(bannerData)

	return (
		<div className='home-mainbanner'>
			<Carousel pagination={false} navigation={false}>
				{bannerDataList.map(item => (
					<div
						key={item.itemKey}
						onClick={
							item.redirectLink
								? () => push(item.redirectLink)
								: () =>
										handleBannerClick(item, {
											loginCallback: () => push(paths.login.root),
										})
						}
					>
						<img
							className='mainbanner'
							src={item.bannerMobileUrl}
							alt={item.bannerName}
						/>
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default Banner
