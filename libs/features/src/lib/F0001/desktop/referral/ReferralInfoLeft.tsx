import { Img } from '@nx-next-app/components/D0001'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const referralStep01Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/referral-step-01.webp`
const referralStep02Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/referral-step-02.webp`
const referralStep03Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/referral-step-03.webp`

const ReferralInfoLeft = () => {
	const { t } = useTranslation()

	return (
		<div className='referinfo-items referinfo-left'>
			<div className='title'>{t('Label_Referral_Simple3StepsToShare')}</div>
			<div className='referinfo-body'>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img src={referralStep01Img} alt='img-referral-step-01' />
					</div>
					<div className='content'>
						<div className='subtitle'>{t('Label_General_Share')}</div>
						<p>{toUpper(t('Label_Referral_ShareDescription') || '')}</p>
					</div>
				</div>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img src={referralStep02Img} alt='img-referral-step-02' />
					</div>
					<div className='content'>
						<div className='subtitle'>
							{toUpper(t('Label_General_Recharge') || '')}
						</div>
						<p>{toUpper(t('Label_Referral_Recharge') || '')}</p>
					</div>
				</div>
				<div className='referinfo-step'>
					<div className='icon'>
						<Img src={referralStep03Img} alt='img-referral-step-03' />
					</div>
					<div className='content'>
						<div className='subtitle'>{t('Label_General_Rewards')}</div>
						<p>{t('Label_Referral_RewardsDescription')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralInfoLeft
