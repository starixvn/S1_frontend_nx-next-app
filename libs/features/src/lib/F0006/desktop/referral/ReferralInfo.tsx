import { useTranslation } from 'next-i18next'
import { useReferral } from '@nx-next-app/features/F0006/providers'
import { toUpper } from 'lodash-es'
import { Img } from '@nx-next-app/components/D0006'
import QRCode from 'qrcode.react'
import ReferralSocialMediaList from '@nx-next-app/features/F0006/desktop/referral/ReferralSocialMediaList'
import { useCopyToClipboard } from 'usehooks-ts'
import { paths } from '@nx-next-app/constants'

const referralStep01Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-01.svg`
const referralStep02Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-02.svg`
const referralStep03Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-03.svg`

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
		<>
			<div className='title'>{t('Label_Referral_Simple3StepsToShare')}</div>

			<div className='referinfo-left'>
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
						<p>{toUpper(t('Label_Referral_Recharge') || '')}</p>
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
						<p>{t('Label_Referral_RewardsDescription')}</p>
					</div>
				</div>
			</div>

			<div className='referinfo-right'>
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
		</>
	)
}

export default ReferralInfo
