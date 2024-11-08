import License from './License'
import PaymentOptions from './PaymentOptions'
import ProviderSwiper from './ProviderSwiper'
import SiteInfo from './SiteInfo'
import SocialMedia from './SocialMedia'
import Sponsorship from './Sponsorship'

const FooterBlock = () => {
	return (
		<>
			<PaymentOptions />
			<ProviderSwiper />
			<Sponsorship />
			<SocialMedia />
			<SiteInfo />
			<License />
		</>
	)
}

export default FooterBlock
