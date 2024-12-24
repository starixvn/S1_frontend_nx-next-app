import { Header } from '@nx-next-app/components/H0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipBanner from '@nx-next-app/features/F0001/h5/vip/VipBanner'
import VipBottom from '@nx-next-app/features/F0001/h5/vip/VipBottom'
import VipMedal from '@nx-next-app/features/F0001/h5/vip/VipMedal'
import VipTable from '@nx-next-app/features/F0001/h5/vip/VipTable'
import {
	IF0001VipProgram,
	VIP_PROGRAMS,
} from '@nx-next-app/features/F0001/types'
import { IVipBannerData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface IVipProps {
	vipBannerData: IVipBannerData
}

const Vip = ({
	vipBannerData: { vipBannerData, lastUpdateTime },
}: IVipProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { CURRENCY_TO_TIMEZONE, VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } =
		useStaticData()
	const banners = VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)

	const settings = [...VIP_PROGRAMS]
		.filter(x => x.enable)
		.map(x => ({
			...x,
			apiData: find(vipBannerData, o => o.level === x.level),
			bannerData: find(banners, o => o.level === x.level),
		}))

	const [activeTab, setActiveTab] = useState<number>(settings[0].level)

	const info = settings.find(
		({ level }) => level === activeTab
	) as IF0001VipProgram

	const handleTabChange = (tab: number) => {
		setActiveTab(tab)
	}

	return (
		<>
			<Header className='header'>
				<Header.Tag title='VIP' back />
			</Header>

			<main className='main vip'>
				<VipBanner settings={settings} />
				<div className='vipprogram'>
					{/* 目前只用 en 圖 */}
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/vipbox.png`}
						alt='vipbox'
					/>
					<div className='vipTitle'>{t('Label_Vip_Info_Title_1')}</div>
					{t('Label_Vip_Info_Content_1')}
					<div className='vipTitle'>{t('Label_Vip_Info_Title_2')}</div>
					{t('Label_Vip_Info_Content_2')}
					<div className='vipTitle'>{t('Label_Vip_Info_Title_3')}</div>
				</div>
				<div className='vipPage'>
					<div className='text'>
						{t('Label_Vip_LastUpdated')}
						{dayjs(lastUpdateTime)
							.utc()
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							?.format('L') ?? ''}
					</div>
					<VipMedal
						settings={settings}
						activeTab={activeTab}
						onChange={handleTabChange}
					/>
					<VipTable info={info} activeTab={activeTab} />
				</div>
				<VipBottom />
			</main>
		</>
	)
}

export default Vip
