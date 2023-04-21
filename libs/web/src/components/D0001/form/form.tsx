import React from 'react'

interface IFormProps
	extends React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> {
	component?: boolean
}

const Form = ({ children, component = false, ...restProps }: IFormProps) => {
	return (
		<form style={{ display: 'contents' }} {...restProps}>
			{children}
		</form>
	)
}

export default Form
