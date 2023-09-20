import { Img } from '@nx-next-app/components/D0001'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const referralStep01Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-01.png`
const referralStep02Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-02.png`
const referralStep03Img = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/referral-step-03.png`

const ReferralInfoLeft = () => {
	const { t } = useTranslation()

	return (
		<div className='referinfo-left'>
			<div className='title'>{t('Label_Referral_Simple3StepsToShare')}</div>
			<div className='referinfo-step'>
				<div className='icon'>
					<Img src={referralStep01Img} alt='img-referral-step-01' />
				</div>
				<div>
					<div className='subtitle'>{t('Label_General_Share')}</div>
					<p>{toUpper(t('Label_Referral_ShareDescription') || '')}</p>
				</div>
			</div>
			<div className='referinfo-step'>
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
				<div className='icon'>
					<Img src={referralStep03Img} alt='img-referral-step-03' />
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
