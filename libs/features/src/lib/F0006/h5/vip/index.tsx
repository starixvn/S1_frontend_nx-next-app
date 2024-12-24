import { Header } from '@nx-next-app/components/H0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBanner from '@nx-next-app/features/F0006/h5/vip/VipBanner'
import VipMedal from '@nx-next-app/features/F0006/h5/vip/VipMedal'
import VipTable from '@nx-next-app/features/F0006/h5/vip/VipTable'
import { VIP_PROGRAMS } from '@nx-next-app/features/F0006/types/vip'
import { IVipBannerData } from '@nx-next-app/service'
import { find } from 'lodash-es'
import VipInfo from './VipInfo'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const banners = useStaticData().VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(
		langId,
		currencyId
	)
	const settings = [...VIP_PROGRAMS]
		.filter(x => x.enable)
		.map(x => ({
			...x,
			apiData: find(vipBannerData, o => o.level === x.level),
			bannerData: find(banners, o => o.level === x.level),
		}))
	return (
		<>
			<Header className='header'>
				<Header.Tag title='VIP' />
			</Header>

			<main className='main vip'>
				<VipBanner settings={settings} />
				<VipMedal settings={settings} />
				<VipInfo />
				<VipTable settings={settings} lastUpdateTime={lastUpdateTime} />
			</main>
		</>
	)
}

export default Vip
