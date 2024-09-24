import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useBankInfo, useCheckUserInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Header from '../header'
import { AddCard } from './AddCard'
import { CardList } from './CardList'

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const BankInfo = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { checkUserInfo } = useCheckUserInfo()
	const {
		isShowCards,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useBankInfo()

	useEffect(() => {
		checkUserInfo({
			onSuccessCallback: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
	}, [])

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
