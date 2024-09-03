import { useTransferFunds } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const AutoTransfer = () => {
	const { t } = useTranslation()

	const { isAutoTransfer, handleAutoTransferStatus } = useTransferFunds()

	return (
		<div className='swithModule'>
			{t('Label_TransferFunds_MainWalletAutoTransfer')}
			<button
				type='button'
				onClick={handleAutoTransferStatus}
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
