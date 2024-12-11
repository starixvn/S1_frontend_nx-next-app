import { Carousel } from '@nx-next-app/components/D0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBannerItem from '@nx-next-app/features/F0001/desktop/vip/VipBannerItem'
import { IVipBannerData } from '@nx-next-app/service'

const VipBanner = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()

	return (
		<Carousel navigation={false}>
			{VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)
				.map(item => {
					const vipBannerInfo = vipBannerData.find(
						vip => vip.level === item.level
					)

					if (!vipBannerInfo) {
						return []
					}

					return (
						<VipBannerItem
							vipBannerInfo={vipBannerInfo}
							bannerByCurrencyData={item}
							key={item.level}
						/>
					)
				})
				.flat()}
		</Carousel>
	)
}

export default VipBanner
