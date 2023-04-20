import { useState } from 'react'

interface ModalState {
	open: boolean
	onOpen: () => void
	onCancel: () => void
}

const useModal = (): ModalState => {
	const [open, setOpen] = useState(false)

	const onOpen = () => setOpen(true)

	const onCancel = () => setOpen(false)

	const modal = {
		open,
		onOpen,
		onCancel,
	}

	return modal
}

export default useModal
