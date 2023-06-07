export * from './config-context'

export * from './button'

export { default as Header } from './header'
export type { IFunctionInterface } from './header/Function'
export type { LoginFormType } from './header/Function/Login'

export { default as Footer } from './footer'

export { InputBox } from './input'
export type { IInputBoxInterface } from './input'

export { default as Form } from './form'

export { Modal, GlobalModal, useModal } from './modal'
export type { IModalProps, IGlobalModalProps, GlobalModalType } from './modal'

export * from './back-top'

export { default as Select } from './select'
export type { ISelectProps } from './select'
export type { SelectOptionType } from './select/type'

export { default as Carousel } from './carousel'
export type { ICarouselProps } from './carousel'

// export type { sw } from './swiper'

export { default as MetaData } from './metaData'

export { default as Loading } from './loading'
