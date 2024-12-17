import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const Features = () => {
	const { t } = useTranslation()
	const { FEATURE_BONUS } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='features'>
			<div className='title'>
				<i className='icon icon-star' />
				{t('Label_Join_Features').toUpperCase()}
			</div>
			<div className='title'>
				{t('Label_Join_Memeber_Benefits').toUpperCase()}
			</div>
			<ul>
				<li>{t('Label_Join_MemberBenefits_1')}</li>
				<li>{t('Label_Join_MemberBenefits_2')}</li>
				<li>{t('Label_Join_MemberBenefits_3')}</li>
				{FEATURE_BONUS[currencyId] && (
					<li>
						{t(`Label_Join_MemberBenefits_4`, {
							rebate: FEATURE_BONUS[currencyId],
						})}
					</li>
				)}{' '}
			</ul>
			<div className='title'>
				{t('Label_Join_EnjoyVipExclusiveBonus',{
          site: process.env['NEXT_PUBLIC_BRAND_NAME'] || '',
        }).toUpperCase()}
			</div>
			<ul>
				<li>{t('Label_Join_MultipleProductPlatforms')}</li>
				<li>{t('Label_Join_SpeedyDepositAndWithdrawal')}</li>
			</ul>
		</div>
	)
}

export { Features }
