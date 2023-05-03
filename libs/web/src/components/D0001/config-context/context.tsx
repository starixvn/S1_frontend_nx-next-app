import { createContext, ReactNode, useState } from 'react'
import { GlobalModalType, ModalMessageType } from '../modal'

export interface ConfigContextInterface {
	globalModal: GlobalModalType
	modal: {
		info: (message: ModalMessageType, { onOK }?: { onOK?: () => void }) => void
		error: (message: ModalMessageType) => void
	}
	resetModal: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ConfigContext = createContext<ConfigContextInterface>(null!)

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const [globalModal, setGlobalModal] = useState<GlobalModalType>({
		type: null,
		message: undefined,
		icon: null,
		onOK: () => null,
	})

	const resetModal = () => {
		setGlobalModal({ type: null, message: '' })
	}

	const value: ConfigContextInterface = {
		globalModal,
		modal: {
			info: (message, config) =>
				setGlobalModal({ type: 'info', message, onOK: config?.onOK }),
			error: message => setGlobalModal({ type: 'error', message }),
		},
		resetModal,
	}

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	)
}
