import { useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const VipProgram = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='newvipinfo'>
			<img src={`${getBannerUrl('/desktop/img/vipinfo.png')}`} alt='vipInfo' />
			<div>
				<div>
					<div className='newvipinfo-title'>{t('Label_Vip_Info_Title_1')}</div>
					<div className='newvipinfo-text'>{t('Label_Vip_Info_Content_1')}</div>
				</div>
				<div>
					<div className='newvipinfo-title'>{t('Label_Vip_Info_Title_2')}</div>
					<div className='newvipinfo-text'>{t('Label_Vip_Info_Content_2')}</div>
				</div>
				<div className='newvipinfo-title'>{t('Label_Vip_Info_Title_3')}</div>
			</div>
		</div>
	)
}

export { VipProgram }
