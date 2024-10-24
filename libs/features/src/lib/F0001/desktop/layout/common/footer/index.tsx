import { Footer } from '@nx-next-app/components/D0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGetSeoQuery } from '@nx-next-app/service'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const LayoutFooter = ({ footerData }: { footerData: IFooterData }) => {
	const {
		quickLinks,
		licenseData,
		suggestedBrowser,
		paymentMethodsByCurrencyId,
		promotionTextList,
	} = footerData

	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { META_DATA } = useStaticData()
	const { t } = useTranslation()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'])
	// const {
	// 	data: { data: socialChannelList = [] } = {},
	// 	isLoading: isGetSocialChannelListLoading,
	// } = useGetSocialChannelQuery({
	// 	currencyId: currencyId as number,
	// 	langId,
	// 	displayPage: SocialChannelEnum.FOOTER,
	// })

	const { data: seoData, isSuccess } = useGetSeoQuery(null, {
		selectFromResult: ({ data: { data } = {}, isSuccess }) => {
			let pathname = ''
			if (typeof window !== 'undefined') {
				pathname = window.location.pathname
			}
			const pathArr = pathname?.split('/').filter(str => str !== '')
			let seoData = {}
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
					links: META_DATA?.[langId]?.['links'],
				}
			}

			return { data: seoData, isSuccess }
		},
	})
	return (
		<Footer>
			<div className='footer-top'>
				{!!quickLinks && <Footer.QuickLinks quickLinks={quickLinks} />}
				{/* {isGetSocialChannelListLoading ? null : (
					<Footer.SocialMedia socialChannelList={socialChannelList} />
				)} */}
			</div>
			<div className='footer-center'>
				{isSuccess && (
					<Footer.License licenseData={licenseData} seoData={seoData} />
				)}
				<Footer.SuggestBrowser suggestedBrowser={suggestedBrowser} />
				<Footer.PaymentMethod
					paymentMethodsByCurrencyId={paymentMethodsByCurrencyId}
				/>
			</div>
			<div className='copyright'>
				{t('Label_Footer_Copyright', { year, site })}
			</div>
			<Footer.PromotionText promotionTextList={promotionTextList} />
		</Footer>
	)
}

export default LayoutFooter
