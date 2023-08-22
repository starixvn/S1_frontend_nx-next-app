import React from 'react'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import {
	useGetAppDownloadLinksQuery,
	IAppDownloadLinks,
} from '@nx-next-app/service'
import QRCode from 'qrcode.react'

const AppDownload = () => {
	const { t } = useTranslation()
	const {
		data: { androidDownLoadUrl, IOSDownloadUrl },
	} = useGetAppDownloadLinksQuery(null, {
		selectFromResult: ({ data: { data: originList = [] } = {} }) => {
			const formatData: Record<string, IAppDownloadLinks> = originList.reduce(
				(acc: Record<string, IAppDownloadLinks>, cur: IAppDownloadLinks) => {
					return { ...acc, [cur.appTypeName]: cur }
				},
				{}
			)
			return {
				data: {
					androidDownLoadUrl: formatData['Andriod']?.downloadLink,
					IOSDownloadUrl: formatData['IOS']?.downloadLink,
				},
			}
		},
	})

	return (
		<main className='app'>
			<div className='appHeader'>
				<a>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/applogo.png`}
						alt='img_applogo'
						width={456}
						height={100}
					/>
				</a>
			</div>
			<div className='appPage'>
				<div className='appTitle'>{t('Label_APP_DOWNLOAD')}</div>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/new-appbanner.png`}
					alt='img_appbanner'
					width={1532}
					height={807}
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
									<Image
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/ios.png`}
										alt='img_ios'
										width={84}
										height={84}
									/>

									{t('Label_iOS')}
								</div>
								<a href={IOSDownloadUrl} target='_blank' rel='noreferrer'>
									{/* <button>{t("lbl_DOWNLOAD")}</button> */}
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
									<Image
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/and.png`}
										alt='img_android'
										width={84}
										height={84}
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
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/iosicon.png`}
							alt='img_iosicon'
							width={40}
							height={40}
						/>
						{t('Label_iOS_App_Trust_Authentication')}
					</div>
					<div>{t('Label_Once_Nova88_App_is_installed')}</div>
					<div className='installWrapper'>
						<div className='installStep'>
							<div>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/new-step1.png`}
									alt=''
									width={550}
									height={978}
								/>
								<div>
									<span>{t('Label_Step', { step: 1 })}</span>
									{t('Label_DownloadAppStep1')}
								</div>
							</div>
							<div>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/Step2.png`}
									alt=''
									width={550}
									height={978}
								/>
								<div>
									<span>{t('Label_Step', { step: 2 })}</span>
									{t('Label_DownloadAppStep2')}
								</div>
							</div>
							<div>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/Step3.png`}
									alt=''
									width={550}
									height={978}
								/>
								<div>
									<span>{t('Label_Step', { step: 3 })}</span>
									{t('Label_DownloadAppStep3')}
									<br />
									{t('Label_DownloadAppStep3-1')}
								</div>
							</div>
							<div>
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/app/new-step4.png`}
									alt=''
									width={550}
									height={978}
									style={{ height: 'auto' }}
								/>
								<div>
									<span>{t('Label_Step', { step: 4 })}</span>
									{t('Label_DownloadAppStep4')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default AppDownload
