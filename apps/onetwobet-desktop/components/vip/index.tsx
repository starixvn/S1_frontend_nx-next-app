import {
	VipBanner,
	VipBottom,
	VipProgram,
	VipTable,
} from '@12b-desktop/components/vip/components'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { IVipBannerData } from '@nx-next-app/service'
import { VIP_PROGRAMS } from '@nx-next-app/site/onetwobet'
import { chain, find } from 'lodash-es'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	const {
		userInfo: { langId },
	} = useAuth()

	const banners = useStaticData().VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)

	const settings = chain([...VIP_PROGRAMS])
		.filter('enable')
		.map(x => ({
			...x,
			apiData: find(vipBannerData, o => o.level === x.level),
			bannerData: find(banners, o => o.level === x.level),
		}))
		.value()

	return (
		<main className='vip'>
			<VipBanner settings={settings} />
			<VipProgram />
			<VipTable settings={settings} lastUpdateTime={lastUpdateTime} />
			<VipBottom />
		</main>
	)
}

export default Vip
