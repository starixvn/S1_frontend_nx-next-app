import React, { createContext, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type ModalContentType =
	| string
	| (string | number)[]
	| undefined
	| null
	| React.ReactElement

export interface IGlobalModalProps {
	icon?: string | null
	title?: string | null
	type?: 'default' | 'info' | 'error' | 'custom' | 'confirm' | null
	content: ModalContentType
	okText?: string | null
	cancelText?: string | null
	className?: string
	footer?: React.ReactElement[]
	onOK?: () => void
	onCancel?: () => void
	closeModal: () => void
}

export type GlobalModalType = Omit<IGlobalModalProps, 'closeModal'>

export interface ModalContextInterface {
	globalModal: GlobalModalType
	modal: {
		open: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK' | 'className'>
		) => void
		info: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK' | 'okText'>
		) => void
		error: (
			message: ModalContentType,
			config?: Pick<IGlobalModalProps, 'icon' | 'title' | 'onOK' | 'okText'>
		) => void
		confirm: (
			message: ModalContentType,
			config?: Pick<
				IGlobalModalProps,
				| 'icon'
				| 'title'
				| 'footer'
				| 'onOK'
				| 'onCancel'
				| 'okText'
				| 'cancelText'
			>
		) => void
	}
	closeModal: () => void
	setIsValid: (newIsValid: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ModalContext = createContext<ModalContextInterface>(null!)

const ModalProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation()
	const [globalModal, setGlobalModal] = useState<GlobalModalType>({
		type: null,
		title: null,
		content: undefined,
		icon: null,
		okText: null,
		onOK: () => null,
		onCancel: () => null,
	})

	const setIsValid = (newIsValid: boolean) => {
		setGlobalModal(prev => ({ ...prev, isValid: newIsValid }))
	}

	const closeModal = () => {
		setGlobalModal({
			type: null,
			title: null,
			content: undefined,
			icon: null,
			okText: null,
			onOK: () => null,
			onCancel: () => null,
		})
	}

	const value: ModalContextInterface = {
		globalModal,
		modal: {
			open: (content, config) =>
				setGlobalModal({ type: 'default', content, ...config }),
			info: (content, config) =>
				setGlobalModal({ type: 'info', content, ...config }),
			error: (errorMessage, modalConfig) => {
				// 非後端的錯誤訊息會在 axiosBaseQuery 替換 prefix 為 '[Client Error]'
				const isClientError =
					typeof errorMessage === 'string' &&
					errorMessage.startsWith('[Client Error]')

				// 將非後端錯誤 prefix 替換成「請求過於頻繁」
				const content = isClientError
					? errorMessage.replace(
							'[Client Error]',
							t('Label_Error_TooManyRequests')
					  )
					: errorMessage

				// 帶入預設多語系標題 Oops
				const config = {
					title: t('Label_Error_Oops'),
					...modalConfig,
				}

				setGlobalModal({ type: 'error', content, ...config })
			},
			confirm: (content, config) =>
				setGlobalModal({ type: 'confirm', content, ...config }),
		},
		closeModal,
		setIsValid,
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
