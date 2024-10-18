import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const SiteInfo = () => {
	const { t } = useTranslation()
	const [collapsed, setCollapsed] = useState<boolean>(false)
	const toggleCollapsed = () => {
		setCollapsed(prev => !prev)
	}
	return (
		<div className={classNames('site-info', { collapsed })}>
			<button className='collapse-btn' onClick={toggleCollapsed}>
				<div className='title'>{t('Label_SiteInfo_Title')}</div>
				<div className='icon icon-keyboard_arrow_up' />
			</button>
			<div className='content'>
				<p>{t('Label_SiteInfo_Content_1')}</p>
				<p>
					<b>{t('Label_SiteInfo_Subtitle_1')}</b>
					<br />
					{t('Label_SiteInfo_Content_2')}
				</p>
				<p>
					<b>{t('Label_SiteInfo_Subtitle_2')}</b>
					<br />
					{t('Label_SiteInfo_Content_3')}
				</p>
				<p>
					<b>{t('Label_SiteInfo_Subtitle_3')}</b>
					<br />
					{t('Label_SiteInfo_Content_4')}
				</p>
				<p>{t('Label_SiteInfo_Content_5')}</p>
				<p>{t('Label_SiteInfo_Content_6')}</p>
			</div>
		</div>
	)
}

export default SiteInfo
