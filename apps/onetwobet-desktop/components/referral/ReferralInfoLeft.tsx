import { Img } from '@12b-desktop/components/common'
import { useGlobalData } from '@nx-next-app/data-access'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const ReferralInfoLeft = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='referinfo-left'>
			<div className='title'>{t('Label_Referral_Simple3StepsToShare')}</div>
			<div className='referinfo-step'>
				<div className='icon'>
					<Img
						src={getBannerUrl('/desktop/img/referral-step-01.png')}
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
						src={getBannerUrl('/desktop/img/referral-step-02.png')}
						alt='img-referral-step-02'
					/>
				</div>
				<div>
					<div className='subtitle'>
						{toUpper(t('Label_General_Recharge') || '')}
					</div>
					<p>{toUpper(t('Label_Referral_Recharge') || '')}</p>
				</div>
			</div>
			<div className='referinfo-step'>
				<div className='icon'>
					<Img
						src={getBannerUrl('/desktop/img/referral-step-03.png')}
						alt='img-referral-step-03'
					/>
				</div>
				<div>
					<div className='subtitle'>{t('Label_General_Rewards')}</div>
					<p>{t('Label_Referral_RewardsDescription')}</p>
				</div>
			</div>
		</div>
	)
}

export default ReferralInfoLeft
