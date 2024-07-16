import React from 'react'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const ExtraRewardAndTerms = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()

	return (
		<>
			<div className='title'>{t('Label_EuropeCup_Win_Euro_Matches')} </div>
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
							{t(`Label_EuropeCup_Min_Payout_Value_${currencyId}`)}
						</div>
					</div>
					<div className='euro-extra-reward-item'>
						<div className='subtitle'>{t('Label_EuropeCup_Max_Bonus')}</div>
						<div className='reward'>
							{t(`Label_EuropeCup_Max_Bonus_Value_${currencyId}`)}
						</div>
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
						<div>{t('Label_EuropeCup_Bet_And_Get_Extra_Rewards')}</div>
						<div>{t('Label_EuropeCup_Payout_After_Euro_Ends')}</div>
					</div>
					{includes(ALLOWED_CURRENCIES.VIP, currencyId) && (
						<div className='euro-extra-reward-rule-item'>
							<div>
								<div className='subtitle'>
									{t('Label_EuropeCup_Exclusive_VIP_Privileges')}
								</div>
							</div>
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
					)}
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
					<li> {t('Label_EuropeCup_Terms_13')}</li>
				</ul>
			</div>
			<div className='euro-footer'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/bottom-item.png`}
					alt='eurocup-bottom'
				/>
			</div>
		</>
	)
}

export default ExtraRewardAndTerms
