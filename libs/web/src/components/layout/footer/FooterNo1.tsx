export interface IFooterNo1Props {
	value?: string
}

const FooterNo1 = ({ value = '' }: IFooterNo1Props) => {
	return <div>FooterNo1 {value}</div>
}

export default FooterNo1
