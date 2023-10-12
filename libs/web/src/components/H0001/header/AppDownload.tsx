import { paths } from '@nx-next-app/constants'
import classNames from 'classnames'
import Image from 'next/future/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface IAppDownloadProps {
	isAppDownloadHintActive: boolean
	onCloseAppDownloadHint: () => void
}

const AppDownload = ({
	isAppDownloadHintActive,
	onCloseAppDownloadHint,
}: IAppDownloadProps) => {
	const { t } = useTranslation()

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
			<Image
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/appicon.jpg`}
				alt='appicon-img'
				height={36}
				width={34}
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
