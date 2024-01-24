import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useDownloadLinks } from '@nx-next-app/hooks'
import { Trans, useTranslation } from 'next-i18next'

const AppDownload = () => {
	const { t } = useTranslation()
	const { androidDownLoadUrl, iosDownloadUrl, androidTypeName, iosTypeName } =
		useDownloadLinks()

	return (
		<div className='home-appdownload'>
			<div className='home-appdownload-content'>
				<div className='text'>
					<div>{t('Label_APP_DOWNLOAD')}</div>
					<div>
						<Trans
							i18nKey='Label_APP_DOWNLOAD_Title'
							components={{
								span: <span />,
							}}
						/>
					</div>
					<div>{t('Label_AppDownload_SubTitle')}</div>
				</div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/app.png`}
					alt='app download'
				/>
			</div>
			<div className='btn-download'>
				<div>
					{iosDownloadUrl && (
						<a href={iosDownloadUrl} download>
							<button className='ios'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/apple.png`}
									alt='iOS'
								/>
								{iosTypeName}
							</button>
						</a>
					)}
					<Link href={paths.appDownload.root}>
						{t('Label_AppDownload_Instructions')}
					</Link>
				</div>
				<div>
					{androidDownLoadUrl && (
						<a href={androidDownLoadUrl} download>
							<button className='android'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/android.png`}
									alt='android'
								/>
								{androidTypeName}
							</button>
						</a>
					)}
					<Link href={paths.appDownload.root}>
						{t('Label_AppDownload_Instructions')}
					</Link>
				</div>
			</div>
		</div>
	)
}

export { AppDownload }
