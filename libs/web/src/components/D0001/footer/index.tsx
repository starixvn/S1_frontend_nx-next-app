import { ReactNode } from 'react'
import QuickLinks from './CopyRight'
import PaymentMethod from './PaymentMethod'
import ProgramDescriptionList from './ProgramDescriptionList'
import ProgramList from './ProgramList'
// import PromotionText from './PromotionText'
import SocialMedia from './SocialMedia'
import SuggestBrowser from './SuggestBrowser'

const Footer = ({ children }: { children: ReactNode }) => {
	return <footer id='footer'>{children}</footer>
}

Footer.QuickLinks = QuickLinks
Footer.SocialMedia = SocialMedia
Footer.ProgramList = ProgramList
Footer.ProgramDescriptionList = ProgramDescriptionList
Footer.SuggestBrowser = SuggestBrowser
Footer.PaymentMethod = PaymentMethod
// Footer.PromotionText = PromotionText

export default Footer
