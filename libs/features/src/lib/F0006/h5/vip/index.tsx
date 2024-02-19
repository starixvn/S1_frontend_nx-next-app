import { IVipBannerData } from '@nx-next-app/service'
import VipBanner from '@nx-next-app/features/F0006/h5/vip/VipBanner'
import VipTable from '@nx-next-app/features/F0006/h5/vip/VipTable'
import VipMedal from '@nx-next-app/features/F0006/h5/vip/VipMedal'
import { Header } from '@nx-next-app/components/H0006'
import VipInfo from './VipInfo'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	return (
		<>
			<Header className='header'>
				<Header.Tag title='VIP' />
			</Header>

			<main className='main vip'>
				<VipBanner />
				<VipMedal />
				<VipInfo />
				<VipTable
					lastUpdateTime={lastUpdateTime}
					vipBannerData={vipBannerData}
				/>
			</main>
		</>
	)
}

export default Vip
