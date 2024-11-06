import Carousel from '@12b-indo-h5/components/common/carousel'
import { paths } from '@nx-next-app/constants'
import { useBanner, useSlots } from '@nx-next-app/operations'
import { useRouter } from 'next/router'

const Banner = () => {
	const { push } = useRouter()
	const { bannerList, isGetBannerV3Fetching } = useSlots()
	const { bannerDataList, handleBannerClick } = useBanner(bannerList)
	if (isGetBannerV3Fetching) {
		return null
	}
	return (
		<Carousel spaceBetween={100} navigation={false}>
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
						className='banner'
						src={item.bannerMobileUrl}
						alt={item.bannerName}
					/>
				</div>
			))}
		</Carousel>
	)
}

export default Banner
