import { useContext } from 'react'
import { ConfigContext } from './context'

const useGlobalModal = () => {
	const { globalModal, modal, resetModal } = useContext(ConfigContext)
	return { globalModal, modal, resetModal }
}

export { useGlobalModal }
