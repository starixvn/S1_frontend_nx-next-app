import { useContext } from 'react'
import { ConfigContext } from './context'

const useConfig = () => {
	const { langData, VIP_CLUB_IMAGES } = useContext(ConfigContext)
	return { langData, VIP_CLUB_IMAGES }
}

export { useConfig }
