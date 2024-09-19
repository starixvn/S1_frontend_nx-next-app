import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	useCryptoWallet,
	useWithdrawal,
	type IAddWalletModalArgs,
} from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const AddWalletModal = dynamic(
	() => import('../../crypto-wallet/AddWalletModal'),
	{
		ssr: false,
	}
)

const CryptoWalletSelect = () => {
	const { withdrawalType, bankData, selectedBankInfo, handleSelectCard } =
		useWithdrawal()
	const { handleAddWallet } = useCryptoWallet()
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
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
				handleSetCustCryptoWallet={handleSetCustCryptoWallet}
				cryptoNetworkList={cryptoNetworkList}
				cryptoCurrencyOptions={cryptoCurrencyOptions}
				handleGetOtpInfo={handleGetOtpInfo}
			/>
		)
	}

	const banks = (() => {
		return usdtDetail.map(item => {
			const {
				usdtAddress,
				currencyName,
				disabled,
				currencyId,
				nickName,
				network,
			} = item
			const selected =
				selectedBankInfo?.usdtAddress === usdtAddress &&
				selectedBankInfo?.currencyName === currencyName
			return (
				<div
					className={classNames('account', {
						active: selected,
						pending: disabled,
					})}
					key={`${usdtAddress}-${currencyId}`}
					onClick={() =>
						handleSelectCard({
							usdtAddress,
							nickName,
							currencyId,
							network,
							currencyName,
							type: withdrawalType,
						})
					}
				>
					<div className='nickName'>{nickName}</div>
					<div className='nickName'>
						{currencyName === network
							? currencyName
							: `${currencyName}-${network}`}
					</div>
					<div className='icon icon-USDT'>{usdtAddress}</div>
					{disabled ? <div className='mask' /> : null}
				</div>
			)
		})
	})()

	return (
		<div className='bankAccount'>
			{banks}
			{usdtDetail?.length < 3 && (
				<div
					key='add bank'
					className='account'
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
					<div className='icon icon-plus text-org' />
				</div>
			)}
		</div>
	)
}

export { CryptoWalletSelect }
