import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import { numberFormat } from '@nx-next-app/utils'
import { toUpper } from 'lodash-es'

const ReferralStatus = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()
	const { referralSummaryData } = useReferral()

	return (
		<div className='referstatus'>
			<div className='title'>{t('Label_Referral_YourReferralStatus')}</div>
			<div className='referstatus-item'>
				<div className='card'>
					{toUpper(t('Label_Referral_NoOfAchievements') || '')}
					<div>{referralSummaryData?.referralCount || 0}</div>
				</div>
				<div className='card'>
					{toUpper(t('Label_Referral_AccumulateRewardAmount') || '')}
					<div>
						<span>{currencyName}</span>
						{numberFormat(referralSummaryData?.amountSum || 0, currencyId)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralStatus
