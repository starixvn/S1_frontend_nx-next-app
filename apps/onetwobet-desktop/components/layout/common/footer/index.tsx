import FooterBottom from '@12b-desktop/components/layout/common/footer/footerBottom'
import FooterCenter from '@12b-desktop/components/layout/common/footer/footerCenter'
import FooterTop from '@12b-desktop/components/layout/common/footer/footerTop'
import { IFooterData } from '@nx-next-app/types'

const LayoutFooter = ({ footerData }: { footerData: IFooterData }) => {
	const { aboutUsList, licenseData } = footerData
	return (
		<footer id='footer'>
			<FooterTop />
			<FooterCenter aboutUsList={aboutUsList} licenseData={licenseData} />
			<FooterBottom />
		</footer>
	)
}

export default LayoutFooter
