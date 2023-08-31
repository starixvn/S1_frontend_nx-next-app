import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import { isArray } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Modal from './Modal'

const GlobalModal = ({
	icon,
	title,
	type,
	content = null,
	okText,
	cancelText,
	onOK,
	onCancel,
	closeModal,
}: IGlobalModalProps) => {
	const { t } = useTranslation()
	const open = !!type

	let mergedIcon
	let mergedTitle
	let mergeOkText
	let mergeCancelText

	switch (type) {
		case 'info':
			mergedIcon = icon || 'icon icon-bell'
			mergedTitle = title || t('Label_General_Information')
			mergeOkText = okText || t('Label_General_OK')

			break

		case 'error':
			mergedIcon = icon || 'icon icon-bell'
			mergedTitle = title || 'error'
			mergeOkText = okText || t('Label_General_Close')

			break

		case 'confirm':
			mergedIcon = icon || 'icon icon-bell'
			mergedTitle = title || t('Label_General_Oh')
			mergeOkText = okText || t('Label_General_Yes')
			mergeCancelText = cancelText || t('Label_General_No')

			break

		default:
			mergedIcon = icon || ''
			mergedTitle = title || null
			mergeOkText = okText || t('Label_General_OK')
			mergeCancelText = cancelText || t('Label_General_No')
	}

	return (
		<Modal open={open}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='pop'>
					<div className='Success active'>
						<div className={mergedIcon} />
						<div className='title'>{mergedTitle}</div>
						<div>
							{!isArray(content) && content}

							{isArray(content) && content.map(val => <div>{val}</div>)}
						</div>

						<div className='btnGroup'>
							<button
								type='button'
								className='btn-check'
								onClick={() => {
									closeModal()
									onOK && onOK()
								}}
							>
								{mergeOkText}
							</button>
							{type === 'confirm' && (
								<button
									className='btn-cancel'
									onClick={() => {
										closeModal()
										onCancel && onCancel()
									}}
								>
									{mergeCancelText}
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</Modal>
	)
}

export default GlobalModal
