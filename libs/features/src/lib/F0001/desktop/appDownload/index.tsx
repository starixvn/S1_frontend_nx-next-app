import { paths } from '@nx-next-app/constants'
import { useAppDownload } from '@nx-next-app/features/F0001/providers/appDownload-context'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'

const AppDownload = () => {
	const { IOSDownloadUrl, androidDownLoadUrl, APP_DOWNLOAD_LIST } =
		useAppDownload()
	const { t } = useTranslation()
	return (
		<main className='app'>
			<div className='appHeader'>
				<a href={paths.home.root}>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/applogo.png`}
						alt='img_applogo'
					/>
				</a>
			</div>
			<div className='appPage'>
				<div className='appTitle'>{t('Label_APP_DOWNLOAD')}</div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/new-appbanner.png`}
					alt='img_appbanner'
				/>
				<div className='scan'>
					<div>
						<div />
						<div>{t('Label_SCAN_ME_NOW')}</div>
					</div>
					<div>
						<div>
							{IOSDownloadUrl && (
								<QRCode
									value={IOSDownloadUrl}
									renderAs='svg'
									size={152}
									includeMargin
								/>
							)}

							<div>
								<div>
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/ios.png`}
										alt='img_ios'
									/>

									{t('Label_iOS')}
								</div>
								<a href={IOSDownloadUrl} target='_blank' rel='noreferrer'>
									<button>{t('Label_DOWNLOAD')}</button>
								</a>
							</div>
						</div>
						<div>
							{androidDownLoadUrl && (
								<QRCode
									value={androidDownLoadUrl}
									renderAs='svg'
									size={152}
									includeMargin
								/>
							)}

							<div>
								<div>
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/and.png`}
										alt='img_android'
									/>
									{t('Label_Android')}
								</div>
								<a href={androidDownLoadUrl} download rel='noreferrer'>
									<button>{t('Label_DOWNLOAD')}</button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='install'>
					<div>{t('Label_Installation_tutorial')}</div>
					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/iosicon.png`}
							alt='img_iosicon'
						/>
						{t('Label_iOS_App_Trust_Authentication')}
					</div>
					<div>{t('Label_Once_Nova88_App_is_installed')}</div>
					<div className='installWrapper'>
						<div className='installStep'>
							{APP_DOWNLOAD_LIST.map(({ id, imgName, displayKey }) => (
								<div key={id}>
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/${imgName}.png`}
										alt={imgName}
									/>
									<div>
										<span>{t('Label_Step', { step: id })}</span>
										{t(displayKey)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default AppDownload
