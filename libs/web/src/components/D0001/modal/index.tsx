import { FC } from 'react'
import OriginModal from './Modal'
import type { IModalProps } from './Modal'
import GlobalModal from './GlobalModal'
import type { IGlobalModalProps, GlobalModalType } from './GlobalModal'
import useModal from './useModal'

export type IModalInterface = FC<IModalProps>
export type { ModalContentType } from './GlobalModal'

const Modal = OriginModal as IModalInterface

export {
	Modal,
	IModalProps,
	GlobalModal,
	IGlobalModalProps,
	GlobalModalType,
	useModal,
}
