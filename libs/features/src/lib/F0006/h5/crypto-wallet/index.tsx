import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useCryptoWallet } from '@nx-next-app/features/F0006/providers'
import { Header } from '@nx-next-app/components/H0006'
import { WalletList } from './WalletList'

const CryptoWallet = () => {
	const { t } = useTranslation()

	const {
		userInfo: { accountName },
	} = useAuth()

	const {
		USDTDetail,
		handleAddWallet,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useCryptoWallet()

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
						{
							href: paths.bankInfo.root,
							label: t('Label_General_BankInfo'),
							isShow: bankCardAllowed,
						},
						{
							href: paths.eWallet.root,
							label: t('Label_General_EWallet'),
							isShow: eWalletCardAllowed,
						},
						{
							href: paths.cryptoWallet.root,
							label: t('Label_General_CryptoWallet'),
							isShow: cryptoCardAllowed,
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
