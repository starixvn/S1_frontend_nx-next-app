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
		<form {...restProps} className='form'>
			{children}
			<button className='btn-submit' type='submit' aria-label='form-submit' />
		</form>
	)
}

export default Form
