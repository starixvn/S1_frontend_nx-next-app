import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { IF0006VipProgram } from '@nx-next-app/features/F0006/types/vip'
import dayjs from 'dayjs'
import 'dayjs/plugin/timezone'
import 'dayjs/plugin/utc'
import VipTableInfo from './VipTableInfo'

interface IVipTableProps {
	settings: IF0006VipProgram[]
	lastUpdateTime: string
}

const VipTable = ({ settings, lastUpdateTime }: IVipTableProps) => {
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
			<VipTableInfo settings={settings} />
		</div>
	)
}

export default VipTable
