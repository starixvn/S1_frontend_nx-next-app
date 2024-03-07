import classNames from 'classnames'
import Image from 'next/future/image'
import { isUrl } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { Carousel } from '@nx-next-app/components/H0006'
import { paths } from '@nx-next-app/constants'
import useRecentlyViewed from '@nx-next-app/features/F0006/hooks/useRecentlyViewed'

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { recentlyViewedList, onCLickRecentlyViewGame } = useRecentlyViewed()

	const { push } = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()

	const config = {
		slidesPerView: 1.8,
		spaceBetween: 10,
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
					const { gameLogo, tpLogo, gameName, isMaintain, tpGameIdNo } =
						recentlyViewedGameItem || {}
					return (
						<div
							className='swiper-slide'
							key={tpGameIdNo}
							onClick={() =>
								onCLickRecentlyViewGame(recentlyViewedGameItem, {
									loginCallback: () => push(paths.login.root),
								})
							}
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
										<img
											className='recently-brand'
											src={tpLogo}
											alt='recently-brand'
										/>
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
