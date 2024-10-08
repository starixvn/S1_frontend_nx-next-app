import License from '@12b-desktop/components/layout/common/footer/footerCenter/License'
import Products from '@12b-desktop/components/layout/common/footer/footerCenter/Products'
import Provider from '@12b-desktop/components/layout/common/footer/footerCenter/Provider'
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
							<li>
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
				<div className='footer-center-title'>Connect</div>
				<ul>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/facebook.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/twitter.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/youtube.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/instagram.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/wechat.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/line.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/blogger.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/pinterest.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/whatsapp.png'
								alt=''
							/>
						</a>
					</li>
					<li>
						<a href=''>
							<img
								src='https://banner.picasso12.com/desktop/img/email.png'
								alt=''
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default FooterCenter
