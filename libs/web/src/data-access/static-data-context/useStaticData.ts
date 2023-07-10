import { useContext } from 'react'
import { StaticDataContext } from './StaticDataContext'

const useStaticData = () => useContext(StaticDataContext)

export { useStaticData }
