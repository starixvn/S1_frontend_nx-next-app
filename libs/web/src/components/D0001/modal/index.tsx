import { FC } from 'react'
import OriginModal, { IModalProps } from './Modal'
import GlobalModal, { IGlobalModalProps, GlobalModalType } from './GlobalModal'
import useModal from './useModal'

export type IModalInterface = FC<IModalProps>
export type { ModalMessageType } from './GlobalModal'

const Modal = OriginModal as IModalInterface

export {
	Modal,
	IModalProps,
	GlobalModal,
	IGlobalModalProps,
	GlobalModalType,
	useModal,
}
