import React from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { Carousel } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import useRecentlyViewed from '@nx-next-app/features/F0006/hooks/useRecentlyViewed'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { recentlyViewedList, onCLickRecentlyViewGame } = useRecentlyViewed()

	const {
		userInfo: { langId },
	} = useAuth()

	const config = {
		slidesPerView: 5.8,
		spaceBetween: 22,
		loop: false,
		autoplay: false,
		centeredSlides: false,
		pagination: false,
		containerClass: 'recently',
		rebuildOnUpdate: false,
	}

	if (recentlyViewedList.length === 0) return null

	return (
		<>
			<div className='moduleTitle'>{t('Label_General_RecentlyViewed')}</div>
			<Carousel {...config}>
				{recentlyViewedList.map(recentlyViewedGameItem => {
					const { tpId, tpGameType, isMaintain, gameLogo, tpLogo, gameName } =
						recentlyViewedGameItem || {}
					return (
						<div
							className='swiper-slide'
							key={`recently-game-${tpId}-${tpGameType}`}
							onClick={() => {
								onCLickRecentlyViewGame(recentlyViewedGameItem, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
								})
							}}
						>
							<div
								className={classNames('recently-game', {
									active: isMaintain,
								})}
							>
								<div>
									<img
										className='recently-image'
										src={gameLogo[langId] ?? gameLogo['en']}
										alt='recently'
									/>

									<img src={tpLogo} alt='' className='recently-brand' />

									<div className='recently-title'>
										{gameName[langId] ?? gameName['en']}
									</div>
								</div>
								{isMaintain && (
									<div className='under'>
										{t('Label_General_UnderMaintenance')}
									</div>
								)}
							</div>
						</div>
					)
				})}
			</Carousel>
		</>
	)
}

export default RecentlyViewGames
