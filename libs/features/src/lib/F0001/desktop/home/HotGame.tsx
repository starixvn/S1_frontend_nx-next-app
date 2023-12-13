import Link from 'next/link'
import Image from 'next/future/image'
import { find, isUndefined } from 'lodash-es'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import dynamic from 'next/dynamic'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const HotGame = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData, handleHotGameClick, handleSlotGamePlay } =
		useHome()
	const { jackpot = [], providerList = [] } = slotGameData ?? {}
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { menuData, onMenuOpen } = useMenu()
	const { modal } = useGlobalModal()

	const [showHotGameNavigation, setShowHotGameNavigation] = useState(false)
	const [showJackpotNavigation, setShowJackpotNavigation] = useState(false)

	const slotMenu = menuData.Slot.subMenu

	const slotPP = find(slotMenu, menu => menu.productKey === 'SLOTS_PP')
	const slotSG = find(slotMenu, menu => menu.productKey === 'SLOTS_SG')

	const hotGameSwiperConfig = {
		slidesPerView: 3,
		spaceBetween: 25,
		rebuildOnUpdate: false,
		// * 市場希望只透過按鈕觸發
		autoplay: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showHotGameNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showHotGameNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	const jackpotSwiperConfig = {
		slidesPerView: 7,
		spaceBetween: 25,
		rebuildOnUpdate: false,
		// * 市場希望只透過按鈕觸發
		autoplay: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	if (hotGameData?.length === 0 && jackpot?.length === 0) return null

	return (
		<div className='hotgame'>
			{hotGameData.length > 0 && (
				<>
					<div className='maintitle'>
						{t('Label_General_HotGames')}
						<Link href={paths.slots.root} passHref>
							<a>{t('Label_General_More')}</a>
						</Link>
					</div>
					<div className='hotgame-content'>
						<div className='hotgame-content-item'>
							{/* // * 幣別 INR 顯示 SG 遊戲，其餘顯示 PP */}
							{currencyId === CurrenciesEnum.INR ? (
								<>
									<Image
										className='left-bn'
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/hotgame-bn-spad.png`}
										alt='hotGame-bn-spad'
										width={900}
										height={600}
									/>
									<button
										className='all-btn'
										onClick={() => {
											if (!isUndefined(slotSG)) {
												onMenuOpen(slotSG, {
													loginCallback: () => modal.open(<LoginModal />),
												})
											}
										}}
									>
										{t('Label_General_PlayNow')}
									</button>
								</>
							) : (
								<>
									<Image
										className='left-bn'
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/hotgame-bn-pp.png`}
										alt='hotgame-pp'
										width={900}
										height={600}
									/>
									<button
										className='all-btn'
										onClick={() => {
											if (!isUndefined(slotPP)) {
												onMenuOpen(slotPP, {
													loginCallback: () => modal.open(<LoginModal />),
												})
											}
										}}
									>
										{t('Label_General_PlayNow')}
									</button>
								</>
							)}
						</div>
						<div className='hotgame-content-item'>
							<Image
								className='right-bn'
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/hotgame-bn-royal.png`}
								alt='hotgame-royal'
								width={6971}
								height={3189}
							/>

							<div
								className='hotgameswiper'
								onMouseOver={() => setShowHotGameNavigation(true)}
								onMouseOut={() => setShowHotGameNavigation(false)}
								onFocus={() => 0}
								onBlur={() => 0}
							>
								<DynamicSwiper {...hotGameSwiperConfig}>
									{hotGameData.map(game => {
										const { gameLogo, gameName } = game
										return (
											<div key={gameName}>
												<a
													onClick={() =>
														handleHotGameClick(
															{
																game,
															},
															{
																underMaintenanceCallback: () =>
																	modal.open(<UnderMaintenanceModal />),
																loginCallback: () => modal.open(<LoginModal />),
															}
														)
													}
												>
													<div className='hotgame-item'>
														<img src={gameLogo} alt='img-hot-game' />
														<span>{gameName}</span>
													</div>
												</a>
											</div>
										)
									})}
								</DynamicSwiper>
							</div>
						</div>
					</div>
				</>
			)}
			{jackpot.length > 0 && (
				<>
					<div className='maintitle'>
						{t('Label_General_Jackpot')}
						<Link href={paths.slots.root}>{t('Label_General_More')}</Link>
					</div>

					<div
						className='jackpotswiper'
						onMouseOver={() => setShowJackpotNavigation(true)}
						onMouseOut={() => setShowJackpotNavigation(false)}
						onFocus={() => 0}
						onBlur={() => 0}
					>
						<DynamicSwiper {...jackpotSwiperConfig}>
							{jackpot.map(({ tpId, gameId, imgName, gameName }) => {
								const brandTpName = find(
									providerList,
									obj => obj.tpId === tpId
								)?.tpName
								const imgUrl = `${
									process.env['NEXT_PUBLIC_IMAGE_HOST']
								}/${brandTpName}/${imgName[langId] || imgName['en']}`
								return (
									<div key={`${tpId}-${gameId}`}>
										<a
											onClick={() => {
												handleSlotGamePlay(
													{
														tpId,
														gameId,
													},
													{ loginCallback: () => modal.open(<LoginModal />) }
												)
											}}
										>
											<div className='jackpot-item'>
												<img src={imgUrl} alt='img-hot-game' />
												<span>{gameName[langId] || gameName['en']}</span>
											</div>
										</a>
									</div>
								)
							})}
						</DynamicSwiper>
					</div>
				</>
			)}
		</div>
	)
}

export { HotGame }
