import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import { isArray } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Modal from './Modal'

const GlobalModal = ({
	title,
	type,
	content = null,
	okText,
	onOK,
	onCancel,
	closeModal,
	className,
}: IGlobalModalProps) => {
	const { t } = useTranslation()
	const open = !!type

	// let mergedIcon
	let mergedTitle
	let mergeOkText = okText || t('Label_General_Yes')

	switch (type) {
		case 'info':
			mergedTitle = title || 'Information'
			mergeOkText = okText || t('Label_General_OK')

			break

		case 'error':
			mergedTitle = title || 'Error'
			break

		case 'confirm':
			mergedTitle = title || t('label_Message_ImportantNote')
			mergeOkText = okText || t('Label_General_Yes')

			break

		default:
			mergedTitle = title || null
	}

	return (
		<Modal open={open} className={className}>
			{type === 'default' && content}

			{type !== 'default' && (
				<div className='pop'>
					<div className='popTit'>
						<div className='icon icon-close' onClick={closeModal} />
						{mergedTitle}
					</div>
					<div className='popTxt'>
						<div>
							{!isArray(content) && content}

							{isArray(content) && content.map(val => <div>{val}</div>)}
						</div>

						<div className='btn-group'>
							<button
								type='button'
								className='white'
								onClick={() => {
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
									{t('Label_General_No')}
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
