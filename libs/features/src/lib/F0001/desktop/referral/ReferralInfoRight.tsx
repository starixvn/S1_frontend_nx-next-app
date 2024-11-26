import { paths } from '@nx-next-app/constants'
import { useReferral } from '@nx-next-app/features/F0001/providers'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import { useCopyToClipboard } from 'usehooks-ts'
import ReferralSocialMediaList from './ReferralSocialMediaList'

const ReferralInfoRight = () => {
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
		<div className='referinfo-items referinfo-right'>
			<div className='title'>
				<div>{t('Label_Referral_YourLinkInvite')}</div>
			</div>
			<div className='referinfo-body'>
				<div className='referinfo-list'>
					<div className='subtitle'>
						{toUpper(t('Label_Referral_ReferralCode') || '')}
					</div>
					<div
						className='inputcopy inputBox-blue'
						onClick={() => referralCode && copy(referralCode)}
					>
						<input id='ref_code' type='text' value={referralCode} />
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

export default ReferralInfoRight
