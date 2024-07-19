import { IFooterData, ISeoData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import Head from 'next/head'

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

	// 市場通知暫時不顯示 XCM License 2024/7/16
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
			{/* 因為 yashbet 當前不顯示代言人，故直接判斷 license 出現時機決定是否渲染此區塊 */}
			{showLicenseLogo && (
				<div className='license'>
					<div>
						{showLicenseLogo && (
							<>
								<div className='title'>
									{t('Label_Gaming_License')}
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/license_tick.png`}
										alt='vaild gaming license'
									/>
								</div>
								<div>
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
									<div>
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
							</>
						)}
					</div>
					{/* 代言人先註解掉 */}
					{/* <div> */}
					{/*	<div> */}
					{/*		<div>{t('Label_JOE_COLE')}</div> */}
					{/*		<div>{t('Label_Brand_Ambassador')}</div> */}
					{/*		<img */}
					{/*			src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joecole_w.png`} */}
					{/*			alt='joecole_signature' */}
					{/*		/> */}
					{/*		<div>{t('Label_Former_Chelsea_Liverpool')}</div> */}
					{/*		<div>{t('Label_England_International')}</div> */}
					{/*	</div> */}
					{/*	<img */}
					{/*		className='star' */}
					{/*		src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/jc.png`} */}
					{/*		alt='joecole_photo' */}
					{/*	/> */}
					{/* </div> */}
				</div>
			)}

			<Head>
				<script
					src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js`}
					async
					defer
				/>
				{/* <script */}
				{/*	src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js`} */}
				{/*	async */}
				{/*	defer */}
				{/* /> */}
			</Head>
		</>
	)
}

export default License
