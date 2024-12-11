import { useAuth } from '@nx-next-app/data-access'
import { WrapperVipPage } from '@nx-next-app/features/F0001/desktop/vip/styles'
import VipBanner from '@nx-next-app/features/F0001/desktop/vip/VipBanner'
import VipBottom from '@nx-next-app/features/F0001/desktop/vip/VipBottom'
import VipTable from '@nx-next-app/features/F0001/desktop/vip/VipTable'
import { IVipBannerData } from '@nx-next-app/service'

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
		<WrapperVipPage>
			<main className='vip'>
				<VipBanner vipBannerData={vipBannerData} />
				<div className='vip-main'>
					<div className='newvipinfo'>
						<img src={vipInfoImageUrl} alt='vipInfo' />
					</div>
					<VipTable
						vipBannerData={vipBannerData}
						lastUpdateTime={lastUpdateTime}
					/>
					<VipBottom />
				</div>
			</main>
		</WrapperVipPage>
	)
}

export default Vip
