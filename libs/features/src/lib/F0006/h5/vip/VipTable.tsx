import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { VipBannerInfo } from '@nx-next-app/service'
import dayjs from 'dayjs'
import 'dayjs/plugin/timezone'
import 'dayjs/plugin/utc'
import VipTableInfo from './VipTableInfo'

interface IVipTableProps {
	lastUpdateTime: string
	vipBannerData: VipBannerInfo[]
}

const VipTable = ({ vipBannerData, lastUpdateTime }: IVipTableProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { CURRENCY_TO_TIMEZONE } = useStaticData()

	return (
		<div className='vipPage'>
			<div className='text'>
				{dayjs(lastUpdateTime)
					.utc()
					.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
					?.format('L') ?? ''}
			</div>
			<VipTableInfo vipBannerData={vipBannerData} />
		</div>
	)
}

export default VipTable
