import { Footer } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useGetSocialChannelQuery } from '@nx-next-app/service'
import { SocialChannelEnum } from 'libs/features/src/lib/F0001/types'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const LayoutFooter = ({ footerData }: { footerData: IFooterData }) => {
	const {
		quickLinks,
		suggestedBrowser,
		paymentMethodsByCurrencyId,
		// promotionTextList,
	} = footerData

	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { t } = useTranslation()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_BRAND_NAME'])
	const {
		data: { data: socialChannelList = [] } = {},
		isLoading: isGetSocialChannelListLoading,
	} = useGetSocialChannelQuery({
		currencyId: currencyId as number,
		langId,
		displayPage: SocialChannelEnum.FOOTER,
	})
	return (
		<Footer>
			<div className='footer-top'>
				{!!quickLinks && <Footer.QuickLinks quickLinks={quickLinks} />}
				{isGetSocialChannelListLoading ? null : (
					<Footer.SocialMedia socialChannelList={socialChannelList} />
				)}
			</div>
			<div className='footer-center'>
				<Footer.SuggestBrowser suggestedBrowser={suggestedBrowser} />
				<Footer.PaymentMethod
					paymentMethodsByCurrencyId={paymentMethodsByCurrencyId}
				/>
			</div>
			<div className='copyright'>
				{t('Label_Footer_Copyright', { year, site })}
			</div>
			{/* <Footer.PromotionText promotionTextList={promotionTextList} /> */}
		</Footer>
	)
}

export default LayoutFooter
