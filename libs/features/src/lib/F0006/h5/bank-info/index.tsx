import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { Header } from '@nx-next-app/components/H0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useBankInfo } from '@nx-next-app/features/F0006/providers'
import { AddCard } from './AddCard'
import { CardList } from './CardList'

const BankInfo = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const { isShowCards } = useBankInfo()

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
				{isShowCards ? <CardList /> : <AddCard />}
			</main>
		</>
	)
}

export default BankInfo
