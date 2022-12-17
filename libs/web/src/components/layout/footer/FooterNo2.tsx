export interface IFooterNo2Props {
	value?: string
	title?: string
}

const FooterNo2 = ({ value = '', title = '' }: IFooterNo2Props) => {
	return (
		<div>
			FooterNo2 {value} {title}
		</div>
	)
}

export default FooterNo2
