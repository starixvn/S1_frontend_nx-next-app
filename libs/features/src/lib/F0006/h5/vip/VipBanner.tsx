import React from 'react'
import { Carousel } from '@nx-next-app/components/D0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBannerItem from '@nx-next-app/features/F0006/h5/vip/VipBannerItem'
import { IVipBannerData } from '@nx-next-app/service'

const VipBanner = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()

	return (
		<Carousel pagination={false} navigation={false}>
			{VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)
				.map(item => {
					const vipData = vipBannerData.find(vip => vip.level === item.level)

					if (!vipData) {
						return []
					}

					return (
						<VipBannerItem
							key={item.level}
							vipData={vipData}
							BannerByCurrencyData={item}
						/>
					)
				})
				.flat()}
		</Carousel>
	)
}

export default VipBanner
