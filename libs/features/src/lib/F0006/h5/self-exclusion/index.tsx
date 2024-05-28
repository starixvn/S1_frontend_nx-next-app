import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'

const SelfExclusion = () => {
	const { t } = useTranslation()

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_SelfExclusion')}</div>
			</Header>
			<main className='main'>
				<div className='exclusion-text'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/livechat-3.png`}
						alt=''
					/>
					{t('Label_General_LiveChat')}
					<div>{t('Label_SelfExclusion_Hint')}</div>
				</div>
			</main>
		</>
	)
}

export default SelfExclusion
