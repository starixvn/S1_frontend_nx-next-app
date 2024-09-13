import ReferralDetailModal from '@12b-h5/components/modal/ReferralDetailModal'
import { Img } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/operations'
import { IReferralSettingDetailData } from '@nx-next-app/service'

const ReferralBanner = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	const { onGetReferralDetail } = useReferral()

	const referralDetailModalCallback = (
		referralSettingDetail: IReferralSettingDetailData
	) => {
		modal.open(
			<ReferralDetailModal referralSettingDetail={referralSettingDetail} />,
			{
				className: 'promospop',
			}
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
			src={getBannerUrl(`/h5/img/referral-topBanner-H5-${langId}.jpg`)}
			alt='img-referral-topBanner'
			className='referral-topbanner'
		/>
	)
}

export default ReferralBanner
