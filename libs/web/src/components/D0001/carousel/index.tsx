import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { ReactIdSwiperProps } from 'react-id-swiper'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'

// * 啟用功能
SwiperCore.use([Pagination, Navigation, Autoplay])

// * react-id-swiper 只支援動態載入
// * https://github.com/nolimits4web/swiper/issues/5056#issuecomment-1168034723
export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

export interface ICarouselProps extends ReactIdSwiperProps {
	className?: string
}

const Carousel = ({ children, className, ...rest }: ICarouselProps) => {
	const params: ReactIdSwiperProps = {
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
		rebuildOnUpdate: true,
	}

	const config = { ...params, ...rest }

	return (
		<div className={classNames('swiper-container', className)}>
			<div className='swiper-wrapper'>
				<DynamicSwiper {...config}>{children}</DynamicSwiper>
			</div>
		</div>
	)
}

export default Carousel
