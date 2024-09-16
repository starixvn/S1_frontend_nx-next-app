import { paths } from '@nx-next-app/constants'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface IAppDownloadProps {
	isAppDownloadHintActive: boolean
	onCloseAppDownloadHint: () => void
	showAppDownload: boolean
}

const AppDownload = ({
	isAppDownloadHintActive,
	onCloseAppDownloadHint,
	showAppDownload,
}: IAppDownloadProps) => {
	const { t } = useTranslation()
	if (!showAppDownload) return null
	return (
		<div
			className={classNames('appdownload', {
				active: isAppDownloadHintActive,
			})}
		>
			<button
				aria-label='appDownload'
				className='icon icon-close'
				onClick={onCloseAppDownloadHint}
			/>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/appicon.jpg`}
				alt='appicon-img'
			/>
			<div>
				<div>{t('Label_AppDownload_DownloadAppNow')}</div>
				<div>{t('Label_AppDownload_BestMobileExperience')}</div>
			</div>
			<Link href={paths.appDownload.root} passHref>
				<a>{t('Label_General_Download')}</a>
			</Link>
		</div>
	)
}

export default AppDownload
