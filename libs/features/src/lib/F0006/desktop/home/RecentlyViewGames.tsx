import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useAuth } from '@nx-next-app/data-access'
import { Carousel } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useHome } from '@nx-next-app/features/F0006/providers'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { recentlyViewedList, handleRecentlyViewGameClick } = useHome()
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
				{recentlyViewedList.map(
					({
						gameLogo,
						tpLogo,
						gameName,
						tpId,
						tpGameType,
						isMaintain,
						tpGameIdNo,
					}) => (
						<div
							className='swiper-slide'
							key={tpGameIdNo}
							onClick={() =>
								handleRecentlyViewGameClick(
									{ tpId, tpGameType, isMaintain },
									{ loginCallback: () => modal.open(<LoginModal />) }
								)
							}
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
										alt=''
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
				)}
			</Carousel>
		</>
	)
}

export default RecentlyViewGames
