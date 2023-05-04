import { ReactNode } from 'react'
import { isArray } from 'lodash'

import Modal from './Modal'

export type ModalMessageType =
	| string
	| (string | number)[]
	| undefined
	| null
	| React.ReactElement

export interface IGlobalModalProps {
	icon?: string | null
	type: 'info' | 'error' | null
	message: ModalMessageType
	onOK?: () => void
	resetModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'resetModal'>

const GlobalModal = ({
	icon,
	type,
	message = null,
	onOK,
	resetModal,
}: IGlobalModalProps) => {
	const open = !!type

	let mergedIcon: ReactNode = <div className={icon || ''} />
	let title = ''

	if (!icon && icon !== null) {
		switch (type) {
			case 'info':
				mergedIcon = <div className='icon icon-bell' />
				title = 'info'
				break

			// case 'success':
			// 	mergedIcon = <div className='icon icon-bell' />
			// 	break

			case 'error':
				mergedIcon = <div className='icon icon-bell' />
				title = 'error'
				break

			default:
				mergedIcon = null
		}
	}

	return (
		<Modal open={open} onCancel={resetModal}>
			<div className='Success active'>
				{mergedIcon}
				<div className='title'>{title}</div>
				<div>
					{!isArray(message) && message}

					{isArray(message) && message.map(val => <div>{val}</div>)}
				</div>

				<div className='btnGroup'>
					<button
						type='button'
						className='btn-check'
						onClick={() => {
							resetModal()
							onOK && onOK()
						}}
					>
						OK
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default GlobalModal
