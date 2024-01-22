import ReferralBanner from './ReferralBanner'
import ReferralInfo from './ReferralInfo'
import ReferralStatus from './ReferralStatus'

const Referral = () => {
	return (
		<main className='main referral '>
			<ReferralBanner />

			<div className='refer'>
				<ReferralInfo />
				<ReferralStatus />
			</div>
		</main>
	)
}

export default Referral
