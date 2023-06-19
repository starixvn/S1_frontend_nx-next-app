import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

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
					{t('Label_Join_EnjoyNova88VipExclusiveBonus').toUpperCase()}
				</div>
				<ul>
					<li>{t('Label_Join_MultipleProductPlatforms')}</li>
					<li>{t('Label_Join_SpeedyDepositAndWithdrawal')}</li>
				</ul>
			</div>
			<div className='joinAnimation'>
				<Image
					className='animationlogo'
					alt='logo'
					src={`${process.env['NEXT_PUBLIC_IMAGE_HOST']}/SiteSkin/img/logo_en_w.png`}
					width={150}
					height={66}
					style={{ width: '150px', height: '66px' }}
				/>
				<Image
					className='npc1'
					alt='npc1'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joinNpc01.png`}
					width={187}
					height={274}
					style={{ width: '187px', height: '274px' }}
				/>
				<Image
					className='npc2'
					alt='npc2'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/joinNpc02.png`}
					width={306}
					height={233}
					style={{ width: '306px', height: '233px' }}
				/>
				<Image
					className='welcome'
					alt='welcome'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/welcome.png`}
					width={49}
					height={313}
					style={{ width: '49px', height: '313px' }}
				/>
				<Image
					className='back'
					alt='back'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/back.png`}
					width={17}
					height={57}
					style={{ width: '17px', height: '57px' }}
				/>
			</div>
		</>
	)
}

export default Features
