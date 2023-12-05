import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { isUrl } from '@nx-next-app/utils'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { toUpper } from 'lodash-es'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})
const PromotionSwiper = () => {
	const { t } = useTranslation()
	const { promotionData, handlePromotionClick } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)

	const swipperConfig = {
		slidesPerView: 3,
		spaceBetween: 25,
		centeredSlides: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	return (
		<>
			<div className='maintitle'>
				{t('Label_General_Promotion')}
				<Link href={paths.promotion.root} passHref>
					<a>{toUpper(t('Label_General_More') || '')}</a>
				</Link>
			</div>
			{promotionData?.length > 0 && (
				<div
					className='promosswiper'
					onMouseOver={() => setShowNavigation(true)}
					onMouseOut={() => setShowNavigation(false)}
					onFocus={() => 0}
					onBlur={() => 0}
				>
					<DynamicSwiper {...swipperConfig}>
						{promotionData.map(
							({ bonusCode, categoryId, tpId, banner, title }) => (
								<div
									key={`promotion.list-${bonusCode}-${categoryId}-${tpId}`}
									className='promos-item'
									onClick={() => handlePromotionClick(bonusCode)}
								>
									{isUrl(banner) ? <img src={banner} alt={title} /> : null}
								</div>
							)
						)}
					</DynamicSwiper>
				</div>
			)}
		</>
	)
}

export { PromotionSwiper }
