import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBanner from '@nx-next-app/features/F0001/desktop/vip/VipBanner'
import VipBottom from '@nx-next-app/features/F0001/desktop/vip/VipBottom'
import VipTable from '@nx-next-app/features/F0001/desktop/vip/VipTable'
import { VIP_PROGRAMS } from '@nx-next-app/features/F0001/types'
import { IVipBannerData } from '@nx-next-app/service'
import { find } from 'lodash-es'

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

	const banners = useStaticData().VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)
	const settings = [...VIP_PROGRAMS]
		.filter(x => x.enable)
		.map(x => ({
			...x,
			apiData: find(vipBannerData, o => o.level === x.level),
			bannerData: find(banners, o => o.level === x.level),
		}))

	return (
		<main className='vip'>
			<VipBanner settings={settings} />
			<div className='newvipinfo'>
				<img src={vipInfoImageUrl} alt='vipInfo' />
			</div>
			<VipTable settings={settings} lastUpdateTime={lastUpdateTime} />
			<VipBottom />
		</main>
	)
}

export default Vip
