import { Img } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import { useCopyToClipboard } from 'usehooks-ts'
import ReferralSocialMediaList from './ReferralSocialMediaList'

const referralStep01Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/referral-step-01.webp`
const referralStep02Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/referral-step-02.webp`
const referralStep03Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/referral-step-03.webp`

const ReferralInfo = () => {
	const { t } = useTranslation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()
	const { referralCode } = useReferral()

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	const referralLink = `${origin}${paths.join.root}?AffId=${referralCode}`

	return (
		<div className='referinfo'>
			<div className='referinfo-up'>
				<div className='custom-box'>
					<div className='custom-box-title'>
						{t('Label_Referral_Simple3StepsToShare')}
					</div>
					<div className='custom-box-body'>
						<div className='referinfo-step'>
							<div className='icon'>
								<Img src={referralStep01Img} alt='img-referral-step-01' />
							</div>
							<div className='referinfo-step-body'>
								<div className='subtitle'>{t('Label_General_Share')}</div>
								<p>{t('Label_Referral_ShareDescription') || ''}</p>
							</div>
						</div>
						<div className='referinfo-step'>
							<div className='icon'>
								<Img src={referralStep02Img} alt='img-referral-step-02' />
							</div>
							<div className='referinfo-step-body'>
								<div className='subtitle'>{t('Label_General_Recharge')}</div>
								<p>{t('Label_Referral_Recharge')}</p>
							</div>
						</div>
						<div className='referinfo-step'>
							<div className='icon'>
								<Img src={referralStep03Img} alt='img-referral-step-03' />
							</div>
							<div className='referinfo-step-body'>
								<div className='subtitle'>
									{toUpper(t('Label_General_Rewards') || '')}
								</div>
								<p>{t('Label_Referral_RewardsDescription') || ''}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='referinfo-down'>
				<div className='custom-box'>
					<div className='custom-box-title'>
						<div>{toUpper(t('Label_Referral_YourLinkInvite') || '')}</div>
					</div>
					<div className='custom-box-body'>
						<div className='referinfo-list'>
							<div className='subtitle'>
								{toUpper(t('Label_Referral_ReferralCode') || '')}
							</div>
							<div
								className='inputcopy inputBox-blue'
								onClick={() => referralCode && copy(referralCode)}
							>
								<input id='ref_code' type='text' value={referralCode} />
								<i
									className='icon  icon-file-copy-line'
									onClick={() => referralCode && copy(referralCode)}
								/>
							</div>
						</div>
						<div className='referinfo-list'>
							<div className='subtitle'>
								{toUpper(t('Label_Referral_ReferralLink') || '')}
							</div>
							<div
								className='inputcopy inputBox-blue'
								onClick={() => copy(referralLink)}
							>
								<input type='text' id='ref_link' value={referralLink} />
								<i
									className='icon  icon-file-copy-line'
									onClick={() => copy(referralLink)}
								/>
							</div>
						</div>
						<div className='referinfo-list'>
							<div className='subtitle'>QR CODE</div>
							<div className='qr-code-group'>
								<QRCode value={referralLink} />
							</div>
						</div>
						<ReferralSocialMediaList />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralInfo
