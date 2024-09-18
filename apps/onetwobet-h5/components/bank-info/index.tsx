import { paths } from '@nx-next-app/constants'
import { useBankInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Header from '../common/header'
import { AddCard } from './AddCard'
import { CardList } from './CardList'

const BankInfo = () => {
	const { t } = useTranslation()
	const {
		isShowCards,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useBankInfo()

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.wallet.root, label: t('Label_General_MyWallet') },
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
				{isShowCards ? <CardList /> : <AddCard />}
			</main>
		</>
	)
}

export default BankInfo
