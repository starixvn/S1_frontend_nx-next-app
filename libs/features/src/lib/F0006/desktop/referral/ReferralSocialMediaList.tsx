import { useTranslation } from 'next-i18next'
import { onWindowOpen } from '@nx-next-app/utils'
import { Img } from '@nx-next-app/components/D0006'
import { useReferral } from '@nx-next-app/features/F0006/providers'

const ReferralSocialMediaList = () => {
	const { t } = useTranslation()
	const { referralInfoList } = useReferral()

	return (
		<div className='referinfo-list'>
			<div className='subtitle'>
				{t('Label_Referral_ShareAcrossSocialMedia')}
			</div>
			<div className='referinfo-share'>
				{referralInfoList.map(item => (
					<Img
						key={item.img}
						onClick={() => onWindowOpen(item.url)}
						src={item.img}
						hoverImg={item.hoverImg}
						alt='img'
					/>
				))}
			</div>
		</div>
	)
}

export default ReferralSocialMediaList
