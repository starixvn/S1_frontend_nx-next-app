import { ReactNode, useRef } from 'react'
import classNames from 'classnames'

export interface IModalProps {
	open: boolean
	children: ReactNode
}

const Modal = (props: IModalProps) => {
	const ref = useRef(null)
	const { open, children } = props

	return (
		<div id='popup' className={classNames({ active: open })}>
			<div ref={ref} className='pop'>
				{children}
			</div>
		</div>
	)
}

export default Modal
