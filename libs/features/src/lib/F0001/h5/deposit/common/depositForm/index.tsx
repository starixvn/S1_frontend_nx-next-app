import { DepositModule } from '@nx-next-app/components/H0001'
import { useAuth, useDepositContext } from '@nx-next-app/data-access'
import { CurrenciesEnum, DepositPaymentEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import AutoDepositForm from './AutoDepositForm'
import BankTransferForm from './BankTransferForm'
import ChatTransferForm from './ChatTransferForm'
import CryptoPayForm from './CryptoPayForm'
import DigitalWalletForm from './DigitalWalletForm'
import LinePayForm from './LinePayForm'
import MobilePayForm from './MobilePayForm'
import OnlineBankingForm from './OnlineBankingForm'
import QRPayForm from './QRPayForm'
import QuickTransferForm from './QuickTransferForm'
import TopUpCardForm from './TopUpCardForm'

const {
	AutoDeposit,
	BankTransfer,
	OnlineBanking,
	MobilePay,
	CryptoPay,
	LinePay,
	QRPay,
	TopUpCardPay,
	QuickTransfer,
	ChatTransfer,
	DigitalWallet,
} = DepositPaymentEnum

const DepositForm = () => {
	const { t } = useTranslation()
	const {
		push,
		pathname,
		query: { paymentType },
	} = useRouter()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const { payments, DEPOSIT_PAYMENT_OPTIONS } = useDepositContext()

	return (
		<div className='depositModule active'>
			<DepositModule title={t('Label_Deposit_DepositOptions')} required>
				<DepositModule.SubModuleButtonGroup matchKey='paymentType'>
					{Object.keys(payments).map(key => {
						const paymentOption =
							DEPOSIT_PAYMENT_OPTIONS[key as DepositPaymentEnum]

						if (!paymentOption) return null

						const {
							icon,
							labelDisplayKey,
							// timeDisplayKey
						} = paymentOption

						// 10/17新增，VND 的時候 quickTransfer 顯示為 bankTransfer
						const finalDisplayLabelKey =
							currencyId === CurrenciesEnum.VND &&
							key === DepositPaymentEnum.QuickTransfer
								? 'Label_Deposit_BankTransfer'
								: labelDisplayKey

						return (
							<DepositModule.SubModuleButton
								label={t(finalDisplayLabelKey)}
								icon={classNames(icon)}
								matchValue={key}
								key={finalDisplayLabelKey}
								onClick={() => {
									if (paymentType !== key) {
										const url = {
											pathname,
											query: { paymentType: key },
										}

										push(url, undefined, { shallow: true })
									}
								}}
							>
								{/*
								// * 處理時間區塊
								// * 隱藏簡化畫面，未來有可能再打開
								*/}
								<div />
								{/* <div>
									{t('Label_General_CreditTime')} ： {t(timeDisplayKey)}
								</div> */}
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{paymentType === AutoDeposit && (
				<AutoDepositForm
					dataSource={payments[DepositPaymentEnum.AutoDeposit] || []}
				/>
			)}

			{paymentType === LinePay &&
				payments[DepositPaymentEnum.LinePay]?.link && (
					<LinePayForm
						redirectLink={payments[DepositPaymentEnum.LinePay]?.link}
					/>
				)}

			{paymentType === OnlineBanking && (
				<OnlineBankingForm
					dataSource={payments[DepositPaymentEnum.OnlineBanking] || []}
				/>
			)}

			{paymentType === MobilePay && (
				<MobilePayForm
					dataSource={payments[DepositPaymentEnum.MobilePay] || []}
				/>
			)}

			{paymentType === CryptoPay && (
				<CryptoPayForm
					dataSource={payments[DepositPaymentEnum.CryptoPay] || []}
				/>
			)}

			{paymentType === BankTransfer && (
				<BankTransferForm
					dataSource={payments[DepositPaymentEnum.BankTransfer] || []}
				/>
			)}

			{paymentType === QRPay && (
				<QRPayForm dataSource={payments[DepositPaymentEnum.QRPay] || []} />
			)}

			{paymentType === TopUpCardPay && (
				<TopUpCardForm
					dataSource={payments[DepositPaymentEnum.TopUpCardPay] || []}
				/>
			)}

			{paymentType === QuickTransfer && (
				<QuickTransferForm
					dataSource={payments[DepositPaymentEnum.QuickTransfer] || []}
				/>
			)}

			{paymentType === ChatTransfer && (
				<ChatTransferForm
					dataSource={payments[DepositPaymentEnum.ChatTransfer] || []}
				/>
			)}

			{paymentType === DigitalWallet && (
				<DigitalWalletForm
					dataSource={payments[DepositPaymentEnum.DigitalWallet] || []}
				/>
			)}
		</div>
	)
}

export default DepositForm
