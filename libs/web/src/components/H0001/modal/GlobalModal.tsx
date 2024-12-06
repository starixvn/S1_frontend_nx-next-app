import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import { isArray } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Modal from './Modal'

const GlobalModal = ({
	title,
	type,
	content = null,
	okText,
	cancelText,
	className,
	footer,
	onOK,
	onCancel,
	closeModal,
}: IGlobalModalProps) => {
	const { t } = useTranslation()
	const open = !!type

	// let mergedIcon
	let mergedTitle
	let mergeOkText = okText || t('Label_General_Yes')
	let mergeCancelText

	switch (type) {
		case 'info':
			mergedTitle = title || t('Label_General_Information')
			mergeOkText = okText || t('Label_General_OK')

			break

		case 'error':
			mergedTitle = title || 'Error'
			mergeOkText = okText || t('Label_General_Close')
			break

		case 'confirm':
			mergedTitle = title || t('Label_General_ImportantNote')
			mergeOkText = okText || t('Label_General_Yes')
			mergeCancelText = cancelText || t('Label_General_No')

			break

		default:
			mergedTitle = title || null
	}

	return (
		<Modal open={open} className={className}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='pop'>
					<div className='icon icon-notifi icon-alert-fill' />
					<div className='title'>
						<div
							className='close-popup icon icon-close-line'
							onClick={closeModal}
						/>
						{mergedTitle}
					</div>
					<div className='popTxt'>
						<div>
							{!isArray(content) && content}

							{isArray(content) && content.map(val => <div>{val}</div>)}
						</div>

						<div className='btnGroup'>
							{footer}

							{!footer && (
								<>
									<button
										type='button'
										className='btn-primary'
										onClick={() => {
											closeModal()
											onOK && onOK()
										}}
									>
										{mergeOkText}
									</button>
									{type === 'confirm' && (
										<button
											className='btn-secondary'
											onClick={() => {
												closeModal()
												onCancel && onCancel()
											}}
										>
											{mergeCancelText}
										</button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</Modal>
	)
}

export default GlobalModal
