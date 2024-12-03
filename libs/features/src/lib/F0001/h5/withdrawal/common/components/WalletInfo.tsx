import { SpinButton } from '@nx-next-app/components/H0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
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
	const { refetchWithdrawalBalance, withdrawalBalance, restoreAll } =
		useWithdrawal()
	const { availableBalance = 0 } = withdrawalBalance ?? {}

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]
	return (
		<>
			{userLevelImageInfo?.url ? (
				<div className={`vip_mark ${userLevelImageInfo?.levelTabsName}`}>
					<img src={userLevelImageInfo?.url} alt={userLevelImageInfo?.alt} />
					{includes(
						ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
						currencyId
					) && <div>{t(userLevelImageInfo?.displayKey as string)}</div>}
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
