import { Img } from '@12b-indo-desktop/components/common'
import ReferralDetailModal from '@12b-indo-desktop/components/modal/ReferralDetailModal'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/operations'
import { IReferralSettingDetailData } from '@nx-next-app/service'

const ReferralBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()
	const { modal } = useGlobalModal()

	const { onGetReferralDetail } = useReferral()
	const referralDetailModalCallback = (
		referralSettingDetail: IReferralSettingDetailData
	) => {
		modal.open(
			<ReferralDetailModal referralSettingDetail={referralSettingDetail} />
		)
	}
	const errorCallback = (errMsg: string) => {
		modal.error(errMsg)
	}

	return (
		<Img
			onClick={() =>
				onGetReferralDetail(referralDetailModalCallback, errorCallback)
			}
			src={getBannerUrl(`/desktop/img/referral-topBanner-${langId}.jpg`)}
			alt='img-referral-topBanner'
			className='refer-topbanner'
		/>
	)
}

export default ReferralBanner
