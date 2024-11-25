import { Loading } from '@nx-next-app/components/D0001'
import { WrapperReferal } from '@nx-next-app/features/F0001/desktop/referral/styles'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import ReferralBanner from './ReferralBanner'
import ReferralInfoLeft from './ReferralInfoLeft'
import ReferralInfoRight from './ReferralInfoRight'
import ReferralStatus from './ReferralStatus'

const Referral = () => {
	const { loading } = useReferral()

	if (loading) return <Loading />

	return (
		<div className='rightModule'>
			<WrapperReferal>
				<div className='infoModule refer'>
					<ReferralBanner />
					<ReferralStatus />

					<div className='referinfo'>
						<ReferralInfoLeft />
						<ReferralInfoRight />
					</div>
				</div>
			</WrapperReferal>
		</div>
	)
}

export default Referral
