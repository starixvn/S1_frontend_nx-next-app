import { createContext, ReactNode, useState } from 'react'
import { GlobalModalType, IGlobalModalProps, ModalContentType } from '../modal'
import { IVipClubImage, LangData } from './type'

export interface ConfigContextInterface {
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
	langData?: LangData
	VIP_CLUB_IMAGES: IVipClubImage[]
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ConfigContext = createContext<ConfigContextInterface>(null!)

export const ConfigProvider = ({
	children,
	langData,
	VIP_CLUB_IMAGES = [],
}: {
	children: ReactNode
	langData?: LangData
	VIP_CLUB_IMAGES?: IVipClubImage[]
}) => {
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

	const value: ConfigContextInterface = {
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

		langData,
		VIP_CLUB_IMAGES,
	}

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	)
}
