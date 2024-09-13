import { Img } from '@nx-next-app/components/D0001'
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
				{referralSocialMediaList.map(({ name, desktopImg, hoverImg, url }) => (
					<Img
						key={name}
						onClick={() => onWindowOpen(url)}
						src={getBannerUrl(desktopImg)}
						hoverImg={getBannerUrl(hoverImg)}
						alt={name}
					/>
				))}
			</div>
		</div>
	)
}

export default ReferralSocialMediaList
