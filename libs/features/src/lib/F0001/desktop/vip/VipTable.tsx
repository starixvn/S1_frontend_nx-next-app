import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipTableInfo from '@nx-next-app/features/F0001/desktop/vip/VipTableInfo'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import dayjs from 'dayjs'
import 'dayjs/plugin/timezone'
import 'dayjs/plugin/utc'
import { useTranslation } from 'next-i18next'

interface IVipTableProps {
	settings: IF0001VipProgram[]
	lastUpdateTime: string
}

const VipTable = ({ settings, lastUpdateTime }: IVipTableProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { VIP_CLUB_IMAGES, CURRENCY_TO_TIMEZONE } = useStaticData()

	return (
		<div className='vipPage'>
			<table className='medal'>
				<tbody>
					<tr>
						<td>
							{t('Label_Vip_LastUpdated')} ：{' '}
							{dayjs(lastUpdateTime)
								.utc()
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								?.format('L') ?? ''}
						</td>
						{VIP_CLUB_IMAGES.map(item => (
							<td key={item.alt}>
								<img src={item.url} alt={item.alt} />
								{t(item.displayKey || '')}
								{/* // * cs 語系才需顯示 Club */}
								{langId === 'cs' && <p>{t('Label_Vip_Club')}</p>}
							</td>
						))}
					</tr>
				</tbody>
			</table>

			<VipTableInfo settings={settings} />
		</div>
	)
}

export default VipTable
