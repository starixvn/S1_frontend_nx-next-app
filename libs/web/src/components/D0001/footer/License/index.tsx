import { IFooterData, ISeoData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import { useEffect } from 'react'

const License = ({
	licenseData: { defaultScript },
	seoData,
}: {
	licenseData: IFooterData['licenseData']
	seoData: ISeoData
}) => {
	const { t } = useTranslation()
	const showLicenseLogo = seoData?.activeDomain ?? false
	const tobiqueSealId = seoData?.script ?? defaultScript

	// 市場通知暫時移除 XCM License 2024/7/16
	// const XCMScript = seoData?.xcmScript ?? defaultXCMScript
	// const formattedXCMScript = XCMScript?.split('-').join('_')

	useEffect(() => {
		if (showLicenseLogo) {
			const formattedTobiqueSealId = tobiqueSealId?.replace(/-/g, '_')
			/* eslint-disable @typescript-eslint/no-explicit-any */
			const tobiqueScript = (window as any)[`dlag_${formattedTobiqueSealId}`]
			// const xcmScript = (window as any)[`xcm_${formattedXCMScript}`]
			tobiqueScript?.init()
			// xcmScript?.init()
		}
	}, [showLicenseLogo])

	return (
		<>
			<div className='footer-center-item'>
				<div className='footer-center-title'>{t('Label_Gaming_License')}</div>
				{showLicenseLogo && (
					<div className='game-license'>
						<div
							id={`dlag-${tobiqueSealId}`}
							data-dlag-seal-id={tobiqueSealId}
							data-dlag-image-size='128'
							data-dlag-image-type='basic-small'
						/>
						{/* <div */}
						{/*	id={`xcm-${XCMScript}`} */}
						{/*	data-xcm-seal-id={XCMScript} */}
						{/*	data-xcm-image-size='128' */}
						{/*	data-xcm-image-type='basic-small' */}
						{/* /> */}
						<div className='icon-aware'>
							<a
								href='https://www.begambleaware.org/'
								target='_blank'
								rel='noreferrer'
							>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/aware.png`}
									alt=''
									style={{ width: '115px', height: '23px' }}
								/>
							</a>
						</div>
					</div>
				)}
			</div>

			<Script
				src={`https://${tobiqueSealId}.seals.dlagglobal.com/dlag-seal.js`}
				strategy='lazyOnload'
			/>
			{/* <Script */}
			{/*	src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js`} */}
			{/*	strategy='lazyOnload' */}
			{/* /> */}
		</>
	)
}

export default License
