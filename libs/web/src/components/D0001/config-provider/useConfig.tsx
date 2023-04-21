import { useContext } from 'react'
import { ConfigContext, ConfigContextInterface } from './context'

const useConfig = (): ConfigContextInterface => {
	return useContext(ConfigContext)
}

export { useConfig }
