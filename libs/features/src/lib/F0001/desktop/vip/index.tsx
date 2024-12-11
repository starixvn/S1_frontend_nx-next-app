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
	}/desktop/img/new-ui/vip/vipinfo${langId === 'en' ? '' : `-${langId}`}.webp`

	return (
		<WrapperVipPage>
			<main className='vip'>
				<VipBanner vipBannerData={vipBannerData} />
				<div className='newvipinfo'>
					<div className='img'>
						<img src={vipInfoImageUrl} alt='vipInfo' />
					</div>
					<div className='newvipinfo-content'>
						<div className='newvipinfo-content-items'>
							<div className='heading'>VIP Program</div>
							<div className='content'>
								NsDemo has launched its VIP rewards program so that members
								could indulge in good services, more rewards, and a better
								experience. Discover greater perks and entitlements when your
								tier upgraded. We're waiting for you!
							</div>
						</div>
						<div className='newvipinfo-content-items'>
							<div className='heading'>VIP Program</div>
							<div className='content'>
								NsDemo has launched its VIP rewards program so that members
								could indulge in good services, more rewards, and a better
								experience. Discover greater perks and entitlements when your
								tier upgraded. We're waiting for you!
							</div>
						</div>
						<div className='last-items'>
							ENJOY THE BENEFITS AND PRIVILEGES WITH DIFFERENCE MEMBERSHIP TIER
						</div>
					</div>
				</div>
				<VipTable
					vipBannerData={vipBannerData}
					lastUpdateTime={lastUpdateTime}
				/>
				<VipBottom />
			</main>
		</WrapperVipPage>
	)
}

export default Vip
