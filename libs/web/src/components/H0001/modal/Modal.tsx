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
		<div
			id='popup'
			className={classNames(className, { active: open })}
			// 為隱藏頁面層的 scroll to top 鈕 (z-index: 15)
			style={{ zIndex: 15 }}
		>
			{children}
		</div>
	)
}

export default Modal
