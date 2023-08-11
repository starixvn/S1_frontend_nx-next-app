import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import Image from 'next/future/image'
import dynamic from 'next/dynamic'
import { useAuth } from '@nx-next-app/data-access'
import { Carousel } from '@nx-next-app/components/D0001'
import { IViewedGameData } from '@nx-next-app/service'
import { isUrl } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { ISubMenu } from '@nx-next-app/features/F0001/types'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const RecentlyViewGames = ({
	recentlyViewedList,
}: {
	recentlyViewedList: IViewedGameData[]
}) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()

	const { menuData, onMenuOpen } = useMenu()

	const handleGameClick = ({
		tpId,
		tpGameType,
		isMaintain,
	}: {
		tpId: number
		tpGameType: number
		isMaintain: boolean
	}) => {
		if (!isMaintain) {
			// 非 Maintain 才做動作
			let subMenu: ISubMenu<any> | undefined
			Object.values(menuData).forEach(item => {
				const result = item.subMenu?.find(
					({ product }) =>
						product?.TP_ID === tpId && product?.TP_GAME_TYPE === tpGameType
				)
				if (result !== undefined) {
					subMenu = result
				}
			})
			if (subMenu !== undefined) {
				onMenuOpen(subMenu, { loginCallback: () => modal.open(<LoginModal />) })
			}
		}
	}

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
							onClick={() => handleGameClick({ tpId, tpGameType, isMaintain })}
						>
							<div
								className={classNames('recently-game', {
									active: isMaintain,
								})}
							>
								<div>
									<Image
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
