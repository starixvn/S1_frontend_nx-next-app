import { useContext } from 'react'
import { ConfigContext } from './context'

const useConfig = () => {
	const { langData } = useContext(ConfigContext)
	return { langData }
}

export { useConfig }
