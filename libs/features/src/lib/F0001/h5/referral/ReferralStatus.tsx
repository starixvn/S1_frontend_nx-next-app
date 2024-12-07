import { useAuth } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import { numberFormat } from '@nx-next-app/utils'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const ReferralStatus = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()
	const { referralSummaryData } = useReferral()

	return (
		<div className='referstatus'>
			<div className='custom-box'>
				<div className='custom-box-title'>
					{t('Label_Referral_YourReferralStatus')}
				</div>
				<div className='referstatus-item custom-box-body'>
					<div className='card'>
						<div className='card-title'>
							{toUpper(t('Label_Referral_NoOfAchievements') || '')}
						</div>
						<div className='card-body'>
							{referralSummaryData?.referralCount || 0}
						</div>
					</div>
					<div className='card'>
						<div className='card-title'>
							{toUpper(t('Label_Referral_AccumulateRewardAmount') || '')}
						</div>
						<div className='card-body'>
							<span>{currencyName}</span>
							{numberFormat(referralSummaryData?.amountSum || 0, currencyId, 2)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralStatus
