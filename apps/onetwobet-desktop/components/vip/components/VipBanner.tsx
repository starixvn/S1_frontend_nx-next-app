import { Carousel } from '@12b-desktop/components/common'
import { VipBannerItem } from '@12b-desktop/components/vip/components/VipBannerItem'
import { IOneTwoBetVipProgram } from '@nx-next-app/site/onetwobet'
import { SwiperSlide } from 'swiper/react'

interface IVipBannerProps {
	settings: IOneTwoBetVipProgram[]
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

export { VipBanner }
