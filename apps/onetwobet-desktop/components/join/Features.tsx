import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const Features = () => {
	const { t } = useTranslation()
	const { FEATURE_BONUS } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<>
			<div className='features'>
				<div className='title'>
					<span className='icon icon-star-full' />
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
					)}
				</ul>
				<div className='title'>
					{t('Label_Join_EnjoyVipExclusiveBonus').toUpperCase()}
				</div>
				<ul>
					<li>{t('Label_Join_MultipleProductPlatforms')}</li>
					<li>{t('Label_Join_SpeedyDepositAndWithdrawal')}</li>
				</ul>
			</div>
			<div className='joinAnimation'>
				<img
					className='animationlogo'
					alt='logo'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/logo_en_w.png`}
					style={{ width: '135px', height: '59px' }}
				/>
				<img
					className='npc1'
					alt='npc1'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joinNpc01.png`}
					style={{ width: '187px', height: '274px' }}
				/>
				<img
					className='npc2'
					alt='npc2'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joinNpc02.png`}
					style={{ width: '306px', height: '233px' }}
				/>
				<img
					className='welcome'
					alt='welcome'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/welcome.png`}
					style={{ width: '49px', height: '313px' }}
				/>
				<img
					className='back'
					alt='back'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/back.png`}
					style={{ width: '17px', height: '57px' }}
				/>
			</div>
		</>
	)
}

export { Features }
