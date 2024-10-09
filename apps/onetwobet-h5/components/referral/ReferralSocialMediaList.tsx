import { Img } from '@12b-h5/components/common'
import { useGlobalData } from '@nx-next-app/data-access'
import { useReferral } from '@nx-next-app/operations'
import { REFERRAL_SOCIAL_MEDIA } from '@nx-next-app/site/onetwobet'
import { onWindowOpen } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const ReferralSocialMediaList = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { referralLink } = useReferral()
	const referralSocialMediaList = REFERRAL_SOCIAL_MEDIA(
		referralLink,
		t('Label_Referral_Welcome')
	)

	return (
		<div className='referinfo-list'>
			<div className='subtitle'>
				{t('Label_Referral_ShareAcrossSocialMedia')}
			</div>
			<div className='referinfo-share'>
				{referralSocialMediaList.map(({ name, h5Img, url }) => (
					<Img
						key={name}
						onClick={() => onWindowOpen(url)}
						src={getBannerUrl(h5Img)}
						alt={name}
					/>
				))}
			</div>
		</div>
	)
}

export default ReferralSocialMediaList
