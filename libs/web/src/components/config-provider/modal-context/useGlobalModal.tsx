import { useContext } from 'react'
import { ModalContext } from './Context'

const useGlobalModal = () => {
	const { globalModal, modal, closeModal } = useContext(ModalContext)
	return { globalModal, modal, closeModal }
}

export { useGlobalModal }
