import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useGetSocialChannelQuery } from '@nx-next-app/service'
import { SocialChannelEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

const SocialMedia = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { data: { data: socialChannelList = [] } = {} } =
		useGetSocialChannelQuery({
			currencyId: currencyId as number,
			langId,
			displayPage: SocialChannelEnum.FOOTER,
		})
	return (
		<>
			<div className='footer-center-title'>{t('Label_Profile_Connect')}</div>
			<ul>
				{socialChannelList.map(item => {
					const { link, channelName, title } = item
					return (
						<li key={channelName}>
							<a href={link} target='_blank' rel='noreferrer'>
								<img
									src={getBannerUrl(
										`/desktop/img/${channelName.toLowerCase()}.png`
									)}
									alt={title}
								/>
							</a>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default SocialMedia
