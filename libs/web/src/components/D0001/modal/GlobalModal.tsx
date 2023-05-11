import { isArray } from 'lodash'

import Modal from './Modal'

export type ModalContentType =
	| string
	| (string | number)[]
	| undefined
	| null
	| React.ReactElement

export interface IGlobalModalProps {
	icon?: string | null
	title?: string | null
	type?: 'default' | 'info' | 'error' | null
	content: ModalContentType
	onOK?: () => void
	closeModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'closeModal'>

const GlobalModal = ({
	icon,
	title,
	type,
	content = null,
	onOK,
	closeModal,
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
		<Modal open={open} onCancel={closeModal}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='Success active'>
					<div className={mergedIcon} />
					<div className='title'>{mergedTitle}</div>
					<div>
						{!isArray(content) && content}

						{isArray(content) && content.map(val => <div>{val}</div>)}
					</div>

					<div className='btnGroup'>
						<button
							type='button'
							className='btn-check'
							onClick={() => {
								closeModal()
								onOK && onOK()
							}}
						>
							OK
						</button>
					</div>
				</div>
			)}
		</Modal>
	)
}

export default GlobalModal
