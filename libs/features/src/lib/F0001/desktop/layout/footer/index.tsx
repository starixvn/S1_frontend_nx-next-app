import { Footer } from '@nx-next-app/components/D0001'
import { useGetSeoQuery, useGetSocialChannelQuery } from '@nx-next-app/service'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { SocialChannelEnum } from 'libs/features/src/lib/F0001/types'
import { IResponseConvertedFooterData } from 'libs/web/src/app/types/footer'

const LayoutFooter = ({
	footerData,
	isFullFooter = false,
}: {
	footerData: IResponseConvertedFooterData
	isFullFooter: boolean
}) => {
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

			return { data: seoData }
		},
	})

	return (
		<Footer>
			<Footer.CopyRight copyRightList={footerData.copyRightList} />

			{isFullFooter && (
				<Footer.PlatForm platformList={footerData.platformList} />
			)}

			<div className='footerList'>
				<Footer.ServicePlan servicePlanData={footerData.servicePlanData} />

				{isFullFooter && (
					<Footer.PromotionText
						promotionTextList={footerData.promotionTextList}
					/>
				)}
			</div>

			<Footer.License licenseData={footerData.licenseData} seoData={seoData} />

			{isGetSocialChannelListLoading ? null : (
				<Footer.Sfp
					sfpData={footerData.sfpData}
					socialChannelList={socialChannelList}
				/>
			)}
		</Footer>
	)
}

export default LayoutFooter
