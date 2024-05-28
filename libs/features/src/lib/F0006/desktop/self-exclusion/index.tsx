import { useTranslation } from 'next-i18next'

const SelfExclusion = () => {
	const { t } = useTranslation()

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='exclusion-title'>
						{t('Label_General_SelfExclusion')}
					</span>
				</div>
				<div className='exclusion-text'>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/livechat.png`}
							alt=''
						/>
						{t('Label_General_LiveChat')}
					</a>
					<div>{t('Label_SelfExclusion_Hint')}</div>
				</div>
			</div>
		</div>
	)
}

export default SelfExclusion
