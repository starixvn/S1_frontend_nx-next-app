import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { useBoolean } from 'usehooks-ts'

interface IDepositBankSlipButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	tip: string
	receipt?: string
}

interface ISubmitBankSlipWarningProps {
	tip: string
	active: boolean
	toggle: () => void
}

const DepositBankSlipButton = ({
	children,
	tip,
	receipt,
	...props
}: IDepositBankSlipButtonProps) => {
	const { value: isActiveTip, toggle } = useBoolean(false)

	const displayWarning = !receipt || receipt === ''

	return (
		<>
			<div className='btnGroup'>
				<button className='blue' {...props}>
					{children}
				</button>
			</div>
			{displayWarning && (
				<SubmitBankSlipWarning active={isActiveTip} toggle={toggle} tip={tip} />
			)}
		</>
	)
}

const SubmitBankSlipWarning = ({
	tip,
	active,
	toggle,
}: ISubmitBankSlipWarningProps) => {
	return (
		<>
			<i className='icon icon-warning' onClick={toggle} />
			<div
				className={classNames('tip', {
					active,
				})}
			>
				{tip}
			</div>
		</>
	)
}

export default DepositBankSlipButton
