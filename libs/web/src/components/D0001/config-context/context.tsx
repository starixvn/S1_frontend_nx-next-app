import { createContext, ReactNode, useState } from 'react'
import { GlobalModalType, IGlobalModalProps, ModalMessageType } from '../modal'
import { LangData } from './type'

export interface ConfigContextInterface {
	globalModal: GlobalModalType
	modal: {
		open: (
			message: ModalMessageType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
		info: (
			message: ModalMessageType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
		error: (
			message: ModalMessageType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
	}
	resetModal: () => void
	langData: LangData
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ConfigContext = createContext<ConfigContextInterface>(null!)

export const ConfigProvider = ({
	children,
	langData,
}: {
	children: ReactNode
	langData: LangData
}) => {
	const [globalModal, setGlobalModal] = useState<GlobalModalType>({
		type: null,
		title: null,
		message: undefined,
		icon: null,
		onOK: () => null,
	})

	const resetModal = () => {
		setGlobalModal({
			type: null,
			title: null,
			message: undefined,
			icon: null,
			onOK: () => null,
		})
	}

	const value: ConfigContextInterface = {
		globalModal,
		modal: {
			open: (message, config) =>
				setGlobalModal({ type: 'default', message, ...config }),
			info: (message, config) =>
				setGlobalModal({ type: 'info', message, ...config }),
			error: (message, config) =>
				setGlobalModal({ type: 'error', message, ...config }),
		},
		resetModal,
		langData,
	}

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	)
}
