import { IGlobalModalProps } from '@nx-next-app/components/config-provider'
import classNames from 'classnames'
import { isArray } from 'lodash-es'
import { useTranslation } from 'next-i18next'

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
			break
	}

	return (
		<div
			id='popup'
			className={classNames(className, { active: open })}
			// 為隱藏頁面層的 scroll to top 鈕 (z-index: 4)
			style={{ zIndex: 15 }}
		>
			{type === 'default' ? (
				content
			) : (
				<div className='pop'>
					<div className='popTit'>
						<div className='icon icon-close' onClick={closeModal} />
						{mergedTitle}
					</div>
					<div className='popTxt'>
						<div>
							{isArray(content)
								? content.map(val => <div key={val}>{val}</div>)
								: content}
						</div>

						<div className='btn-group'>
							{footer || (
								<>
									<button
										type='button'
										className='primary'
										onClick={() => {
											closeModal()
											onOK && onOK()
										}}
									>
										{mergeOkText}
									</button>
									{type === 'confirm' && (
										<button
											className='ghost'
											type='button'
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
		</div>
	)
}

export default GlobalModal
