import Modal from './Modal'

export interface IGlobalModalProps {
	icon?: string | null
	type: 'info' | null
	message: string
	resetModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'resetModal'>

const GlobalModal = ({
	icon,
	type,
	message = '',
	resetModal,
}: IGlobalModalProps) => {
	const open = !!type

	let mergedIcon: React.ReactNode = <div className={icon || ''} />

	if (!icon && icon !== null) {
		switch (type) {
			case 'info':
				mergedIcon = <div className='icon icon-bell' />
				break

			// case 'success':
			// 	mergedIcon = <div className='icon icon-bell' />
			// 	break

			// case 'error':
			// 	mergedIcon = <div className='icon icon-bell' />
			// 	break

			default:
				mergedIcon = null
		}
	}

	return (
		<Modal open={open} onCancel={resetModal}>
			<div className='Success active'>
				{mergedIcon}

				<div className='title'>info</div>
				<div>{message}</div>
				<div className='btnGroup'>
					<button type='button' className='btn-check' onClick={resetModal}>
						OK
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default GlobalModal
