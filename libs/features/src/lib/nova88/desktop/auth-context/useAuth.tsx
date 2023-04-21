import { useContext } from 'react'
import { AuthContext, AuthContextInterface } from './AuthContext'

const useAuth = (): AuthContextInterface => {
	return useContext(AuthContext)
}

export { useAuth }
