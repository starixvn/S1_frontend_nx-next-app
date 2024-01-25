import { Loading } from '@nx-next-app/components/D0006'
import { useReferral } from '@nx-next-app/features/F0006/providers'
import ReferralBanner from './ReferralBanner'
import ReferralStatus from './ReferralStatus'
import ReferralInfo from './ReferralInfo'

const Referral = () => {
	const { loading } = useReferral()

	if (loading) return <Loading />

	return (
		<div className='rightModule'>
			<div className='infoModule refer'>
				<ReferralBanner />

				<div className='referinfo'>
					<ReferralInfo />
				</div>

				<div className='referstatus'>
					<ReferralStatus />
				</div>
			</div>
		</div>
	)
}

export default Referral
