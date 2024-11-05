import ReferralBanner from './ReferralBanner'
import ReferralInfo from './ReferralInfo'
import ReferralStatus from './ReferralStatus'

const Referral = () => {
	return (
		<main className='main referral '>
			<ReferralBanner />
			<div className='refer'>
				<ReferralStatus />
				<ReferralInfo />
			</div>
		</main>
	)
}

export default Referral
