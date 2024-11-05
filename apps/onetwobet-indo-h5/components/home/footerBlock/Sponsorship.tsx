import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { sponsorsList } from '@nx-next-app/site/onetwobet-indo'
import { useTranslation } from 'next-i18next'

const Sponsorship = () => {
	const { t } = useTranslation()
	const { getBannerUrl, getSportImageUrl } = useGlobalData()
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div className='sponsors'>
			<div className='title'>{t('Label_Official_Betting_Partner')}</div>
			<div className='content'>
				<div className='sponsors-fc'>
					<a
						href={`https://tsprom.qqs77.com/sponsorship/index.php?act=home&lang=${langId}`}
						target='_blank'
						rel='noreferrer'
					>
						<img src={getBannerUrl('/h5/img/lc-logo.png')} alt='' />
					</a>
					<div className='title'>{t('Label_Sponsorship_Leicester')}</div>
				</div>
				<div className='fc-club-group'>
					<div className='title'>{t('Label_Sponsorship_Histoiry')}</div>
					<ul>
						{sponsorsList.map(({ imgUrl }) => (
							<li key={imgUrl}>
								<img src={getSportImageUrl(imgUrl)} alt='' />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Sponsorship
