import { Img } from '@12b-h5/components/common'
import { useGlobalData } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/operations'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import { useCopyToClipboard } from 'usehooks-ts'
import ReferralSocialMediaList from './ReferralSocialMediaList'

const ReferralInfo = () => {
	const { t } = useTranslation()
	const [, copy] = useCopyToClipboard()
	const { getBannerUrl } = useGlobalData()
	const { referralCode, referralLink } = useReferral()

	return (
		<div className='referinfo'>
			<div className='referinfo-up'>
				<div className='title'>{t('Label_Referral_Simple3StepsToShare')}</div>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img
							src={getBannerUrl('/h5/img/referral-step-01.png')}
							alt='img-referral-step-01'
						/>
					</div>
					<div>
						<div className='subtitle'>{t('Label_General_Share')}</div>
						<p>{toUpper(t('Label_Referral_ShareDescription') || '')}</p>
					</div>
				</div>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img
							src={getBannerUrl('/h5/img/referral-step-02.png')}
							alt='img-referral-step-02'
						/>
					</div>
					<div>
						<div className='subtitle'>{t('Label_General_Recharge')}</div>
						<p>{t('Label_Referral_Recharge')}</p>
					</div>
				</div>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img
							src={getBannerUrl('/h5/img/referral-step-03.png')}
							alt='img-referral-step-03'
						/>
					</div>
					<div>
						<div className='subtitle'>
							{toUpper(t('Label_General_Rewards') || '')}
						</div>
						<p>{toUpper(t('Label_Referral_RewardsDescription') || '')}</p>
					</div>
				</div>
			</div>
			<div className='referinfo-down'>
				<div className='title'>
					<div>{toUpper(t('Label_Referral_YourLinkInvite') || '')}</div>
				</div>
				<div className='referinfo-list'>
					<div className='subtitle'>
						{toUpper(t('Label_Referral_ReferralCode') || '')}
					</div>
					<div
						className='inputcopy'
						onClick={() => referralCode && copy(referralCode)}
					>
						<input id='ref_code' type='text' value={referralCode} />
					</div>
				</div>
				<div className='referinfo-list'>
					<div className='subtitle'>
						{toUpper(t('Label_Referral_ReferralLink') || '')}
					</div>
					<div className='inputcopy' onClick={() => copy(referralLink)}>
						<input type='text' id='ref_link' value={referralLink} />
					</div>
				</div>
				<div className='referinfo-list'>
					<div className='subtitle'>QR CODE</div>
					<QRCode value={referralLink} />
				</div>

				<ReferralSocialMediaList />
			</div>
		</div>
	)
}

export default ReferralInfo
