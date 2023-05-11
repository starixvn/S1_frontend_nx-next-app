import { useContext } from 'react'
import { ConfigContext } from './context'

const useGlobalModal = () => {
	const { globalModal, modal, closeModal } = useContext(ConfigContext)
	return { globalModal, modal, closeModal }
}

export { useGlobalModal }
