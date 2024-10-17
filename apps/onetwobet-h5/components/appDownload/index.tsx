import { Carousel } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { useAppDownload } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import QRCode from 'qrcode.react'

const AppDownload = () => {
	const { IOSDownloadUrl, androidDownLoadUrl, APP_DOWNLOAD_LIST } =
		useAppDownload()
	const { t } = useTranslation()

	return (
		<main className='main apppage'>
			<div className='app'>
				<div className='appHeader'>
					<a href={paths.home.root}>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/applogo.png`}
							alt='img_applogo'
							width={456}
							height={100}
						/>
					</a>
					<Link href={paths.home.root} passHref>
						<a>
							<i className='icon icon-keyboard_arrow_left' />
						</a>
					</Link>
				</div>
				<div className='appPage'>
					<div className='appTitle'>{t('Label_APP_DOWNLOAD')}</div>
					<div className='scan'>
						<div>
							<div>
								{IOSDownloadUrl && (
									<QRCode
										value={IOSDownloadUrl}
										renderAs='svg'
										size={70}
										includeMargin
									/>
								)}
								<div>
									<div>
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/ios.png`}
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
										size={70}
										includeMargin
									/>
								)}
								<div>
									<div>
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/and.png`}
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
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/iosicon.png`}
								alt='img_iosicon'
							/>
							{t('Label_iOS_App_Trust_Authentication')}
						</div>
						<div style={{ margin: '0 40px' }}>
							{t('Label_Once_Nova88_App_is_installed')}
						</div>
						<div className='installWrapper'>
							<div className='downloadModule' style={{ margin: '0 20px' }}>
								<Carousel
									navigation={false}
									loop={false}
									pagination={false}
									autoplay={false}
								>
									{APP_DOWNLOAD_LIST.map(({ id, imgName, displayKey }) => (
										<div key={id}>
											<img
												src={`https://banner.0814media.net/h5/img/app/${imgName}.png`}
												alt={imgName}
											/>
											<div>
												<span>{t('Label_Step', { step: id })}</span>
												{t(displayKey)}
											</div>
										</div>
									))}
								</Carousel>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default AppDownload
