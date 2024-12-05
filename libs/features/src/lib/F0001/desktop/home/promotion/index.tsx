import { paths } from "@nx-next-app/constants";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { PromotionContainer } from "@nx-next-app/features/F0001/desktop/home/promotion/styles";
import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { isUrl } from "@nx-next-app/utils";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})
const PromotionSwiper = () => {
	const { t } = useTranslation()
	const { promotionData, handlePromotionClick } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)

	// 此參數在每次 navigation 狀態更新時也會觸發，會導致元件滾動異常，故僅有在資料更新時才開啟更新 swipper
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoPromotionData = useMemo(() => promotionData, [promotionData])

	const swipperConfig = {
		slidesPerView: 2.59,
		breakpoints: {
			1400: {
				slidesPerView: 3,
			},
		},
		spaceBetween: 25,
		centeredSlides: true,
		loop: true,
		shouldSwiperUpdate,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.3 }}
				className='swiper-button-prev icon icon-chevron_left'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.3 }}
				className='swiper-button-next icon icon-chevron_right'
			/>
		),
	}

	useEffect(() => {
		setShouldSwiperUpdate(true)
		setTimeout(() => setShouldSwiperUpdate(false), 5000)
	}, [memoPromotionData])

	if (promotionData?.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='promotion'>
			<div className='content-container '>
				<GroupTitle
					title={t('Label_General_Promotion')}
					href={paths.promotion.root}
				/>
			</div>

			<PromotionContainer
				onMouseOver={() => setShowNavigation(true)}
				onMouseOut={() => setShowNavigation(false)}
				onFocus={() => 0}
				onBlur={() => 0}
			>
				<DynamicSwiper {...swipperConfig}>
					{promotionData?.map(
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
			</PromotionContainer>
		</GameGroup>
	)
}

export default PromotionSwiper
