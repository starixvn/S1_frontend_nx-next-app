import React, { ReactNode } from 'react'
import CopyRight from './CopyRight'
import License from './License'
import PlatForm from './PlatForm'
import ProgramDescriptionList from './ProgramDescriptionList'
import ProgramList from './ProgramList'
import Sfp from './Sfp'

const Footer = ({ children }: { children: ReactNode }) => {
	return <footer id='footer'>{children}</footer>
}

Footer.CopyRight = CopyRight
Footer.PlatForm = PlatForm
Footer.ProgramList = ProgramList
Footer.ProgramDescriptionList = ProgramDescriptionList
Footer.License = License
Footer.Sfp = Sfp

export default Footer
