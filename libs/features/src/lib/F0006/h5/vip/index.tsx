import { useState } from 'react'
import Image from 'next/future/image'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { IVipBannerData } from '@nx-next-app/service'
import { DeviceTypeEnum } from '@nx-next-app/types'
import VipBanner from '@nx-next-app/features/F0006/h5/vip/VipBanner'
import VipTable from '@nx-next-app/features/F0006/h5/vip/VipTable'
import VipBottom from '@nx-next-app/features/F0006/h5/vip/VipBottom'
import VipMedal from '@nx-next-app/features/F0006/h5/vip/VipMedal'
import { Header } from '@nx-next-app/components/H0001'

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
	const [activeTab, setActiveTab] = useState<number>(
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId, DeviceTypeEnum.Mobile)[0].level
	)

	const vipBannerInfo = vipBannerData.find(({ level }) => level === activeTab)

	const handleTabChange = (tab: number) => {
		setActiveTab(tab)
	}

	return (
		<>
			<Header className='header'>
				<Header.Tag title='VIP' />
			</Header>

			<main className='main vip'>
				<VipBanner vipBannerData={vipBannerData} />
				<div className='vipprogram'>
					{/* 目前只用 en 圖 */}
					<Image
						width={818}
						height={430}
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
					<VipMedal activeTab={activeTab} onChange={handleTabChange} />
					<VipTable vipBannerInfo={vipBannerInfo} activeTab={activeTab} />
				</div>
				<VipBottom />
			</main>
		</>
	)
}

export default Vip
