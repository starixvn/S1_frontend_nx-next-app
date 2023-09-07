import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { StepBar } from './StepBar'
import { CardList } from './CardList'
import { AddCardPanel } from './addCardPanel'

const BankInfo = () => {
	const { t } = useTranslation()

	const {
		userInfo: { accountName },
	} = useAuth()

	const [tip, setTip] = useState<boolean>(false)

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_bank-account'>
						{t('Label_General_BankInfo')}
					</span>
					<div>{t('Label_BankInfo_UpdateBankInfo')}</div>
				</div>
				<StepBar />
				{accountName && (
					<div className='accountName'>
						{t('Label_BankInfo_BankAccountName')}
						<span>{accountName}</span>
						<button
							className='icon icon-error'
							onClick={() => setTip(prev => !prev)}
						/>
						<div className={classNames('tip', { active: tip })}>
							{t('Label_BankInfo_BankAccountHint')}
						</div>
					</div>
				)}
				<AddCardPanel />
			</div>
			<CardList />
		</div>
	)
}

export default BankInfo
