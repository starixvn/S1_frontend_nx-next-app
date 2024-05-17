import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { MenuKeyEnum } from '@nx-next-app/types'
import { ReactIdSwiperProps } from 'react-id-swiper'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { ICarouselProps } from '@nx-next-app/components/D0006'
import { DynamicSwiper } from '@nx-next-app/components/D0006/carousel'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import LotteryListItem from './LotteryListItem'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LotteryList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const lotterySubMenus = find(menuList, {
		category: MenuKeyEnum.Lottery,
	})?.subMenu

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
		})
	}

	const Carousel = ({ children, className, ...rest }: ICarouselProps) => {
		const params: ReactIdSwiperProps = {
			slidesPerView: 5,
			spaceBetween: 5,
			centeredSlides: true,
			loop: true,
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			rebuildOnUpdate: true,
			containerClass: 'swiper-container lotterySwiper',
		}

		const config = { ...params, ...rest }

		return <DynamicSwiper {...config}>{children}</DynamicSwiper>
	}

	return (
		<section className='inside'>
			<div className='rightModule'>
				<Carousel>
					{lotterySubMenus?.map(subMenuItem => (
						<LotteryListItem
							subMenuItemClassName='swiper-slide'
							key={subMenuItem?.tpGameIdNo}
							subMenuItem={subMenuItem}
							onItemClick={onItemClick}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}

export default LotteryList
