import { useTranslation } from 'next-i18next'

const PartnerBlock = () => {
	const { t } = useTranslation()
	// 線上版本的球隊本來就沒用 i18n 翻譯
	return (
		<>
			<div className='home-partner-title'>
				{t('Label_Home_OurOfficialPartnerOf')}
			</div>
			<div className='home-partner'>
				<div className='home-partner-content'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/sp-sevilla.png`}
						alt='Sevilla FC'
					/>
					<div>
						<div>Sevilla FC</div>
						<div>{t('Label_Home_OfficialAsianBettingPartner')}</div>
						<div>2023-2024</div>
					</div>
				</div>
				<div className='home-partner-content'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/sp-inter-milan.png`}
						alt='Inter Milan'
					/>
					<div>
						<div>Inter Milan</div>
						<div>{t('Label_Home_OfficialAsiaRegionalPartner')}</div>
						<div>2023-2024</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PartnerBlock
