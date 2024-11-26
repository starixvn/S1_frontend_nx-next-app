import { Loading } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperCrypto } from '@nx-next-app/features/F0001/desktop/crypto-wallet/styles'
import { WrapperCardAddBank } from '@nx-next-app/features/F0001/desktop/withdrawal/common/walletPanel/styles'
import { useCryptoWallet } from '@nx-next-app/features/F0001/providers'
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
			<WrapperCrypto>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-crypto-wallet' />
							{t('Label_General_CryptoWallet')}
						</div>
					</div>
					<div className='inside-body'>
						{accountName && (
							<div className='accountName'>
								<div className='heading-crypto'>
									{t('Label_CryptoWallet_UpdateCryptoWallet')}
								</div>
								<div className='inputBox-blue'>
									<div className='group-name'>
										<i className='icon icon-empty-wallet' />
										{t('Label_General_AccountName')}
									</div>
									<div className='group-button'>
										<span>{accountName}</span>
										<button
											className='icon icon-information-fill'
											onClick={() => setTip(prev => !prev)}
										/>
									</div>
								</div>
								<div className={classNames('tip', { active: tip })}>
									{t('Label_General_BankAccountHint')}
								</div>
							</div>
						)}
						<div className='group-wallet'>
							<WrapperCardAddBank>
								<AddWallet />
							</WrapperCardAddBank>
						</div>
						<WalletList />
					</div>
				</div>
			</WrapperCrypto>
		</div>
	)
}
export default CryptoWallet
