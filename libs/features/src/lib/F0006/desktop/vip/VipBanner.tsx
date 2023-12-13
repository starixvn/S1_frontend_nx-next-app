import React from 'react'
import { Carousel } from '@nx-next-app/components/D0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBannerItem from '@nx-next-app/features/F0006/desktop/vip/VipBannerItem'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { IVipBannerData } from '@nx-next-app/service'

const VipBanner = ({
	vipBannerData,
}: Omit<IVipBannerData, 'lastUpdateTime'>) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()

	return (
		<Carousel pagination={false}>
			{VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId, DeviceTypeEnum.Desktop)
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
							BannerByCurrencyData={item}
							key={item.level}
						/>
					)
				})
				.flat()}
		</Carousel>
	)
}

export default VipBanner
