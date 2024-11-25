import { Img } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/features/F0001/providers'

const ReferralBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()

	const { onGetReferralDetail } = useReferral()

	// * 跟著 langId 的 banner 圖片
	const topBannerImg = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/referral-topBanner-${langId}.webp`

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
