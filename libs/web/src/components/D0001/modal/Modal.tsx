import classNames from 'classnames'
import { ReactNode } from 'react'

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
