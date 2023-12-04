import React from 'react'
import Image from 'next/future/image'
import { IFooterData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

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
					return (
						<Image
							key={alt}
							src={imageSrc}
							alt={alt}
							width={width}
							height={height}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SuggestBrowser
