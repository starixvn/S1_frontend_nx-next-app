import { ReactNode } from 'react'
import QuickLinks from './CopyRight'
import License from './License'
import ProgramDescriptionList from './ProgramDescriptionList'
import ProgramList from './ProgramList'
// import SocialMedia from './SocialMedia'
import PaymentMethod from './PaymentMethod'
import PromotionText from './PromotionText'
import SuggestBrowser from './SuggestBrowser'

const Footer = ({ children }: { children: ReactNode }) => {
	return <footer id='footer'>{children}</footer>
}

Footer.QuickLinks = QuickLinks
// Footer.SocialMedia = SocialMedia
Footer.ProgramList = ProgramList
Footer.ProgramDescriptionList = ProgramDescriptionList
Footer.License = License
Footer.SuggestBrowser = SuggestBrowser
Footer.PaymentMethod = PaymentMethod
Footer.PromotionText = PromotionText

export default Footer
