import { Img } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

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
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/vip/benefit-1.webp`}
					alt='TopPriorityServices'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_TopPriorityServices')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/vip/benefit-2.webp`}
					alt='ExclusivePromo'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_ExclusivePromo')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/vip/benefit-3.webp`}
					alt='BirthdaySpecialGifts'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_BirthdaySpecialGifts')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/vip/benefit-4.webp`}
					alt='LifetimeMembership'
					onClick={handleClickVipBottomImage}
				/>
				<span>{t('Label_Vip_LifetimeMembership')}</span>
			</div>
		</div>
	)
}

export default VipBottom
