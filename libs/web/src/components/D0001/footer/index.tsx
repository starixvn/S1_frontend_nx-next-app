import React, { ReactNode } from 'react'
import CopyRight from './CopyRight'
import License from './License'
import PlatForm from './PlatForm'
import PromotionText from './PromotionText'
import ServicePlan from './ServicePlan'
import Sfp from './Sfp'

const Footer = ({ children }: { children: ReactNode }) => {
	return <footer id='footer'>{children}</footer>
}

Footer.CopyRight = CopyRight
Footer.License = License
Footer.PlatForm = PlatForm
Footer.PromotionText = PromotionText
Footer.ServicePlan = ServicePlan
Footer.Sfp = Sfp

export default Footer
