import { Carousel } from '@nx-next-app/components/D0006'
import { IF0006VipProgram } from '@nx-next-app/features/F0006/types/vip'

interface IVipBannerProps {
	settings: IF0006VipProgram[]
}

const VipBanner = ({ settings }: IVipBannerProps) => {
	return (
		<Carousel pagination={false}>
			{settings
				.filter(item => item.enable)
				.map(({ bannerData }) => (
					<div key={bannerData?.url}>
						<img
							src={bannerData?.url}
							alt={`VIP Level ${bannerData?.levelText}`}
						/>
					</div>
				))}
		</Carousel>
	)
}

export default VipBanner
