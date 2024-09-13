import { Loading } from '@nx-next-app/components/D0001'
import { useReferral } from '@nx-next-app/operations'
import ReferralBanner from './ReferralBanner'
import ReferralInfoLeft from './ReferralInfoLeft'
import ReferralInfoRight from './ReferralInfoRight'
import ReferralStatus from './ReferralStatus'

const Referral = () => {
	const { isLoading } = useReferral()

	if (isLoading) return <Loading />

	return (
		<div className='rightModule'>
			<div className='infoModule refer'>
				<ReferralBanner />
				<ReferralStatus />
				<div className='referinfo'>
					<ReferralInfoLeft />
					<ReferralInfoRight />
				</div>
			</div>
		</div>
	)
}

export default Referral
