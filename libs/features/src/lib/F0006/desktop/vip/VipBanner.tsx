import { Carousel } from '@nx-next-app/components/D0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const VipBanner = () => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()
	const banners = VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId, currencyId)

	return (
		<Carousel pagination={false}>
			{banners.map(banner => (
				<div key={banner.url}>
					<img src={banner.url} alt={`VIP Level ${banner.levelText}`} />
				</div>
			))}
		</Carousel>
	)
}

export default VipBanner
