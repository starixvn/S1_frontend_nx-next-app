import { createContext } from 'react'
import { IHomeProps } from './index'

export type HomeContextInterface = IHomeProps

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<HomeContextInterface>(null!)
