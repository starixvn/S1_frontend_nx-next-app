import React from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import useRecentlyViewed from '@nx-next-app/features/F0001/hooks/useRecentlyViewed'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { recentlyViewedList, onCLickRecentlyViewGame } = useRecentlyViewed()
	const { modal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()
	const params = {
		spaceBetween: 22,
		slidesPerView: 5.8,
	}

	return (
		<>
			<div className='moduleTitle'>{t('lbl_Recently_Viewed')}</div>
			{/* 這裡的 Swiper 看起來不套能包 Carousel 組件，故直接從套件使用 */}
			<Swiper
				className='recently'
				modules={[Navigation]}
				navigation
				{...params}
			>
				{recentlyViewedList.map(recentlyViewedGameItem => {
					const { tpId, tpGameType, isMaintain, gameLogo, tpLogo, gameName } =
						recentlyViewedGameItem || {}
					return (
						<SwiperSlide key={`recently-game-${tpId}-${tpGameType}`}>
							<div
								className='swiper-slide'
								onClick={() => {
									onCLickRecentlyViewGame(recentlyViewedGameItem, {
										loginCallback: () => modal.open(<LoginModal />),
										underMaintenanceCallback: () =>
											modal.open(<UnderMaintenanceModal />),
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalDesktop />),
									})
								}}
								style={{ cursor: 'pointer' }}
							>
								<div
									className={classNames(`recently-game`, {
										active: isMaintain,
									})}
								>
									<div>
										<Image
											className='recently-image'
											src={gameLogo[langId]}
											alt='gameName'
											width={183}
											height={183}
										/>
										<Image
											className='recently-brand'
											src={tpLogo}
											alt='recently-brand'
											width={120}
											height={55}
										/>
										<div className='recently-title'>{gameName[langId]}</div>
									</div>
									{isMaintain && (
										<div className='under'>{t('Label_underMaintenance')}</div>
									)}
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	)
}

export { RecentlyViewGames }
