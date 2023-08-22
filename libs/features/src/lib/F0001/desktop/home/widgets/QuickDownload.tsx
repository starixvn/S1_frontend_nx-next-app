import { useRef } from 'react'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import classNames from 'classnames'
import { useHover } from 'usehooks-ts'
import { useDownloadLinks } from '@nx-next-app/features/F0001/hooks/useDownloadLinks'

const QuickDownload = () => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)
	const { androidDownLoadUrl, iosDownloadUrl } = useDownloadLinks()

	const handleClick = (url: string) => {
		if (typeof window !== undefined) window.open(url)
	}
	return (
		<div ref={hoverRef}>
			<div className={classNames('quickLinkNew3', { active: isHover })}>
				<i className='icon icon-arrow-right2' />
				<div>{t('Label_General_Download')}</div>
			</div>
			<div className={classNames('quickLinkNew4', { active: !isHover })}>
				<i className='icon icon-arrow-left2' />
				{iosDownloadUrl && (
					<button
						className='icon icon-appleinc'
						onClick={() => handleClick(iosDownloadUrl)}
					>
						{t('Label_iOS')?.toUpperCase()}
						<div>
							<QRCode
								value={iosDownloadUrl}
								renderAs='svg'
								size={112}
								includeMargin
							/>
						</div>
					</button>
				)}

				{androidDownLoadUrl && (
					<button
						className='icon icon-android'
						onClick={() => handleClick(androidDownLoadUrl)}
					>
						{t('Label_Android')?.toUpperCase()}
						<div>
							<QRCode
								value={androidDownLoadUrl}
								renderAs='svg'
								size={112}
								includeMargin
							/>
						</div>
					</button>
				)}
			</div>
		</div>
	)
}

export default QuickDownload
