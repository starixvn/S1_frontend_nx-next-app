import { Swiper, SwiperProps } from 'swiper/react'

const Carousel = ({
	children,
	spaceBetween = 30,
	centeredSlides = true,
	loop = true,
	autoplay = { delay: 5000, disableOnInteraction: false },
	navigation = { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
	pagination = {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	...res
}: SwiperProps) => {
	return (
		<Swiper
			spaceBetween={spaceBetween}
			centeredSlides={centeredSlides}
			loop={loop}
			autoplay={autoplay}
			navigation={navigation}
			pagination={pagination}
			{...res}
		>
			{children}
		</Swiper>
	)
}

export default Carousel
