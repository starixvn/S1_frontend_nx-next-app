import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDepositContext } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DepositPaymentEnum } from '@nx-next-app/types'
import { DepositModule } from '@nx-next-app/components/D0001'
import BankTransferForm from './BankTransferForm'
import OnlineBankingForm from './OnlineBankingForm'
import MobilePayForm from './MobilePayForm.tsx'
import CryptoPayForm from './CryptoPayForm'
import QRPayForm from './QRPayForm'
import TopUpCardForm from './TopUpCardForm'
import AutoDepositForm from './AutoDepositForm'
import DepositAutoRemember from '../DepositAutoRemember'
import QuickTransferForm from './QuickTransferForm'
import ChatTransferForm from './ChatTransferForm'

const {
	AutoDeposit,
	BankTransfer,
	OnlineBanking,
	MobilePay,
	CryptoPay,
	QRPay,
	TopUpCardPay,
	QuickTransfer,
	ChatTransfer,
} = DepositPaymentEnum

const DepositLinePayModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/modal/DepositLinePayModal'
		),
	{ ssr: false }
)
const DepositForm = () => {
	const { t } = useTranslation()
	const {
		push,
		pathname,
		query: { paymentType },
	} = useRouter()

	const { modal } = useGlobalModal()

	const { payments, DEPOSIT_PAYMENT_OPTIONS } = useDepositContext()

	return (
		<div className='subModuleListColumn'>
			<DepositModule
				title={t('Label_Deposit_DepositOptions')}
				extra={<DepositAutoRemember />}
			>
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
								label={t(labelDisplayKey || '')}
								icon={classNames(icon)}
								matchValue={key}
								key={labelDisplayKey}
								onClick={() => {
									if (key === DepositPaymentEnum.LinePay) {
										modal.open(
											<DepositLinePayModal
												link={payments[DepositPaymentEnum.LinePay]?.link}
											/>
										)
										return
									}

									if (paymentType !== key) {
										const url = {
											pathname,
											query: { paymentType: key },
										}

										push(url, undefined, { shallow: true })
									}
								}}
							>
								{/* // * 處理時間區塊 */}
								{/* // *  隱藏簡化畫面，未來有可能再打開 */}
								{/* <div>
									{t('Label_General_CreditTime')} ： {t(timeDisplayKey)}
								</div> */}
								<div />
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

			{paymentType === BankTransfer && (
				<BankTransferForm
					dataSource={payments[DepositPaymentEnum.BankTransfer] || []}
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
