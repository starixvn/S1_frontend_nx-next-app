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
	title?: string | null
	type?: 'default' | 'info' | 'error' | null
	message: ModalMessageType
	onOK?: () => void
	resetModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'resetModal'>

const GlobalModal = ({
	icon,
	title,
	type,
	message = null,
	onOK,
	resetModal,
}: IGlobalModalProps) => {
	const open = !!type

	let mergedIcon
	let mergedTitle

	switch (type) {
		case 'info':
			mergedIcon = icon || 'icon icon-bell'
			mergedTitle = title || 'Information'

			break

		case 'error':
			mergedIcon = icon || 'icon icon-bell'
			mergedTitle = title || 'error'
			break

		default:
			mergedIcon = icon || ''
			mergedTitle = title || null
	}

	return (
		<Modal open={open} onCancel={resetModal}>
			<div className='Success active'>
				<div className={mergedIcon} />
				<div className='title'>{mergedTitle}</div>
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
