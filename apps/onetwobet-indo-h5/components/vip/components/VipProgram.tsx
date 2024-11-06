import { useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const VipProgram = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='vipprogram'>
			<img src={`${getBannerUrl('/h5/img/vipinfo.png')}`} alt='vipInfo' />
			<div className='vipTitle'>{t('Label_Vip_Info_Title_1')}</div>
			<span>{t('Label_Vip_Info_Content_1')}</span>
			<div className='vipTitle'>{t('Label_Vip_Info_Title_2')}</div>
			<span>{t('Label_Vip_Info_Content_2')}</span>
			<div className='vipTitle'>{t('Label_Vip_Info_Title_3')}</div>
		</div>
	)
}

export { VipProgram }
