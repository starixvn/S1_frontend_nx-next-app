import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'
import { useAppDownload } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'

const AppDownloadModal = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { IOSDownloadUrl } = useAppDownload()
	const { closeModal } = useGlobalModal()

	// TODO: 待確認QR code之後顯示，目前先用假圖

	return (
		// active操控出現與否
		<div id='popup' className='active'>
			<div className='appdownload-pop'>
				<i className='icon icon-close-radius' onClick={closeModal} />
				<div className='pop-container'>
					<img
						src={getBannerUrl('/desktop/img/12bet-logo.png')}
						alt='12bet logo'
					/>
					<div className='title'>{t('Label_APP_DOWNLOAD')}</div>
					{/* <!-- QR CODE --> */}
					<div className='item-container'>
						<div className='download-item'>
							<div className='icon-group'>
								<a className='icon icon-pc-w' />
								<a className='icon icon-android-w' />
							</div>
							<div className='qr-code'>
								<img src='img/12betapp-ios.png' alt='android pc QR code' />
								{/* TODO: 讓使用者可以直接下載 */}
								<button className='primary '>{t('Label_DOWNLOAD')}</button>
							</div>
						</div>
						<div className='download-item'>
							<div className='icon-group'>
								<a className='icon icon-mobile-w' />
								<a className='icon icon-ios-w' />
							</div>
							<div className='qr-code'>
								{IOSDownloadUrl ? (
									<QRCode
										value={IOSDownloadUrl}
										renderAs='svg'
										size={152}
										includeMargin
									/>
								) : (
									<img src='img/12betapp-ios.png' alt='ios QR code' />
								)}
								{/* TODO: 讓使用者可以直接下載 */}
								<a href={IOSDownloadUrl} target='_blank' rel='noreferrer'>
									<button className='primary '>{t('Label_DOWNLOAD')}</button>
								</a>
							</div>
						</div>
						<div className='download-item'>
							<div className='icon-group'>
								<a className='icon icon-mobile-w' />
								<a className='icon icon-android-w' />
							</div>
							<div className='qr-code'>
								<img src='img/12betapp-ios.png' alt='android mobile QR code' />
								{/* TODO: 讓使用者可以直接下載 */}
								<button className='primary '>{t('Label_DOWNLOAD')}</button>
							</div>
						</div>
					</div>
					{/* <!-- TIP --> */}
					<div className='pop-tip'>{t('Label_AppDownload_Note')}</div>
				</div>
			</div>
		</div>
	)
}

export default AppDownloadModal
