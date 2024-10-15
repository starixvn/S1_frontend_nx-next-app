import Carousel from '@12b-h5/components/common/carousel'
import { paths } from '@nx-next-app/constants'
import { useBanner } from '@nx-next-app/operations'
import { IBannerData } from '@nx-next-app/service'
import { useRouter } from 'next/router'
import { ReactIdSwiperProps } from 'react-id-swiper'

interface IBannerProps extends ReactIdSwiperProps {
	bannerList: IBannerData[]
}

const Banner = ({ bannerList, ...rest }: IBannerProps) => {
	const { push } = useRouter()
	const { bannerDataList, handleBannerClick } = useBanner(bannerList)

	return (
		<Carousel {...rest}>
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
