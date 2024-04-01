import React from 'react'
import { useTranslation } from 'next-i18next'

const ExtraRewardAndTerms = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='title'>
				{t('Label_EuropeCup_Win_Euro_Matches')}{' '}
				<span>{t('Label_EuropeCup_Payout_After_Euro_Ends')}</span>
			</div>
			<div className='euro-extra-reward'>
				<div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Bonus')}</div>
						<div className='reward'>{t('Label_EuropeCup_Bonus_Value')}</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Bet_Type')}</div>
						<div className='reward'>{t('Label_EuropeCup_Bet_Type_Value')}</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Min_Payout')}</div>
						<div className='reward'>
							{t('Label_EuropeCup_Min_Payout_Value')}
						</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Max_Bonus')}</div>
						<div className='reward'>{t('Label_EuropeCup_Max_Bonus_Value')}</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Product')}</div>
						<div className='reward'>{t('Label_EuropeCup_Product_Value')}</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Rollover')}</div>
						<div className='reward'>{t('Label_EuropeCup_Rollover_Value')}</div>
					</div>
				</div>
				<div className='euro-extra-reward-rule'>
					<div className='euro-extra-reward-rule-item'>
						{t('Label_EuropeCup_Exclusive_VIP_Privileges')}
					</div>
					<div className='euro-extra-reward-rule-item'>
						<div>
							<div>{t('Label_EuropeCup_Vintage_Silver_Club')}</div>
							<span>{t('Label_EuropeCup_Vintage_Silver_Club_Value')}</span>
						</div>
						<div>
							<div>{t('Label_EuropeCup_Gold_Titanium_Club')}</div>
							<span>{t('Label_EuropeCup_Gold_Titanium_Club_Value')}</span>
						</div>
						<div>
							<div>{t('Label_EuropeCup_Diamond_Nova_Club')}</div>
							<span>{t('Label_EuropeCup_Diamond_Nova_Club_Value')}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='title'>{t('Label_EuropeCup_Terms_And_Conditions')}</div>
			<div className='euro-tnc'>
				<ul>
					<li>{t('Label_EuropeCup_Terms_1')}</li>
					<li>{t('Label_EuropeCup_Terms_2')}</li>
					<li>{t('Label_EuropeCup_Terms_3')}</li>
					<li>{t('Label_EuropeCup_Terms_4')}</li>
					<li>{t('Label_EuropeCup_Terms_5')}</li>
					<li>{t('Label_EuropeCup_Terms_6')}</li>
					<li>{t('Label_EuropeCup_Terms_7')}</li>
					<li>{t('Label_EuropeCup_Terms_8')}</li>
					<li>{t('Label_EuropeCup_Terms_9')}</li>
					<li>{t('Label_EuropeCup_Terms_10')}</li>
					<li>{t('Label_EuropeCup_Terms_11')}</li>
					<li>{t('Label_EuropeCup_Terms_12')}</li>
					<li>{t('Label_EuropeCup_Terms_13')}</li>
				</ul>
			</div>
			<div className='euro-footer'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/eurocup/bottom-item.png`}
					alt='eurocup-bottom-item'
				/>
			</div>
		</>
	)
}

export default ExtraRewardAndTerms
