import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useGetSeoQuery } from '@nx-next-app/service'
import { ILicenseData, ISeoData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect } from 'react'

const License = ({
	licenseData: { defaultScript },
}: {
	licenseData: ILicenseData
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()
	const { META_DATA } = useStaticData()

	const { data: seoData } = useGetSeoQuery(null, {
		selectFromResult: ({ data: { data } = {}, isSuccess }) => {
			let pathname = ''
			if (typeof window !== 'undefined') {
				pathname = window.location.pathname
			}
			const pathArr = pathname?.split('/').filter(str => str !== '')
			let seoData: ISeoData = {}
			// 判斷 META_DATA 是否路徑
			if (META_DATA[`/${pathArr[1]}`]) {
				const rootPath = META_DATA[`/${pathArr[1]}`]
				seoData = {
					...data,
					title: rootPath?.[langId]?.title ?? rootPath?.['en']?.title,
					keyword: rootPath?.[langId]?.keyword ?? rootPath?.['en']?.keyword,
					description:
						rootPath?.[langId]?.description ?? rootPath?.['en']?.description,
					links: rootPath?.[langId]?.links ?? rootPath?.['en']?.links,
				}
			} else {
				// 如果沒路徑就當作首頁處理
				seoData = {
					...data,
					description: data?.meta,
					links: META_DATA?.['/']?.[langId]?.['links'] ?? [],
				}
			}

			return { data: seoData, isSuccess }
		},
	})
	const showLicenseLogo = seoData?.activeDomain ?? false
	const CuracaoScript = seoData?.script ?? defaultScript
	const formattedCuracaoScript = CuracaoScript?.split('-').join('_')

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
			<div className='footer-center-title'>{t('Label_Gaming_License')}</div>

			<ul>
				<li>
					<Link href='https://www.thawte.com/'>
						<a target='_blank'>
							<img
								src={getBannerUrl('/desktop/img/thawte.png')}
								alt='thawte logo'
							/>
						</a>
					</Link>
				</li>
				<li>
					<Link href='https://www.gambleaware.co.uk/'>
						<a target='_blank'>
							<img
								src={getBannerUrl('/desktop/img/gambleaware.png')}
								alt='gambleaware logo'
							/>
						</a>
					</Link>
				</li>
				<li>
					<Link href='https://promotions.12bet.com/TST/'>
						<a target='_blank'>
							<img src={getBannerUrl('/desktop/img/TST.png')} alt='TST logo' />
						</a>
					</Link>
				</li>
				<li>
					<Link href=''>
						<a target='_blank'>
							<img
								src={getBannerUrl('/desktop/img/safe-secure.png')}
								alt='safe-secure logo'
							/>
						</a>
					</Link>
				</li>
				{showLicenseLogo && (
					<>
						<li
							id={`apg-${CuracaoScript}`}
							data-apg-seal-id={CuracaoScript}
							data-apg-image-size='64'
							data-apg-image-type='basic-small'
						/>
						<a
							href='https://www.begambleaware.org/'
							target='_blank'
							rel='noreferrer'
						>
							{/* <img
								src='https://banner.picasso12.com/desktop/img/curacao.png'
								alt=''
							/> */}
						</a>
					</>
				)}
			</ul>

			<Script
				src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js`}
				strategy='lazyOnload'
			/>
		</>
	)
}

export default License
