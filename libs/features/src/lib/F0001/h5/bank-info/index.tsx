import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { WrapperBankInfoH5 } from '@nx-next-app/features/F0001/h5/bank-info/styles'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { AddCard } from './AddCard'
import { CardList } from './CardList'

const BankInfo = () => {
	const { t } = useTranslation()
	const {
		isShowCards,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useBankInfo()

	return (
		<WrapperBankInfoH5>
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
		</WrapperBankInfoH5>
	)
}

export default BankInfo
