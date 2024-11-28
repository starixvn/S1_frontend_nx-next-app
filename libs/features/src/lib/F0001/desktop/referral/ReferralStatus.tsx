import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import { numberFormat } from '@nx-next-app/utils'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const ReferralStatus = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()

	const { referralSummaryData } = useReferral()

	return (
		<div className='referstatus'>
			<div className='title'>
				<span>{t('Label_Referral_YourReferralStatus')}</span>
				<div className='btnGroup'>
					<Link
						href={{
							pathname: paths.history.root,
							query: { queryTabId: 4 },
						}}
					>
						<a
							className='refer-history btn-secondary'
							rel='noopener noreferrer'
						>
							<i className='icon icon-chat-history-fill' />
							{t('Label_General_History')}
						</a>
					</Link>
				</div>
			</div>
			<div className='referstatus-item'>
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
						<span style={{ marginRight: '.5rem' }}>{currencyName}</span>
						{numberFormat(referralSummaryData?.amountSum || 0, currencyId, 2)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralStatus
