import { useAuth } from '@nx-next-app/data-access'
import { IVipBannerData } from '@nx-next-app/service'
import VipBanner from '@nx-next-app/features/F0001/desktop/vip/VipBanner'
import VipTable from '@nx-next-app/features/F0001/desktop/vip/VipTable'
import VipBottom from '@nx-next-app/features/F0001/desktop/vip/VipBottom'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	const {
		userInfo: { langId },
	} = useAuth()

	// * en 時不帶後綴語系
	const vipInfoImageUrl = `${
		process.env['NEXT_PUBLIC_BANNER_HOST']
	}/desktop/img/vipinfo${langId === 'en' ? '' : `-${langId}`}.png`

	return (
		<main className='vip'>
			<VipBanner vipBannerData={vipBannerData} />
			<div className='newvipinfo'>
				<img src={vipInfoImageUrl} alt='vipInfo' />
			</div>
			<VipTable vipBannerData={vipBannerData} lastUpdateTime={lastUpdateTime} />
			<VipBottom />
		</main>
	)
}

export default Vip
