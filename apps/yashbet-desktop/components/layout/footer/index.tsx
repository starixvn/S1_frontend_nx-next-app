import { Footer } from '@nx-next-app/components/D0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGetSeoQuery, useGetSocialChannelQuery } from '@nx-next-app/service'
import { SocialChannelEnum } from 'libs/features/src/lib/F0006/types'
import { IFooterData } from 'libs/web/src/app/types/footer'

const LayoutFooter = ({
	footerData,
	isFullFooter = false,
}: {
	footerData: IFooterData
	isFullFooter: boolean
}) => {
	const {
		copyRightList,
		platformList,
		programList,
		programDescriptionList,
		licenseData,
		suggestedBrowser,
		paymentMethodsByCurrencyId,
	} = footerData

	const {
		userInfo: { currencyId, langId },
	} = useAuth()

	const { META_DATA } = useStaticData()

	const {
		data: { data: socialChannelList = [] } = {},
		isLoading: isGetSocialChannelListLoading,
	} = useGetSocialChannelQuery({
		currencyId: currencyId as number,
		langId,
		displayPage: SocialChannelEnum.FOOTER,
	})

	const { data: seoData } = useGetSeoQuery(null, {
		selectFromResult: ({ data: { data } = {} }) => {
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

			return { data: seoData }
		},
	})

	const isPromoListShowed =
		(!!programList && programList?.length > 0) ||
		(!!programDescriptionList &&
			programDescriptionList?.length > 0 &&
			isFullFooter)

	return (
		<Footer>
			{!!copyRightList && <Footer.CopyRight copyRightList={copyRightList} />}

			{!!platformList && isFullFooter && (
				<Footer.PlatForm platformList={platformList} />
			)}

			{isPromoListShowed && (
				<div className='footerList'>
					{!!programList && <Footer.ProgramList programList={programList} />}

					{!!programDescriptionList && isFullFooter && (
						<Footer.ProgramDescriptionList
							promotionTextList={programDescriptionList}
						/>
					)}
				</div>
			)}

			{isFullFooter && (
				<Footer.License licenseData={licenseData} seoData={seoData} />
			)}

			{isGetSocialChannelListLoading ? null : (
				<Footer.Sfp
					suggestedBrowser={suggestedBrowser}
					paymentMethodsByCurrencyId={paymentMethodsByCurrencyId}
					socialChannelList={socialChannelList}
				/>
			)}
		</Footer>
	)
}

export default LayoutFooter
