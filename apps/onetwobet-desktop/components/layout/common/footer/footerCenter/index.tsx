import License from '@12b-desktop/components/layout/common/footer/footerCenter/License'
import Products from '@12b-desktop/components/layout/common/footer/footerCenter/Products'
import Provider from '@12b-desktop/components/layout/common/footer/footerCenter/Provider'
import SocialMedia from '@12b-desktop/components/layout/common/footer/footerCenter/SocialMedia'
import { IAboutUsListData, ILicenseData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface IFooterCenterProps {
	aboutUsList: IAboutUsListData[]
	licenseData: ILicenseData
}

const FooterCenter = ({ aboutUsList, licenseData }: IFooterCenterProps) => {
	const { t } = useTranslation()

	return (
		<div className='footer-center'>
			{/* <!-- Products --> */}
			<div className='footer-center-item'>
				<Products />
			</div>

			{/* <!-- About Us --> */}
			<div className='footer-center-item'>
				<div className='footer-center-title'>{t('Label_General_AboutUs')}</div>
				<ul>
					{aboutUsList.map(item => {
						const { pathname, displayText } = item
						return (
							<li key={displayText}>
								<Link href={pathname}>
									<a>{t(displayText)}</a>
								</Link>
							</li>
						)
					})}
				</ul>
			</div>

			{/* <!-- License --> */}
			<div className='footer-center-item license'>
				<License licenseData={licenseData} />
			</div>

			{/* <!-- Provider --> */}
			<div className='footer-center-item provider'>
				<Provider />
			</div>
			{/* <!-- Connect --> */}
			<div className='footer-center-item connect'>
				<SocialMedia />
			</div>
		</div>
	)
}

export default FooterCenter
