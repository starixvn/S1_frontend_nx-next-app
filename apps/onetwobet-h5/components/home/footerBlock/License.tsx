import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import { useGetSeoQuery } from '@nx-next-app/service'
import { ISeoData } from 'libs/web/src/app/types/footer'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect } from 'react'

const License = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()

	const { META_DATA } = useStaticData()
	const {
		licenseData: { defaultScript },
	} = useHome()

	const { data: seoData } = useGetSeoQuery(null, {
		selectFromResult: ({ data: { data } = {} }) => {
			let pathname = ''
			if (typeof window !== 'undefined') {
				pathname = window.location.pathname
			}
			const pathArr = pathname?.split('/').filter(str => str !== '')
			const isHomePath = pathArr.length < 2
			let seoData = {}
			if (isHomePath) {
				seoData = {
					...data,
					description: data?.meta,
					links: META_DATA?.[langId]?.['links'],
				}
			} else if (META_DATA[pathArr[1]]) {
				const rootPath = META_DATA[pathArr[1]]
				seoData = {
					title: rootPath?.[langId]?.title ?? rootPath?.['en']?.title,
					keyword: rootPath?.[langId]?.keyword ?? rootPath?.['en']?.keyword,
					description:
						rootPath?.[langId]?.description ?? rootPath?.['en']?.description,
					links: rootPath?.[langId]?.links ?? rootPath?.['en']?.links,
				}
			}

			return { data: seoData as ISeoData }
		},
	})

	const showLicenseLogo = seoData?.activeDomain ?? false
	const CuracaoScript = seoData?.script ?? defaultScript
	const formattedCuracaoScript = CuracaoScript?.split('-').join('_')

	// 市場通知暫時移除 XCM 2024/7/16
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
			<div className='license'>
				<div className='title'>{t('Label_License_Title')}</div>
				{showLicenseLogo && (
					<div className='content'>
						<div className='license-logo'>
							<ul>
								<li>
									<a
										href='https://www.thawte.com/'
										target='_blank'
										rel='noreferrer'
									>
										<img
											src={getBannerUrl('/desktop/img/thawte.png')}
											alt='thawte logo'
										/>
									</a>
								</li>
								<li>
									<a
										href='https://www.gambleaware.co.uk/'
										target='_blank'
										rel='noreferrer'
									>
										<img
											src={getBannerUrl('/desktop/img/gambleaware.png')}
											alt='gambleaware logo'
										/>
									</a>
								</li>
								<li>
									<a
										href='https://promotions.12bet.com/TST/'
										target='_blank'
										rel='noreferrer'
									>
										<img
											src={getBannerUrl('/desktop/img/TST.png')}
											alt='TST logo'
										/>
									</a>
								</li>
								<li>
									<a href='' target='_blank' rel='noreferrer'>
										<img
											src={getBannerUrl('/desktop/img/safe-secure.png')}
											alt='safe-secure logo'
										/>
									</a>
								</li>
								<li
									id={`apg-${CuracaoScript}`}
									data-apg-seal-id={CuracaoScript}
									data-apg-image-size='48'
									data-apg-image-type='basic-small'
								/>
							</ul>
						</div>
						<p>{t('Label_License_Content')}</p>
						<p>{t('Label_Footer_Content')}</p>
						<p>
							{t('Label_Footer_Copyright', {
								year: `2008 - ${new Date().getFullYear().toString()}`,
								site: '12BET',
							})}
						</p>
					</div>
				)}
			</div>
			<Head>
				<script
					src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js`}
					defer
				/>
				{/* 市場通知緊急移除 */}
				{/* <script */}
				{/*	src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js`} */}
				{/*	defer */}
				{/* /> */}
			</Head>
		</>
	)
}

export default License
