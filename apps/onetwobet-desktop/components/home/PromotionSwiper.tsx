import Carousel from '@12b-desktop/components/common/carousel'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useHome } from '@nx-next-app/operations'
import { isUrl } from '@nx-next-app/utils'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { ReactIdSwiperProps } from 'react-id-swiper'

const PromotionDetailModal = dynamic(
	() =>
		import(
			'@12b-desktop/components/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)

const PromotionSwiper = () => {
	const { promotionData = [] } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)
	const { modal } = useGlobalModal()

	// 此參數在每次 navigation 狀態更新時也會觸發，會導致元件滾動異常，故僅有在資料更新時才開啟更新 swipper
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoPromotionData = useMemo(() => promotionData, [promotionData])

	const config: ReactIdSwiperProps = {
		slidesPerView: 3,
		spaceBetween: 25,
		autoplay: false,
		shouldSwiperUpdate,
		rebuildOnUpdate: false,
		pagination: false,
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

	useEffect(() => {
		setShouldSwiperUpdate(true)
		const timeout = setTimeout(() => setShouldSwiperUpdate(false), 5000)
		return () => clearTimeout(timeout)
	}, [memoPromotionData])

	if (promotionData.length === 0) {
		return null
	}

	return (
		<div
			className='home-promotion'
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<Carousel {...config}>
				{promotionData.map(({ bonusCode, categoryId, tpId, banner, title }) => (
					<div
						key={`promotion.list-${bonusCode}-${categoryId}-${tpId}`}
						className='promos-item'
						onClick={() =>
							modal.open(<PromotionDetailModal bonusCode={bonusCode} />)
						}
					>
						{isUrl(banner) ? <img src={banner} alt={title} /> : null}
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default PromotionSwiper
