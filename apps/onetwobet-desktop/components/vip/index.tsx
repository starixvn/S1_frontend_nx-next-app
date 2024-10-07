import {
	VipBanner,
	VipBottom,
	VipProgram,
	VipTable,
} from '@12b-desktop/components/vip/components'
import { IVipBannerData } from '@nx-next-app/service'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	return (
		<main className='vip'>
			<VipBanner vipBannerData={vipBannerData} />
			<VipProgram />
			<VipTable vipBannerData={vipBannerData} lastUpdateTime={lastUpdateTime} />
			<VipBottom />
		</main>
	)
}

export default Vip
