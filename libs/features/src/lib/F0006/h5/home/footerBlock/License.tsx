import React, { useEffect } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { ISeoData } from 'libs/web/src/app/types/footer'
import { useGetSeoQuery } from '@nx-next-app/service'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0006/providers'

// 手機版 License 只存在於此處，資料流不像桌機有在 Layout 中共用，故獨立寫在 Home 內
const License = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	const { META_DATA } = useStaticData()
	const {
		licenseData: { defaultScript, defaultXCMScript },
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

export { License }
