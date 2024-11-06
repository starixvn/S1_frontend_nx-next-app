import { Header } from '@12b-indo-h5/components/common'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const SelfExclusion = () => {
	const { t } = useTranslation()
	const { LIVE_CHAT_ID_BY_LANG_ID } = useStaticData()
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { langId },
	} = useAuth()
	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_SelfExclusion')}</div>
			</Header>
			<main className='main'>
				<div className='exclusion-text'>
					<a
						href={`https://direct.lc.chat/${
							process.env['NEXT_PUBLIC_LIVECHAT_LICENSE']
						}/${LIVE_CHAT_ID_BY_LANG_ID[langId] || 'en'}`}
						target='_blank'
						rel='noreferrer'
					>
						<img src={getBannerUrl('/h5/img/4.0/livechat-3.png')} alt='' />
						{t('Label_General_LiveChat')}
					</a>
					<div>{t('Label_SelfExclusion_Hint')}</div>
				</div>
			</main>
		</>
	)
}

export default SelfExclusion
