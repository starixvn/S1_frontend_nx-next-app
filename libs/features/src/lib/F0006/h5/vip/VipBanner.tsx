import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipCarousel from './VipCarousel'

const VipBanner = () => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()
	const banners = VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId, currencyId)

	return (
		<VipCarousel pagination={false} navigation={false}>
			{banners.map(banner => (
				<div className='swiper-slide' key={banner.url}>
					<img
						className='banner'
						src={banner.url}
						alt={`VIP Level ${banner.levelText}`}
					/>
				</div>
			))}
		</VipCarousel>
	)
}

export default VipBanner
