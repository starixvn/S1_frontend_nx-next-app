import { useTransferFunds } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const AutoTransfer = () => {
	const { t } = useTranslation()

	const [tip, setTip] = useState<boolean>(false)

	const { isAutoTransfer, handleAutoTransferStatus } = useTransferFunds()

	return (
		<div className='rememberMode'>
			<div className='swithModule'>
				{t('Label_TransferFunds_MainWalletAutoTransfer')}
				<button
					type='button'
					className={classNames('switchBtn', { active: isAutoTransfer })}
					onClick={handleAutoTransferStatus}
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
