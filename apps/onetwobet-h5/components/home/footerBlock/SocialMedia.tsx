import { useGlobalData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const SocialMedia = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { footerSocialChannelList = [] } = useHome()
	if (footerSocialChannelList.length === 0) {
		return null
	}

	return (
		<div className='social-networks'>
			<div className='title'>
				{t('Label_General_Social_Networks').toUpperCase()}
			</div>
			<div className='content'>
				<ul>
					{footerSocialChannelList.map(({ id, channelName, link }) => (
						<li key={id}>
							<a href={link} target='_blank' rel='noreferrer'>
								<img
									src={getBannerUrl(
										`/h5/img/${channelName.toLowerCase()}-icon.svg`
									)}
									alt={channelName}
								/>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default SocialMedia
