import { Loading } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useCheckUserInfo, useCryptoWallet } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { AddWallet } from './AddWallet'
import { WalletList } from './WalletList'

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const CryptoWallet = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { checkUserInfo } = useCheckUserInfo()

	const {
		userInfo: { accountName },
	} = useAuth()

	const [tip, setTip] = useState<boolean>(false)

	const { loading } = useCryptoWallet()

	useEffect(() => {
		checkUserInfo({
			onInfoRequired: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
	}, [])

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
