import Link from 'next/link'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { useReferral } from '@nx-next-app/features/F0006/providers'

const ReferralStatus = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()

	const { referralSummaryData } = useReferral()

	return (
		<>
			<div className='title'>
				{t('Label_Referral_YourReferralStatus')?.toUpperCase()}

				<Link
					href={{ pathname: paths.history.root, query: { queryTabId: 4 } }}
					passHref
				>
					<a className='refer-history' rel='noopener noreferrer'>
						{t('Label_General_History')}
					</a>
				</Link>
			</div>
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
		</>
	)
}

export default ReferralStatus
