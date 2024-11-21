import dynamic from 'next/dynamic'
import { ReactIdSwiperProps } from 'react-id-swiper'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'

// * 啟用功能
SwiperCore.use([Pagination, Navigation, Autoplay])

// * react-id-swiper 只支援動態載入
// * https://github.com/nolimits4web/swiper/issues/5056#issuecomment-1168034723
const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const Carousel = ({ children, ...rest }: ReactIdSwiperProps) => {
	const params: ReactIdSwiperProps = {
		// slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		rebuildOnUpdate: true,
	}

	const config = { ...params, ...rest }

	return <DynamicSwiper {...config}>{children}</DynamicSwiper>
}

export default Carousel
