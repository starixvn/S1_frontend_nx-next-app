import { createContext, ReactNode, useState } from 'react'
import { GlobalModalType } from '../modal'

export interface ConfigContextInterface {
	globalModal: GlobalModalType
	modal: {
		info: (message: string) => void
		error: (message: string) => void
	}
	resetModal: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ConfigContext = createContext<ConfigContextInterface>(null!)

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const [globalModal, setGlobalModal] = useState<GlobalModalType>({
		type: null,
		message: '',
		icon: null,
	})

	const resetModal = () => {
		setGlobalModal({ type: null, message: '' })
	}

	const value = {
		globalModal,
		modal: {
			info: (message: string) => setGlobalModal({ type: 'info', message }),
			error: (message: string) => setGlobalModal({ type: 'error', message }),
		},
		resetModal,
	}

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	)
}
