import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

const OfficialPartner = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div>
			<div className='partner-title'>
				{t('Label_Home_OurOfficialPartnerOf')}
			</div>
			<div className='officialpartner'>
				<a href='https://www.avfc.co.uk/' target='_blank' rel='noreferrer'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/aston-villa-${langId}.png`}
						alt='Aston Villa'
					/>
				</a>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/sevilla-fc-${langId}.png`}
					alt='Sevilla FC'
				/>
				<a
					href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia'
					target='_blank'
					rel='noreferrer'
				>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/inter-milan-${langId}.png`}
						alt='Inter Milan'
					/>
				</a>
			</div>
		</div>
	)
}

export default OfficialPartner
