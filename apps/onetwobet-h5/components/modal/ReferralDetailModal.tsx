import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { Img } from '@nx-next-app/components/D0001'
import { IReferralSettingDetailData } from '@nx-next-app/service'
import { isNull } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IReferralDetailModalProps {
	referralSettingDetail: IReferralSettingDetailData
}
const ReferralDetailModal = ({
	referralSettingDetail,
}: IReferralDetailModalProps) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const { referralContent } = referralSettingDetail ?? {}

	return (
		<div className='pop'>
			<div className='popTit'>
				{t('Label_General_Referral')} {t('Label_General_Details')}
				<div className='icon icon-close' onClick={closeModal} />
			</div>

			<div className='promotions'>
				<div className='proInfomodule'>
					{/* 確保資料不是 null 才顯示元件 */}
					{!isNull(referralContent?.bannerUrl) && (
						<Img src={referralContent.bannerUrl} alt='banner' />
					)}
					<div className='protitle'>{referralContent?.title}</div>
					<div className='text'>{referralContent?.description}</div>

					<div className='rolloverList'>
						{/* 確保資料不是 null 才顯示元件 */}
						{!!referralContent?.detail && (
							<div
								className='text'
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{
									__html: `<pre>${referralContent.detail}</pre>`,
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralDetailModal
