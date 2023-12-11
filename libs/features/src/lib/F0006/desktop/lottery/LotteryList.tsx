import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { DynamicSwiper } from '@nx-next-app/components/D0002/carousel'
import { ICarouselProps } from '@nx-next-app/components/D0002'
import { ReactIdSwiperProps } from 'react-id-swiper'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useTranslation } from 'next-i18next'
import { ISubMenu } from '@nx-next-app/types'
import LotteryListItem from './LotteryListItem'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LotteryList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: {
			Lottery: { subMenu },
		},
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
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
					{subMenu?.map((item: ISubMenu) => (
						<LotteryListItem
							className={classNames('swiper-slide', {
								active: item.isTpMaintain,
							})}
							style={{ pointerEvents: item.isTpMaintain ? 'none' : 'auto' }}
							alt={item.displayKey as string}
							key={item?.product?.GAME_ID}
							hoverImgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/lottery/${item?.desktop?.lobbyPage?.hoverBgImg}`}
							imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/lottery/${item?.desktop?.lobbyPage?.bgImg}`}
							displayName={
								item.displayKey
									? (t(item.displayKey) as string)
									: item.displayText
							}
							onItemClick={() => onItemClick(item)}
							eventIcons={item?.eventIcons}
						/>
					))}
				</Carousel>
			</div>
		</section>
	)
}

export default LotteryList
