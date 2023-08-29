import { ReactNode } from 'react'
import classNames from 'classnames'

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
