import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import { isArray } from 'lodash-es'
import Modal from './Modal'

const GlobalModal = ({
	title,
	type,
	content = null,
	onOK,
	closeModal,
}: IGlobalModalProps) => {
	const open = !!type

	// let mergedIcon
	let mergedTitle

	switch (type) {
		case 'info':
			mergedTitle = title || 'Information'

			break

		case 'error':
			mergedTitle = title || 'Error'
			break

		default:
			mergedTitle = title || null
	}

	return (
		<Modal open={open}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='pop'>
					<div className='popTit'>
						<div className='icon icon-close' onClick={closeModal} />
						{mergedTitle}
					</div>
					<div className='popTxt'>
						<div>
							{!isArray(content) && content}

							{isArray(content) && content.map(val => <div>{val}</div>)}
						</div>

						<div className='btn-group'>
							<button
								type='button'
								className='white'
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
