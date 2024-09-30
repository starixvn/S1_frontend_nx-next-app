import { Img } from '@12b-desktop/components/common'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const VipBottom = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { getBannerUrl } = useGlobalData()
	const {
		auth: { isLogin },
	} = useAuth()

	const handleClickVipBottomImage = async () => {
		if (isLogin) return

		await push(paths.join.root)
	}

	const setting = [
		{
			resourceKey: 'Label_Vip_TopPriorityServices',
			img: 'benefit-1.png',
			alt: 'TopPriorityServices',
		},
		{
			resourceKey: 'Label_Vip_ExclusivePromo',
			img: 'benefit-2.png',
			alt: 'ExclusivePromo',
		},
		{
			resourceKey: 'Label_Vip_BirthdaySpecialGifts',
			img: 'benefit-3.png',
			alt: 'BirthdaySpecialGifts',
		},
		{
			resourceKey: 'Label_Vip_LifetimeMembership',
			img: 'benefit-4.png',
			alt: 'LifetimeMembership',
		},
	]

	return (
		<div className='vip-bottom'>
			{setting.map(item => (
				<div
					className='vip-bottom-item'
					style={{ cursor: 'pointer' }}
					key={item.alt}
				>
					<Img
						src={`${getBannerUrl(`/desktop/img/${item.img}`)}`}
						alt={item.alt}
						onClick={handleClickVipBottomImage}
					/>
					<span>{t(item.resourceKey)}</span>
				</div>
			))}
		</div>
	)
}

export { VipBottom }
