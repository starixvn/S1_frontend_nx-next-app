import { IFooterData } from 'libs/web/src/app/types/footer'
import { useTranslation } from 'next-i18next'

const QuickLinks = ({
	quickLinks = [],
}: {
	quickLinks: IFooterData['quickLinks']
}) => {
	const { t } = useTranslation()

	/** `quickLinks` 中的前八個鏈結為 Footer 顯示用 */
	enum LinkEnum {
		AboutUs,
		TermsOfUse,
		ResponsibleGaming,
		ComplaintsAndArbitration,
		TermsConditions,
		AmlKycConditions,
		PaymentPolicy,
		PrivacyPolicy,
	}

	/**
	 * 根據 HTML 結構，將鏈結以兩個一組進行分組。
	 * 每一組的鏈結會渲染到同一個 div 中。
	 *
	 * @example
	 * <div class="top-item">
	 *     <a>About Us</a>
	 *     <a>Terms of Use</a>
	 * </div> */
	const linkGroups = [
		[LinkEnum.AboutUs, LinkEnum.TermsOfUse],
		[LinkEnum.ResponsibleGaming, LinkEnum.ComplaintsAndArbitration],
		[LinkEnum.TermsConditions, LinkEnum.AmlKycConditions],
		[LinkEnum.PaymentPolicy, LinkEnum.PrivacyPolicy],
	]

	return (
		<div className='top-container'>
			{/* 渲染 div */}
			{linkGroups.map(group => (
				<div className='top-item' key={group[0]}>
					{/* 渲染鏈結 */}
					{group.map(linkKey => (
						<a href={quickLinks[linkKey].href} key={linkKey}>
							{t(quickLinks[linkKey].displayKey)}
						</a>
					))}
				</div>
			))}
		</div>
	)
}

export default QuickLinks
