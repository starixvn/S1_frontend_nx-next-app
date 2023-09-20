import { ReactNode } from 'react'
import classNames from 'classnames'

export interface IModalProps {
	open: boolean
	children: ReactNode
	className?: string
}

const Modal = (props: IModalProps) => {
	const { open, children, className } = props

	return (
		<div id='popup' className={classNames(className, { active: open })}>
			{children}
		</div>
	)
}

export default Modal
