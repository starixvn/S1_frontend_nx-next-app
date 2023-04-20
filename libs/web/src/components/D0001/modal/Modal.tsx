import { ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'

export interface IModalProps {
	open: boolean
	children: ReactNode
	onCancel?: () => void
}

const Modal = (props: IModalProps) => {
	const ref = useRef(null)
	const { open, children, onCancel } = props

	const handleClickOutside = () => {
		open && onCancel && onCancel()
	}

	useOnClickOutside(ref, handleClickOutside)

	return (
		<div id='popup' className={classNames({ active: open })}>
			<div ref={ref} className='pop'>
				{children}
			</div>
		</div>
	)
}

export default Modal
