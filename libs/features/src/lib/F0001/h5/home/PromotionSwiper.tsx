import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { isUrl } from '@nx-next-app/utils'
import Image from 'next/future/image'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const config = {
	shouldSwiperUpdate: true,
	containerClass: 'home-promos-container',
	slidesPerView: 1.05,
	spaceBetween: 10,
}
const PromotionSwiper = () => {
	const { promotionData, handlePromotionClick } = useHome()
	const { t } = useTranslation()

	if (promotionData.length === 0) return null
	return (
		<>
			<div className='home-title'>{t('Label_General_Promotion')}</div>
			<div className='home-promos-swiper'>
				<DynamicSwiper {...config}>
					{promotionData.map(({ banner, title, description, bonusCode }) => (
						<div
							key={bonusCode}
							onClick={() => handlePromotionClick(bonusCode)}
						>
							<div>
								{isUrl(banner) ? (
									<Image src={banner} alt={title} width={1920} height={500} />
								) : (
									<img src={banner} alt={title} />
								)}
							</div>
						</div>
					))}
				</DynamicSwiper>
			</div>
		</>
	)
}

export { PromotionSwiper }
