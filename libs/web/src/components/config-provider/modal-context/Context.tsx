import { createContext, ReactNode, useState } from 'react'

export type ModalContentType =
	| string
	| (string | number)[]
	| undefined
	| null
	| React.ReactElement

export interface IGlobalModalProps {
	icon?: string | null
	title?: string | null
	type?: 'default' | 'info' | 'error' | null
	content: ModalContentType
	onOK?: () => void
	closeModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'closeModal'>

export interface ModalContextInterface {
	globalModal: GlobalModalType
	modal: {
		open: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
		info: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
		error: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK'>
		) => void
	}
	closeModal: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ModalContext = createContext<ModalContextInterface>(null!)

const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [globalModal, setGlobalModal] = useState<GlobalModalType>({
		type: null,
		title: null,
		content: undefined,
		icon: null,
		onOK: () => null,
	})

	const closeModal = () => {
		setGlobalModal({
			type: null,
			title: null,
			content: undefined,
			icon: null,
			onOK: () => null,
		})
	}

	const value: ModalContextInterface = {
		globalModal,
		modal: {
			open: (content, config) =>
				setGlobalModal({ type: 'default', content, ...config }),
			info: (content, config) =>
				setGlobalModal({ type: 'info', content, ...config }),
			error: (content, config) =>
				setGlobalModal({ type: 'error', content, ...config }),
		},
		closeModal,
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
