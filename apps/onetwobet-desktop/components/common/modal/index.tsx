import { FC } from 'react'
import GlobalModal from './GlobalModal'
import type { IModalProps } from './Modal'
import OriginModal from './Modal'

import useModal from './useModal'

export type IModalInterface = FC<IModalProps>

const Modal = OriginModal as IModalInterface

export { GlobalModal, IModalProps, Modal, useModal }
