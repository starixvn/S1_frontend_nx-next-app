import SimpleFooter from '@nx-next-app/features/F0001/h5/home/SimpleFooter'

import Footer from '@nx-next-app/components/D0001/footer'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperFooter } from '@nx-next-app/features/F0001/h5/home/footerBlock/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { SocialChannelEnum } from '@nx-next-app/features/F0001/types'
import { useGetSocialChannelQuery } from '@nx-next-app/service'
import classNames from 'classnames'
// import { License } from './License'

const index = () => {
	const { persistPaymentMethods, quickLinksList } = useHome()

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()
	const {
		data: { data: socialChannelList = [] } = {},
		isLoading: isGetSocialChannelListLoading,
	} = useGetSocialChannelQuery({
		currencyId: currencyId as number,
		langId,
		displayPage: SocialChannelEnum.FOOTER,
	})
	return (
		<WrapperFooter>
			<div className={classNames('home-bottom', { 'logged-in': isLogin })}>
				<Footer>
					<div className='footer-top'>
						{!!quickLinksList && (
							<Footer.QuickLinks quickLinks={quickLinksList} /> // todo: need to update Footer.QuickLinks since I reused the desktop footer version
						)}
					</div>
					<div className='footer-center'>
						{isGetSocialChannelListLoading ? null : (
							<Footer.SocialMedia socialChannelList={socialChannelList} />
						)}
						{/* <Footer.SuggestBrowser suggestedBrowser={suggestedBrowser} /> */}
						<Footer.PaymentMethod
							paymentMethodsByCurrencyId={persistPaymentMethods} // todo need to update Footer.PaymentMethod since I reused the desktop footer version
						/>
					</div>
					{/* <Footer.PromotionText promotionTextList={promotionTextList} /> */}
				</Footer>
				{/* <License /> */}
				{/* <Affiliate /> */}
				<SimpleFooter />
			</div>
		</WrapperFooter>
	)
}

export default index
