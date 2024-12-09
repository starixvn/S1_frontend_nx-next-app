import { Header } from '@nx-next-app/components/H0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { WrapperCustomTitleBack } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import VipBanner from '@nx-next-app/features/F0001/h5/vip/VipBanner'
import VipBottom from '@nx-next-app/features/F0001/h5/vip/VipBottom'
import VipMedal from '@nx-next-app/features/F0001/h5/vip/VipMedal'
import VipTable from '@nx-next-app/features/F0001/h5/vip/VipTable'
import { WrapperVipPageH5 } from '@nx-next-app/features/F0001/h5/vip/styles'
import { IVipBannerData } from '@nx-next-app/service'
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
	const [activeTab, setActiveTab] = useState<number>(
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(langId)[0].level
	)

	const vipBannerInfo = vipBannerData.find(({ level }) => level === activeTab)

	const handleTabChange = (tab: number) => {
		setActiveTab(tab)
	}

	return (
		<WrapperVipPageH5>
			<Header className='header'>
				<WrapperCustomTitleBack>
					<Header.Tag title='VIP' back />
				</WrapperCustomTitleBack>
			</Header>

			<main className='main vip'>
				<VipBanner vipBannerData={vipBannerData} />
				<div className='vipprogram'>
					{/* 目前只用 en 圖 */}
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/vip/vipbox.webp`}
						alt='vipbox'
					/>
					<div className='vipTitle'>{t('Label_Vip_Info_Title_1')}</div>
					{t('Label_Vip_Info_Content_1')}
					<div className='vipTitle'>{t('Label_Vip_Info_Title_2')}</div>
					{t('Label_Vip_Info_Content_2')}
					<div className='vipTitle'>{t('Label_Vip_Info_Title_3')}</div>
				</div>
				<div className='vipPage'>
					{/* <div className='text'>
						{t('Label_Vip_LastUpdated')}
						{dayjs(lastUpdateTime)
							.utc()
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							?.format('L') ?? ''}
					</div> */}
					<VipMedal activeTab={activeTab} onChange={handleTabChange} />
					<VipTable vipBannerInfo={vipBannerInfo} activeTab={activeTab} />
				</div>
				<VipBottom />
			</main>
		</WrapperVipPageH5>
	)
}

export default Vip
