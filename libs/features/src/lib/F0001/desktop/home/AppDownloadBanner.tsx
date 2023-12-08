import QRCode from 'qrcode.react'
import Image from 'next/future/image'

import { Trans, useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useDownloadLinks } from '@nx-next-app/hooks'

const AppDownloadBanner = () => {
	const { t } = useTranslation()
	const { androidDownLoadUrl, iosDownloadUrl, androidTypeName, iosTypeName } =
		useDownloadLinks()

	return (
		<div className='appdownload'>
			<div className='appdownload-text'>
				<div>{t('Label_APP_DOWNLOAD')}</div>
				<div>
					<Trans
						i18nKey='Label_AppDownload_Title'
						components={{
							span: <span />,
						}}
					/>
				</div>
				<div>{t('Label_AppDownload_SubTitle')}</div>
			</div>
			<div className='app-qrcode'>
				<div className='app-qrcode-item'>
					{iosDownloadUrl && (
						<QRCode
							value={iosDownloadUrl}
							renderAs='svg'
							size={152}
							includeMargin
						/>
					)}

					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/apple.png`}
							alt=''
						/>
						<span>{iosTypeName}</span>
					</div>

					<Link href={paths.appDownload.root}>
						{t('Label_AppDownload_Instructions')}
					</Link>
				</div>
				<div className='app-qrcode-item'>
					{androidDownLoadUrl && (
						<QRCode
							value={androidDownLoadUrl}
							renderAs='svg'
							size={152}
							includeMargin
						/>
					)}

					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/android.png`}
							alt='img-android'
						/>
						<span>{androidTypeName}</span>
					</div>
					<Link href={paths.appDownload.root}>
						{t('Label_AppDownload_Instructions')}
					</Link>
				</div>
			</div>
			<div className='player'>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/player.png`}
					alt='img-player'
					width={766}
					height={579}
				/>
			</div>
		</div>
	)
}

export { AppDownloadBanner }
