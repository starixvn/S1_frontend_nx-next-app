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
			<div className='btnGroup btn-bank-slip'>
				<button className='btn btn-secondary' {...props}>
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
		<div className='tool-tip-click'>
			<i className='icon icon-alert-fill' onClick={toggle} />
			<div
				className={classNames('tip custom-tooltip-click-body', {
					active,
				})}
			>
				{tip}
			</div>
		</div>
	)
}

export default DepositBankSlipButton
