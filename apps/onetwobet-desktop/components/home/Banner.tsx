import Carousel from '@12b-desktop/components/common/carousel'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useBanner } from '@nx-next-app/operations'
import { IBannerData } from '@nx-next-app/service'
import { BannerActionEnum } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactIdSwiperProps } from 'react-id-swiper'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

interface IBannerProps extends ReactIdSwiperProps {
	bannerList: IBannerData[]
}

const Banner = ({ bannerList, ...rest }: IBannerProps) => {
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { bannerDataList, handleBannerClick } = useBanner(bannerList)

	return (
		<div className='banner-swiper'>
			<Carousel {...rest}>
				{bannerDataList.map(item =>
					item.actionMode === BannerActionEnum.NoAction ? (
						<div key={item.itemKey}>
							<img src={item.bannerPCUrl} alt={item.bannerName} />
						</div>
					) : (
						<button
							key={item.itemKey}
							onClick={
								item.redirectLink
									? () => push(item.redirectLink)
									: () =>
											handleBannerClick(item, {
												loginCallback: () => modal.open(<LoginModal />),
											})
							}
						>
							<img src={item.bannerPCUrl} alt={item.bannerName} />
						</button>
					)
				)}
			</Carousel>
		</div>
	)
}

export default Banner
