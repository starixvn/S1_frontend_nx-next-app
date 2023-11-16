import { useTranslation } from 'next-i18next'
import { useHome } from '@nx-next-app/features/F0002/providers/home-context'

export const LatestVideo = () => {
	const { latestHighlightVideo } = useHome()
	const { link, title } = latestHighlightVideo ?? {}
	const { t } = useTranslation()
	return link ? (
		<div className='latestVideo'>
			<div className='moduleTitle'>
				{t('Label_General_LatestHighlightVideo')}
			</div>
			<iframe
				width='100%'
				height='440'
				src={link}
				title='YouTube video player'
				frameBorder='0'
				allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
			/>
			<div className='title'>{title}</div>
		</div>
	) : (
		<div className='latestVideo' />
	)
}
