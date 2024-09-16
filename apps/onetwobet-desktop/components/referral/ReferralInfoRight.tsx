import { useReferral } from '@nx-next-app/operations'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import { useCopyToClipboard } from 'usehooks-ts'
import ReferralSocialMediaList from './ReferralSocialMediaList'

const ReferralInfoRight = () => {
	const { t } = useTranslation()
	const [, copy] = useCopyToClipboard()
	const { referralCode, referralLink } = useReferral()

	return (
		<div className='referinfo-right'>
			<div className='title'>
				<div>{t('Label_Referral_YourLinkInvite')}</div>
			</div>
			<div className='referinfo-list'>
				<div className='subtitle'>
					{toUpper(t('Label_Referral_ReferralCode') || '')}
				</div>
				<div
					className='inputcopy'
					onClick={() => referralCode && copy(referralCode)}
				>
					<input id='ref_code' type='text' value={referralCode} readOnly />
				</div>
			</div>
			<div className='referinfo-list'>
				<div className='subtitle'>
					{toUpper(t('Label_Referral_ReferralLink') || '')}
				</div>
				<div className='inputcopy' onClick={() => copy(referralLink)}>
					<input type='text' id='ref_link' value={referralLink} readOnly />
				</div>
			</div>
			<div className='referinfo-list'>
				<div className='subtitle'>QR CODE</div>
				<QRCode value={referralLink} />
			</div>

			<ReferralSocialMediaList />
		</div>
	)
}

export default ReferralInfoRight
