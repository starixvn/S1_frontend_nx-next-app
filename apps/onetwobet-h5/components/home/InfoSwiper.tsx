import { Carousel } from '@12b-h5/components/common'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import Link from 'next/link'
import { ReactIdSwiperProps } from 'react-id-swiper'

const InfoSwiper = () => {
	const { getBannerUrl } = useGlobalData()
	const {
		auth: { isLogin },
	} = useAuth()

	const config: ReactIdSwiperProps = {
		slidesPerView: 3,
		autoplay: false,
		loop: false,
		centeredSlides: false,
		spaceBetween: 10,
		navigation: false,
		pagination: false,
	}

	return (
		<div className='info-swiper'>
			<Carousel {...config}>
				<div className='swiper-slide'>
					{/* TODO 導向商城頁面 */}
					<button>
						<img
							src={getBannerUrl('/h5/img/tiles/en/tile-12rewards.png')}
							alt='rewards'
						/>
					</button>
				</div>
				<div className='swiper-slide'>
					<Link href={paths.vip.root} passHref>
						<button>
							<img
								src={getBannerUrl('/h5/img/tiles/en/tile-12vip.png')}
								alt='vip'
							/>
						</button>
					</Link>
				</div>
				<div className='swiper-slide'>
					<Link
						href={isLogin ? paths.referral.root : paths.login.root}
						passHref
					>
						<button>
							<img
								src={getBannerUrl('/h5/img/tiles/en/tile-12refer.png')}
								alt='refer'
							/>
						</button>
					</Link>
				</div>
			</Carousel>
		</div>
	)
}

export default InfoSwiper
