import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0002/providers'
import { Carousel } from '@nx-next-app/components/H0001'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import classNames from 'classnames'
import Image from 'next/future/image'
import { isUrl } from '@nx-next-app/utils'

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { recentlyViewedList, handleRecentlyViewGameClick } = useHome()
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
									{ loginCallback: () => push(paths.login.root) }
								)
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
										alt=''
									/>
									{isUrl(tpLogo) ? (
										<Image
											src={tpLogo}
											width={87}
											height={55}
											alt=''
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
				)}
			</Carousel>
		</>
	)
}

export { RecentlyViewGames }
