import React from 'react'
import { useTranslation } from 'next-i18next'
import { IFooterData } from '@nx-next-app/types'
import { Img } from '@nx-next-app/components/D0001'

interface ISuggestBrowserProps {
	suggestedBrowser: IFooterData['suggestedBrowser']
}

const SuggestBrowser = ({ suggestedBrowser }: ISuggestBrowserProps) => {
	const { t } = useTranslation()

	if (!suggestedBrowser || suggestedBrowser.length === 0) {
		return null
	}

	return (
		<div className='footer-center-item'>
			<div className='footer-center-title'>{t('Label_Suggested_Browser')}</div>
			<div className='footer-icon'>
				{suggestedBrowser.map(({ imageSrc, alt, width, height }) => {
					return <Img key={alt} src={imageSrc} alt={alt} />
				})}
			</div>
		</div>
	)
}

export default SuggestBrowser
