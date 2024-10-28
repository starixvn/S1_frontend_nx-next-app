import { IFooterData, ISeoData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
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
	const CuracaoScript = seoData?.script ?? defaultScript
	const formattedCuracaoScript = CuracaoScript?.split('-').join('_')

	// 市場通之暫時移除 XCM License 2024/7/16
	// const XCMScript = seoData?.xcmScript ?? defaultXCMScript
	// const formattedXCMScript = XCMScript?.split('-').join('_')

	useEffect(() => {
		if (showLicenseLogo) {
			/* eslint-disable @typescript-eslint/no-explicit-any */
			const apgScript = (window as any)[`apg_${formattedCuracaoScript}`]
			// const xcmScript = (window as any)[`xcm_${formattedXCMScript}`]
			apgScript?.init()
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
							id={`apg-${CuracaoScript}`}
							data-apg-seal-id={CuracaoScript}
							data-apg-image-size='128'
							data-apg-image-type='basic-small'
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

			{/* //TODO: Third party
			<Script
				src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js`}
				strategy='lazyOnload'
			/> */}

			{/* <Script */}
			{/*	src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js`} */}
			{/*	strategy='lazyOnload' */}
			{/* /> */}
		</>
	)
}

export default License
