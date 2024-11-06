import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	useCryptoWallet,
	useWithdrawal,
	type IAddWalletModalArgs,
} from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CryptoCardItem } from './CryptoCardItem'

const AddWalletModal = dynamic(
	() => import('@12b-indo-desktop/components/crypto-wallet/AddWalletModal'),
	{
		ssr: false,
	}
)

// 因 Crypto 卡片元件跟其他兩種不同，故獨立寫在此區
const CryptoCard = () => {
	const { t } = useTranslation()
	const {
		bankData,
		withdrawalAllowed: { cryptoCardAllowed },
	} = useWithdrawal()
	// 與 CryptoWallet 共用
	const { handleAddWallet } = useCryptoWallet()
	const { modal } = useGlobalModal()
	const { push } = useRouter()
	const { usdtDetail } = bankData

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

	if (!cryptoCardAllowed) return null

	return (
		<div className='walletModule'>
			<div className='addBank'>
				{usdtDetail.map(item => (
					<CryptoCardItem key={item.usdtAddress} item={item} />
				))}
				{usdtDetail.length < 3 && (
					<div
						key='add-bank'
						className='addBankName noBank'
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
						<div>{t('Label_Withdrawal_AddCryptoWallet')}</div>
					</div>
				)}
				<div className='remainder'>
					{t('Label_Withdrawal_NumberOfWallet')}:{usdtDetail.length} / 3
				</div>
				<div className='tip active'>
					{t('Label_Withdrawal_CryptoWalletSubmitNote')}
				</div>
			</div>
		</div>
	)
}

export { CryptoCard }
