import { VipBannerItem } from '@12b-h5/components/vip/components'
import { Carousel } from '@nx-next-app/components/D0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { IVipBannerData } from '@nx-next-app/service'
import { find } from 'lodash-es'

const VipBanner = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
	const {
		userInfo: { langId },
	} = useAuth()

	const banners = useStaticData()
		.VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)
		.filter(val => find(vipBannerData, vip => vip.level === val.level))

	return (
		<Carousel pagination={false} navigation={false}>
			{banners
				.map(item => (
					<VipBannerItem
						key={item.level}
						data={find(vipBannerData, vip => vip.level === item.level)}
						bannerByCurrencyData={item}
					/>
				))
				.flat()}
		</Carousel>
	)
}

export { VipBanner }
