import { Loading } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperBankInFo } from '@nx-next-app/features/F0001/desktop/bank-info/styles'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { CardList } from './CardList'
import { StepBar } from './StepBar'
import { AddCardPanel } from './addCardPanel'

const BankInfo = () => {
	const { t } = useTranslation()

	const {
		userInfo: { accountName },
	} = useAuth()

	const { loading } = useBankInfo()

	const [tip, setTip] = useState<boolean>(false)

	if (loading) return <Loading />
	return (
		<div className='rightModule'>
			<WrapperBankInFo>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-card-pos' />
							{t('Label_General_BankInfo')}
						</div>
					</div>
					<div className='inside-body'>
						<div className='txt-blue'>{t('Label_BankInfo_UpdateBankInfo')}</div>
						<StepBar />
						{accountName && (
							<>
								<div className='inputBox-blue accountName'>
									<div className='txt-blue'>
										<i className='icon icon-empty-wallet' />
										{t('Label_BankInfo_BankAccountName')}
									</div>
									<div className='group-name'>
										<div className='name'>{accountName}</div>
										<button
											className='icon icon-information-fill'
											onClick={() => setTip(prev => !prev)}
										/>
									</div>
								</div>
								<div className={classNames('tip', { active: tip })}>
									{t('Label_BankInfo_BankAccountHint')}
								</div>
							</>
						)}
						<AddCardPanel />
						<CardList />
					</div>
				</div>
			</WrapperBankInFo>
		</div>
	)
}

export default BankInfo
