import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	useCryptoWallet,
	type IAddWalletModalArgs,
} from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Header from '../header'
import { WalletList } from './WalletList'

const AddWalletModal = dynamic(() => import('./AddWalletModal'), {
	ssr: false,
})

const cryptoWalletLimit = 3

const CryptoWallet = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { push } = useRouter()

	const {
		userInfo: { accountName },
	} = useAuth()

	const {
		USDTDetail,
		handleAddWallet,
		cardAllowed: { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed },
	} = useCryptoWallet()

	const onAddWalletModal = ({
		cryptoNetworkList,
		cryptoCurrencyOptions,
		handleGetOtpInfo,
		handleSetCustCryptoWallet,
	}: IAddWalletModalArgs) => {
		modal.open(
			<AddWalletModal
				cryptoNetworkList={cryptoNetworkList}
				cryptoCurrencyOptions={cryptoCurrencyOptions}
				handleGetOtpInfo={handleGetOtpInfo}
				handleSetCustCryptoWallet={handleSetCustCryptoWallet}
			/>
		)
	}

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
				{USDTDetail.length !== cryptoWalletLimit && (
					<div className='btn-group'>
						<button
							className='icon icon-plus primary '
							type='button'
							onClick={() =>
								handleAddWallet({
									phoneVerifiedCallBack: () =>
										modal.confirm(t('Label_CryptoWallet_CryptoOTP'), {
											okText: t('Label_General_UpdatePersonalDetail'),
											onOK: () => {
												push(paths.profile.root)
											},
										}),
									onAddWalletModal,
								})
							}
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
