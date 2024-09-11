import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTransferFunds } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const AutoTransfer = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const [tip, setTip] = useState<boolean>(false)

	const { isAutoTransfer, handleAutoTransferStatus } = useTransferFunds() || {}

	const handleConfirm = () => {
		modal.confirm(t('Label_TransferFunds_AutoTransferHint'), {
			onOK: () => handleAutoTransferStatus(handleConfirm, handleError),
		})
	}

	const handleError = (message: string) => {
		modal.error(message)
	}

	const handleClick = () => {
		handleAutoTransferStatus(handleConfirm, handleError)
	}

	return (
		<div className='rememberMode'>
			<div className='swithModule'>
				{t('Label_TransferFunds_MainWalletAutoTransfer')}
				<button
					type='button'
					className={classNames('switchBtn', { active: isAutoTransfer })}
					onClick={handleClick}
				>
					<span>ON</span>
					<span>OFF</span>
					<div className={classNames({ active: isAutoTransfer })} />
				</button>
			</div>
			<button
				type='button'
				className='icon icon-information'
				onClick={() => setTip(!tip)}
			/>
			<div className={classNames('inputInfo', { active: tip })}>
				<span>{t('Label_TransferFunds_Caution')}!</span>
				{t('Label_TransferFunds_AutoTransferHint')}
			</div>
		</div>
	)
}

export { AutoTransfer }
