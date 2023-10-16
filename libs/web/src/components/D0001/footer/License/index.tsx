import { IFooterData, ISeoData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useEffect } from 'react'
import Head from 'next/head'

const License = ({
	licenseData: { defaultScript, defaultXCMScript },
	seoData,
}: {
	licenseData: IFooterData['licenseData']
	seoData: ISeoData
}) => {
	const { t } = useTranslation()
	const showLicenseLogo = seoData?.activeDomain ?? false
	const CuracaoScript = seoData?.script ?? defaultScript
	const formattedCuracaoScript = CuracaoScript?.split('-').join('_')

	const XCMScript = seoData?.xcmScript ?? defaultXCMScript
	const formattedXCMScript = XCMScript?.split('-').join('_')

	useEffect(() => {
		if (showLicenseLogo) {
			/* eslint-disable @typescript-eslint/no-explicit-any */
			const apgScript = (window as any)[`apg_${formattedCuracaoScript}`]
			const xcmScript = (window as any)[`xcm_${formattedXCMScript}`]
			apgScript?.init()
			xcmScript?.init()
		}
	}, [showLicenseLogo])
	return (
		<>
			<div className='license'>
				<div>
					{showLicenseLogo && (
						<>
							<div className='title'>
								{t('Label_Gaming_License')}
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/license_tick.png`}
									alt='vaild gaming license'
									width={30}
									height={30}
								/>
							</div>
							<div>
								<div
									id={`apg-${CuracaoScript}`}
									data-apg-seal-id={CuracaoScript}
									data-apg-image-size='128'
									data-apg-image-type='basic-small'
								/>
								<div
									id={`xcm-${XCMScript}`}
									data-xcm-seal-id={XCMScript}
									data-xcm-image-size='128'
									data-xcm-image-type='basic-small'
								/>
								<div>
									<a
										href='https://www.begambleaware.org/'
										target='_blank'
										rel='noreferrer'
									>
										<Image
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/aware.png`}
											alt=''
											width={115}
											height={23}
											style={{ width: '115px', height: '23px' }}
										/>
									</a>
								</div>
							</div>
						</>
					)}
				</div>
				<div>
					<div>
						<div>{t('Label_JOE_COLE')}</div>
						<div>{t('Label_Brand_Ambassador')}</div>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joecole_w.png`}
							alt='joecole_signature'
							width={65}
							height={57}
						/>
						<div>{t('Label_Former_Chelsea_Liverpool')}</div>
						<div>{t('Label_England_International')}</div>
					</div>
					<Image
						className='star'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/jc.png`}
						alt='joecole_photo'
						width={219}
						height={337}
					/>
				</div>
			</div>
			<Head>
				<script
					src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js`}
					async
					defer
				/>
				<script
					src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js`}
					async
					defer
				/>
			</Head>
		</>
	)
}

export default License
