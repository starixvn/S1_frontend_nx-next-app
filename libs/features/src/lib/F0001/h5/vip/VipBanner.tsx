import { Carousel } from '@nx-next-app/components/D0001'
import VipBannerItem from '@nx-next-app/features/F0001/h5/vip/VipBannerItem'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import { SwiperSlide } from 'swiper/react'

interface IVipBannerProps {
	settings: IF0001VipProgram[]
}

const VipBanner = ({ settings }: IVipBannerProps) => {
	return (
		<Carousel pagination={false} navigation={false}>
			{settings
				.filter(item => item.bannerData)
				.map(item => (
					<SwiperSlide className={`vip${item.level}`} key={item.level}>
						<VipBannerItem item={item} />
					</SwiperSlide>
				))}
		</Carousel>
	)
}

export default VipBanner
