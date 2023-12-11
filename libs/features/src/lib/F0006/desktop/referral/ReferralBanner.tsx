import { useAuth } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/features/F0006/providers'
import { Img } from '@nx-next-app/components/D0006'

const ReferralBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()

	const { onGetReferralDetail } = useReferral()

	// * 跟著 langId 的 banner 圖片
	const topBannerImg = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-topBanner-${langId}.jpg`

	return (
		<Img
			onClick={onGetReferralDetail}
			src={topBannerImg}
			alt='img-referral-topBanner'
			className='refer-topbanner'
		/>
	)
}

export default ReferralBanner
