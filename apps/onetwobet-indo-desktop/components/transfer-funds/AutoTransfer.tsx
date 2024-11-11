import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTransferFunds } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const AutoTransfer = () => {
	const { t } = useTranslation()
	const { isAutoTransfer, handleAutoTransferStatus } = useTransferFunds()
	const { modal } = useGlobalModal()

	const handleConfirm = () => {
		modal.confirm(t('Label_TransferFunds_AutoTransferHint'), {
			onOK: () => handleAutoTransferStatus(handleConfirm, handleError),
		})
	}

	const handleError = (message: string) => {
		modal.error(message) // 顯示錯誤信息
	}

	const handleClick = () => {
		handleAutoTransferStatus(handleConfirm, handleError)
	}

	return (
		<div className='swithModule'>
			{t('Label_TransferFunds_MainWalletAutoTransfer')}
			<button
				type='button'
				onClick={handleClick}
				className={classNames('switchBtn', { active: isAutoTransfer })}
			>
				<span>ON</span>
				<span>OFF</span>
				<div className={classNames({ active: isAutoTransfer })} />
			</button>
			<button className='icon icon-information' />
			<div className='inputInfo transfer'>
				<span>{t('Label_TransferFunds_Caution')}!</span>
				{t('Label_TransferFunds_AutoTransferHint')}
			</div>
		</div>
	)
}

export { AutoTransfer }
