import { useContext } from 'react'
import { IStaticDataContext, StaticDataContext } from './StaticDataContext'

const useStaticData = (): IStaticDataContext => useContext(StaticDataContext)

export { useStaticData }
