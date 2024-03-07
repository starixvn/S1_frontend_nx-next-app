import React from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Image from 'next/future/image'
import { isUrl } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { Carousel } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import useRecentlyViewed from '@nx-next-app/features/F0006/hooks/useRecentlyViewed'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

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
									<Image
										className='recently-image'
										src={gameLogo[langId] ?? gameLogo['en']}
										width={300}
										height={300}
										alt='recently-image'
									/>
									{isUrl(tpLogo) ? (
										<Image
											src={tpLogo}
											width={87}
											height={55}
											alt='recently-brand'
											className='recently-brand'
										/>
									) : (
										<img className='recently-brand' src={tpLogo} alt='' />
									)}

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

export { RecentlyViewGames }
