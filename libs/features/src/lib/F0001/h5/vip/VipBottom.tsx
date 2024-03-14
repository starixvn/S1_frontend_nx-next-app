import React from 'react'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { Img } from '@nx-next-app/components/D0001'

const VipBottom = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const {
		auth: { isLogin },
	} = useAuth()

	const handleClickVipBottomImage = async () => {
		if (isLogin) return

		await push(paths.join.root)
	}

	return (
		<div className='vip-bottom'>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-1.png`}
					alt='TopPriorityServices'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_TopPriorityServices')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-2.png`}
					alt='ExclusivePromo'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_ExclusivePromo')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-3.png`}
					alt='BirthdaySpecialGifts'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_BirthdaySpecialGifts')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-4.png`}
					alt='LifetimeMembership'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_LifetimeMembership')}</span>
			</div>
		</div>
	)
}

export default VipBottom
