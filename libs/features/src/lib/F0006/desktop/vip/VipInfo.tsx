import { useTranslation } from 'next-i18next'

const VipInfo = () => {
	const { t } = useTranslation()
	return (
		<div className='vipInfo'>
			<div className='vipTitle'>{t('Label_Vip_Info_Title_1')}</div>
			{t('Label_Vip_ProgramContent1')}
			<div className='vipTitle'>{t('Label_Vip_Info_Title_2')}</div>
			{t('Label_Vip_ProgramContent2')}
			<div className='vipTitle'>{t('Label_Vip_ProgramContent3')}</div>
		</div>
	)
}

export default VipInfo
