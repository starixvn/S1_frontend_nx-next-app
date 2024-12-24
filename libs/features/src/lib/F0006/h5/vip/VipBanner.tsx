import { IF0006VipProgram } from '@nx-next-app/features/F0006/types/vip'
import VipCarousel from './VipCarousel'

interface IVipBannerProps {
	settings: IF0006VipProgram[]
}

const VipBanner = ({ settings }: IVipBannerProps) => {
	return (
		<VipCarousel pagination={false} navigation={false}>
			{settings
				.filter(item => item.enable)
				.map(({ bannerData }) => (
					<div className='swiper-slide' key={bannerData?.url}>
						<img
							className='banner'
							src={bannerData?.url}
							alt={`VIP Level ${bannerData?.levelText}`}
						/>
					</div>
				))}
		</VipCarousel>
	)
}

export default VipBanner
