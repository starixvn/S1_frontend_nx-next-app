import QRCode from 'qrcode.react'
import { Img } from '@nx-next-app/components/H0006'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useReferral } from '@nx-next-app/features/F0006/providers'
import { useCopyToClipboard } from 'usehooks-ts'
import ReferralSocialMediaList from './ReferralSocialMediaList'

const referralStep01Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/referral-step-01.svg`
const referralStep02Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/referral-step-02.svg`
const referralStep03Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/referral-step-03.svg`

const ReferralInfo = () => {
	const { t } = useTranslation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()
	const { referralCode } = useReferral()

	const referralLink = `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/join?AffId=${referralCode}`

	return (
		<div className='referinfo'>
			<div className='title'>
				<div>{toUpper(t('Label_Referral_YourLinkInvite') || '')}</div>
			</div>
			<div className='referinfo-up'>
				<div className='referinfo-step'>
					<div className='number'>
						<span>1</span>
					</div>
					<div className='icon'>
						<Img src={referralStep01Img} alt='img-referral-step-01' />
					</div>
					<div>
						<div className='subtitle'>
							{toUpper(t('Label_General_Share') || '')}
						</div>
						<p>{toUpper(t('Label_Referral_ShareDescription') || '')}</p>
					</div>
				</div>

				<div className='referinfo-step'>
					<div className='number'>
						<span>2</span>
					</div>
					<div className='icon'>
						<Img src={referralStep02Img} alt='img-referral-step-02' />
					</div>
					<div>
						<div className='subtitle'>
							{toUpper(t('Label_General_Recharge') || '')}
						</div>
						<p>{t('Label_Referral_Recharge')}</p>
					</div>
				</div>

				<div className='referinfo-step'>
					<div className='number'>
						<span>3</span>
					</div>
					<div className='icon'>
						<Img src={referralStep03Img} alt='img-referral-step-03' />
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
