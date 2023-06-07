import Image from 'next/future/image'
import { IVipClubImage } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { IVipEventCurrenciesLimitationInfo } from './type'
import VipEventList from './VipEventList'

const VipPage = ({
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
}: {
	VIP_CLUB_IMAGES: IVipClubImage[]
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IVipEventCurrenciesLimitationInfo
}) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	return (
		<div className='vipPage'>
			<table className='medal'>
				<tbody>
					<tr>
						<td>{t('Label_Vip_LastUpdated')} ： 10/25/2022</td>
						{VIP_CLUB_IMAGES.map(({ alt, url, displayKey }) => (
							<td key={alt}>
								<Image src={url} alt={alt} width={154} height={127} />
								{t(displayKey)}
								{userInfo.langId === 'cs' && <p>{t('Label_Club')}</p>}
							</td>
						))}
					</tr>
				</tbody>
			</table>

			<VipEventList
				VIP_EVENT_CURRENCIES_LIMITATION_INFO={
					VIP_EVENT_CURRENCIES_LIMITATION_INFO
				}
			/>
		</div>
	)
}

export default VipPage
