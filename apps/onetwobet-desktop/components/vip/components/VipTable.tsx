import { VipTableInfo } from '@12b-desktop/components/vip/components'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { IOneTwoBetVipProgram } from '@nx-next-app/site/onetwobet'
import dayjs from 'dayjs'
import 'dayjs/plugin/timezone'
import 'dayjs/plugin/utc'
import { some } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipTableProps {
	settings: IOneTwoBetVipProgram[]
	lastUpdateTime: string
}

const VipTable = ({ settings, lastUpdateTime }: IVipTableProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { VIP_CLUB_IMAGES, CURRENCY_TO_TIMEZONE } = useStaticData()
	const { getBannerUrl } = useGlobalData()

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
						{VIP_CLUB_IMAGES.filter(item =>
							some(settings, x => x.level === item.level)
						).map(item => (
							<td key={item.alt}>
								<img src={getBannerUrl(item.url)} alt={item.alt} />
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

export { VipTable }
