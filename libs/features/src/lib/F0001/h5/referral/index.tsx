import { WrapperReferFrendsH5 } from '@nx-next-app/features/F0001/h5/referral/styles'
import ReferralBanner from './ReferralBanner'
import ReferralInfo from './ReferralInfo'
import ReferralStatus from './ReferralStatus'

const Referral = () => {
	return (
		<WrapperReferFrendsH5>
			<main className='main referral '>
				<ReferralBanner />

				<div className='refer'>
					<ReferralStatus />
					<ReferralInfo />
				</div>
			</main>
		</WrapperReferFrendsH5>
	)
}

export default Referral
