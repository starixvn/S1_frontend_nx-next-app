import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import { isArray } from 'lodash-es'
import Modal from './Modal'

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
		<Modal open={open}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='pop'>
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
				</div>
			)}
		</Modal>
	)
}

export default GlobalModal
