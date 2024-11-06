import { Header } from '@12b-indo-h5/components/common'
import {
	VipBanner,
	VipBottom,
	VipProgram,
	VipTable,
} from '@12b-indo-h5/components/vip/components'
import { IVipBannerData } from '@nx-next-app/service'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	return (
		<>
			<Header className='header'>
				<Header.Tag title='VIP' back />
			</Header>

			<main className='main vip'>
				<VipBanner vipBannerData={vipBannerData} />
				<VipProgram />
				<VipTable
					lastUpdateTime={lastUpdateTime}
					vipBannerData={vipBannerData}
				/>
				<VipBottom />
			</main>
		</>
	)
}

export default Vip
