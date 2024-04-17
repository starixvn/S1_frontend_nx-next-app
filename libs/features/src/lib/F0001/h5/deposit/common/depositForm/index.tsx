import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDepositContext } from '@nx-next-app/data-access'
import { DepositPaymentEnum } from '@nx-next-app/types'
import { DepositModule } from '@nx-next-app/components/H0001'
import BankTransferForm from './BankTransferForm'
import OnlineBankingForm from './OnlineBankingForm'
import MobilePayForm from './MobilePayForm'
import CryptoPayForm from './CryptoPayForm'
import QRPayForm from './QRPayForm'
import TopUpCardForm from './TopUpCardForm'
import QuickTransferForm from './QuickTransferForm'
import ChatTransferForm from './ChatTransferForm'
import AutoDepositForm from './AutoDepositForm'
import LinePayForm from './LinePayForm'

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
} = DepositPaymentEnum

const DepositForm = () => {
	const { t } = useTranslation()
	const {
		push,
		pathname,
		query: { paymentType },
	} = useRouter()

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

						return (
							<DepositModule.SubModuleButton
								label={t(labelDisplayKey)}
								icon={classNames(icon)}
								matchValue={key}
								key={labelDisplayKey}
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
		</div>
	)
}

export default DepositForm
