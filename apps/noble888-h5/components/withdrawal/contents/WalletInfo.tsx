import { SpinButton } from '@nx-next-app/components/H0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { numberFormat } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const WalletInfo = () => {
	const { t } = useTranslation()
	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		userInfo: { userLevel, currencyId, userName },
	} = useAuth()

	// 11/11/24 整合 將availableBalance直接從withdrawalBalance取出
	const {
		refetchWithdrawalBalance,
		withdrawalBalance: { availableBalance = 0 } = {},
		restoreAll,
	} = useWithdrawal()

	// 11/11/24 整合userLevelImageInfo避免使用?.
	const {
		url = '',
		alt = '',
		displayKey = '',
	} = VIP_CLUB_IMAGES[(userLevel as number) - 1] || {}

	return (
		<>
			{url ? (
				<div className='vip_mark'>
					<img src={url} alt={alt} />
					{includes(
						ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
						currencyId
					) && <div>{t(displayKey)}</div>}
				</div>
			) : (
				<div className='icon icon-member' />
			)}

			<div className='name'>{userName}</div>
			<div className='text-org'>
				{t('Label_Withdrawal_EligibleWithdrawalAmount')}
			</div>
			<div className='balanceModule'>
				<SpinButton
					onClick={refetchWithdrawalBalance}
					className='icon icon-spinner11 clickBtn'
				>
					<>
						{t(`Label_General_Currency_${currencyId}`)}
						{numberFormat(availableBalance, currencyId)}
					</>
				</SpinButton>
				<button className='icon icon-history clickBtn' onClick={restoreAll}>
					{t('Label_Withdrawal_RestoreAll')}
				</button>
			</div>
		</>
	)
}

export { WalletInfo }
