import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { Header } from '@nx-next-app/components/H0001'
import { useEWallet } from '@nx-next-app/features/F0001/providers'
import { AddWallet } from './AddWallet'
import { WalletList } from './WalletList'

const EWallet = () => {
	const { t } = useTranslation()

	const {
		isShowCards,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useEWallet()
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
				{isShowCards ? <WalletList /> : <AddWallet />}
			</main>
		</>
	)
}

export default EWallet
