import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { isUrl } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { Carousel } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import useRecentlyViewed from '@nx-next-app/features/F0001/hooks/useRecentlyViewed'

const LiveStreamingModalH5 = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const RecentlyViewGames = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
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
									loginCallback: () => {
										push(paths.login.root)
									},
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalH5 />),
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
				})}
			</Carousel>
		</>
	)
}

export { RecentlyViewGames }
