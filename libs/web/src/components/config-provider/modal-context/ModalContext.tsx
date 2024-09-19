import React, { createContext, ReactNode, useContext, useState } from 'react'
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
	type?: 'default' | 'info' | 'error' | 'confirm' | null
	content: ModalContentType
	okText?: string | null
	cancelText?: string | null
	className?: string
	footer?: React.ReactElement[]
	onOK?: () => void
	onCancel?: () => void
	closeModal: () => void
}

type GlobalModalType = Omit<IGlobalModalProps, 'closeModal'>

interface IModalContextInterface {
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
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ModalContext = createContext<IModalContextInterface>(null!)

export const useGlobalModal = () => {
	return useContext(ModalContext)
}

// TODO: 之後處理 Nova88 拆分 UI 跟邏輯時再搬到 Operations
export const ModalProvider = ({ children }: { children: ReactNode }) => {
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

	const value: IModalContextInterface = {
		globalModal,
		modal: {
			open: (content, config) =>
				setGlobalModal({ type: 'default', content, ...config }),
			info: (content, config) =>
				setGlobalModal({ type: 'info', content, ...config }),
			error: (errorMessage, config) => {
				// 非後端的錯誤訊息會在 axiosBaseQuery 替換 prefix 為 '[Client Error]'
				const isClientError =
					typeof errorMessage === 'string' &&
					errorMessage.startsWith('[Client Error]')

				// 將非後端錯誤的 prefix 或空的錯誤訊息替換成「請求過於頻繁」
				const content = isClientError
					? errorMessage.replace(
							'[Client Error]',
							t('Label_Error_TooManyRequests')
					  )
					: errorMessage || t('Label_Error_TooManyRequests')

				// 帶入預設多語系標題 Oops
				setGlobalModal({
					type: 'error',
					title: t('Label_Error_Oops'),
					content,
					...config,
				})
			},
			confirm: (content, config) =>
				setGlobalModal({ type: 'confirm', content, ...config }),
		},
		closeModal,
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
