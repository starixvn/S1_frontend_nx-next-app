import { Img } from '@nx-next-app/components/D0001'
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
			<div className='icon-gift'>
				<i className='icon icon-gift-fill' />
			</div>
			<div className='promotionsInfo'>
				<div
					className='icon icon-close-line'
					style={{ cursor: 'pointer' }}
					onClick={closeModal}
				/>

				{/* // * 確保資料不是 null 才顯示元件 */}
				{!isNull(referralContent?.bannerUrl) && (
					<Img src={referralContent?.bannerUrl} alt='banner' />
				)}

				<div className='proData'>
					<div className='proDataTitle'>
						<div className='txt-darkBlue'>
							{referralContent?.title}
							<div className='txt-gray'>{referralContent?.description}</div>
						</div>
					</div>

					{/* 暫時關閉 */}

					{/* <div className='rolloverList'> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_ReferralReward')}</div> */}
					{/* 		<div>{referralReward}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_FriendsInvitationLimit')}</div> */}
					{/* 		<div>{invitationLimit}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_DepositRequirement')}</div> */}
					{/* 		<div>{agentDeposit}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_ValidBetRequirement')}</div> */}
					{/* 		<div>{agentValidBet}</div> */}
					{/* 	</div> */}
					{/* </div> */}
					{/* <div className='rolloverList'> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_ReferredFreeCredit')}</div> */}
					{/* 		<div>{memberReward}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_DepositRequirement')}</div> */}
					{/* 		<div>{deposit}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_ValidBetRequirement')}</div> */}
					{/* 		<div>{vaildBet}</div> */}
					{/* 	</div> */}
					{/* 	<div> */}
					{/* 		<div>{t('Label_Referral_TermPeriodWithin')}</div> */}
					{/* 		<div> */}
					{/* 			{periodDays} {t('Label_General_Days')} */}
					{/* 		</div> */}
					{/* 	</div> */}
					{/* </div> */}

					{/* // * 確保資料不是 null 才顯示元件 */}
					{!!referralContent?.detail && (
						<div
							className='proDataBody'
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: referralContent?.detail,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ReferralDetailModal
