import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useCryptoWallet } from '@nx-next-app/features/F0006/providers'
import { Header } from '@nx-next-app/components/H0001'
import { WalletList } from './WalletList'

const CryptoWallet = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const {
		userInfo: { currencyId, accountName },
	} = useAuth()

	const { USDTDetail, handleAddWallet } = useCryptoWallet()

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{
							href: paths.wallet.root,
							label: t('Label_General_MyWallet'),
						},
						{
							href: paths.bankInfo.root,
							label: t('Label_General_BankInfo'),
							subPaths: [
								paths.bankInfo.root,
								paths.eWallet.root,
								paths.cryptoWallet.root,
							],
						},
					]}
				/>
				<Header.Tags
					tags={[
						{ href: paths.bankInfo.root, label: t('Label_General_BankInfo') },
						{
							href: paths.eWallet.root,
							label: t('Label_General_EWallet'),
							isShow: includes(
								ALLOWED_CURRENCIES['E_WALLET'] as CurrenciesEnum[],
								currencyId
							),
						},
						{
							href: paths.cryptoWallet.root,
							label: t('Label_General_CryptoWallet'),
						},
					]}
					className='tag'
				/>
			</Header>
			<main className='main Wallet'>
				<div className='icon icon-member' />
				{accountName && <div className='name'>{accountName}</div>}
				<div className='text-center text-gray'>
					{t('Label_CryptoWallet_CryptoWalletSubmitNote')}
				</div>
				{USDTDetail.length !== 3 && (
					<div className='btn-group'>
						<button
							className='icon icon-plus'
							type='button'
							onClick={handleAddWallet}
						>
							{t('Label_CryptoWallet_AddCryptoWallet')}
						</button>
					</div>
				)}
				<WalletList />
			</main>
		</>
	)
}

export default CryptoWallet
