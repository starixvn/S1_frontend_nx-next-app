import { Img } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { IReferralSettingDetailData } from '@nx-next-app/service'
import { isNull } from 'lodash-es'

interface IReferralDetailModalProps {
	referralSettingDetail: IReferralSettingDetailData
}

const ReferralDetailModal = ({
	referralSettingDetail,
}: IReferralDetailModalProps) => {
	const { closeModal } = useGlobalModal()
	const { referralContent } = referralSettingDetail ?? {}

	return (
		<div className='promoInfoPop active'>
			<div className='promoInfoPopMask active' />

			<div className='promotionsInfo'>
				<div className='icon icon-close' onClick={closeModal} />

				{/* 確保資料不是 null 才顯示元件 */}
				{!isNull(referralContent?.bannerUrl) && (
					<Img src={referralContent.bannerUrl} alt='banner' />
				)}

				<div className='proData'>
					<div className='proDataTitle'>
						<div className='txt-darkBlue'>
							{referralContent?.title}
							<div className='txt-gray'>{referralContent?.description}</div>
						</div>
					</div>

					{/* 確保資料不是 null 才顯示元件 */}
					{!!referralContent?.detail && (
						<div
							className='proDataBody'
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: referralContent.detail,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ReferralDetailModal
