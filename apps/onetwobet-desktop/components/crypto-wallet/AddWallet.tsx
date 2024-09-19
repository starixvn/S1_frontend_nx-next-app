import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	useCryptoWallet,
	type IAddWalletModalArgs,
} from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const cryptoWalletLimit = 3

const AddWalletModal = dynamic(() => import('./AddWalletModal'), {
	ssr: false,
})

const AddWallet = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { push } = useRouter()

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

	const { USDTDetail, handleAddWallet } = useCryptoWallet()

	return (
		<div className='walletModule'>
			<div className='addBank'>
				{USDTDetail.length === cryptoWalletLimit ? (
					<div className='addBankName noBank'>
						<div className='icon icon-warning' />
						<div>{t('Label_Wallet_Is_Full')}</div>
					</div>
				) : (
					<div
						className='addBankName noBank '
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
						<div className='icon icon-plus' />
						<div>{t('Label_CryptoWallet_AddCryptoWallet')}</div>
					</div>
				)}
				<div className='remainder'>
					{t('Label_CryptoWallet_NumberOfWallet')}:{USDTDetail.length}/3
				</div>
				<div className='tip active'>
					{t('Label_CryptoWallet_CryptoWalletSubmitNote')}
				</div>
			</div>
		</div>
	)
}

export { AddWallet }
