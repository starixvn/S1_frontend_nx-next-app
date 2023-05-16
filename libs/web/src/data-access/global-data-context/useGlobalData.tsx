import { useContext } from 'react'
import { GlobalDataContext } from './GlobalDataContext'

const useGlobalData = () => {
	return useContext(GlobalDataContext)
}

export { useGlobalData }
