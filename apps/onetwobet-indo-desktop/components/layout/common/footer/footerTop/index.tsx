import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { sponsorsList } from '@nx-next-app/site/onetwobet-indo'
import { useTranslation } from 'next-i18next'

const FooterTop = () => {
	const { t } = useTranslation()
	const { getBannerUrl, getSportImageUrl } = useGlobalData()
	const { icon } = useLanguageGroup()
	const {
		userInfo: { langId },
	} = useAuth()
	return (
		<div className='footer-top'>
			<a
				href={`https://tsprom.qqs77.com/sponsorship/index.php?act=gallery-photo&lang=${icon}`}
				target='_blank'
				rel='noreferrer'
			>
				<img
					src={getBannerUrl('/desktop/img/vip-icon.png')}
					alt='Sponsorship img'
				/>
				{t('Label_Sponsorship_Events')}
			</a>

			<a
				href={`https://affiliate.12bet.com/${langId}/Home`}
				target='_blank'
				rel='noreferrer'
			>
				<img
					src={getBannerUrl('/desktop/img/affiliate-icon.png')}
					alt='affiliate-icon'
				/>
				{t('Label_Affiliate_Program')}
			</a>

			<a
				href={`https://tsprom.qqs77.com/sponsorship/index.php?act=home&lang=${icon}`}
				target='_blank'
				rel='noreferrer'
			>
				<img
					src={getBannerUrl('/desktop/img/lc-logo.png')}
					alt='Official Betting Partner icon'
				/>
				{t('Label_Official_Betting_Partner')}
				<br />
				2024 - 2025
			</a>

			{/* <!-- fc-club--> */}
			<div className='fc-club-group'>
				<ul>
					{sponsorsList?.map(item => (
						<li key={item.imgUrl}>
							<img src={getSportImageUrl(item.imgUrl)} alt={item.imgUrl} />
							<span>{item.year}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default FooterTop
