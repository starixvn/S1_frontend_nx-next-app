import classNames from 'classnames'
import { ReactNode } from 'react'

export interface IModalProps {
	open: boolean
	children: ReactNode
}

const Modal = (props: IModalProps) => {
	const { open, children } = props

	return (
		<div id='popup' className={classNames({ active: open })}>
			{children}
		</div>
	)
}

export default Modal
