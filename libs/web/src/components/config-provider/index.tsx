import { ReactNode } from 'react'
import { ModalProvider } from './modal-context'

export * from './modal-context'

const UIProvider = ({ children }: { children: ReactNode }) => {
	return <ModalProvider>{children}</ModalProvider>
}

export { UIProvider }
