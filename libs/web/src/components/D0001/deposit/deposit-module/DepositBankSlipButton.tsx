import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { useBoolean } from 'usehooks-ts'

interface IDepositBankSlipButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	tip: string
}

const DepositBankSlipButton = ({
	children,
	tip,
	...props
}: IDepositBankSlipButtonProps) => {
	const { value: isActiveTip, toggle } = useBoolean(false)

	return (
		<>
			<div className='btnGroup'>
				<button className='blue' {...props}>
					{children}
				</button>
			</div>
			<i className='icon icon-warning' onClick={toggle} />
			<div
				className={classNames('tip', {
					active: isActiveTip,
				})}
			>
				{tip}
			</div>
		</>
	)
}

export default DepositBankSlipButton
