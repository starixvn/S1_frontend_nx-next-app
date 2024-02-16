import { IVipBannerData } from '@nx-next-app/service'
import VipBanner from '@nx-next-app/features/F0006/desktop/vip/VipBanner'
import VipTable from '@nx-next-app/features/F0006/desktop/vip/VipTable'
import VipInfo from './VipInfo'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	return (
		<main className='vip'>
			<VipBanner />
			<VipInfo />
			<VipTable vipBannerData={vipBannerData} lastUpdateTime={lastUpdateTime} />
		</main>
	)
}

export default Vip
