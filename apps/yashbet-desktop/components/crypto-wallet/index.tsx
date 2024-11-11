import { Loading } from '@nx-next-app/components/D0006'
import { useAuth } from '@nx-next-app/data-access'
import { useCryptoWallet } from '@nx-next-app/features/F0006/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { AddWallet } from './AddWallet'
import { WalletList } from './WalletList'

const CryptoWallet = () => {
	const { t } = useTranslation()

	const {
		userInfo: { accountName },
	} = useAuth()

	const [tip, setTip] = useState<boolean>(false)

	const { loading } = useCryptoWallet()

	if (loading) return <Loading />

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon icon-USDT'>
						{t('Label_General_CryptoWallet')}
					</span>
					<div>{t('Label_CryptoWallet_UpdateCryptoWallet')}</div>
				</div>
				{accountName && (
					<div className='accountName'>
						{t('Label_General_AccountName')}
						<span>{accountName}</span>
						<button
							className='icon icon-error'
							onClick={() => setTip(prev => !prev)}
						/>
						<div className={classNames('tip', { active: tip })}>
							{t('Label_General_BankAccountHint')}
						</div>
					</div>
				)}
				<AddWallet />
				<WalletList />
			</div>
		</div>
	)
}
export default CryptoWallet
