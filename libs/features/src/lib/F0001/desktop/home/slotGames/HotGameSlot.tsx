import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import GameIcon from "@nx-next-app/features/F0001/desktop/home/gameIcon";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LiveStreamingModal'),
	{ ssr: false }
)

const HotGameSlot = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData, handleHotGameClick, handleSlotGamePlay } =
		useHome()
	const { jackpot = [], providerList = [] } = slotGameData ?? {}
	const {
		userInfo: { currencyId, langId },
	} = useAuth()

	// const { onStaticMenuOpen } = useMenu()

	const { modal } = useGlobalModal()

	const [showHotGameNavigation, setShowHotGameNavigation] = useState(false)
	// const [showJackpotNavigation, setShowJackpotNavigation] = useState(false)

	// const jackpotSwiperConfig = {
	// 	slidesPerView: 7,
	// 	spaceBetween: 25,
	// 	rebuildOnUpdate: false,
	// 	// * 市場希望只透過按鈕觸發
	// 	autoplay: false,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	renderPrevButton: () => (
	// 		<div
	// 			style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
	// 			className='swiper-button-prev'
	// 		/>
	// 	),
	// 	renderNextButton: () => (
	// 		<div
	// 			style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
	// 			className='swiper-button-next'
	// 		/>
	// 	),
	// }

	const hotGameCasino = hotGameData.filter(element => {
		return element.tpCategory === TpCategory.Casino
	})

	if (hotGameCasino?.length === 0 && jackpot?.length === 0) return null
	console.log('---------HotGames', hotGameCasino)
	return (
		<div className='hotgame'>
			{hotGameCasino.length > 0 && (
				<>
					<div className='maintitle'>
						Casino
						<Link href={paths.slots.root} passHref>
							<a>{t('Label_General_More')}</a>
						</Link>
					</div>
					<div className='hotgame-content'>
						{hotGameCasino.map(game => {
							const { gameLogo, gameName, gameId, tpName } = game
							const gameItem = {
								gameId,
								gameLogo,
								isMaintain: false,
								tpName,
								gameName,
							}

							return (
								<GameIcon
									key={gameId}
									gameItem={gameItem}
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
								/>
								// <GameIcon />
							)
						})}
					</div>
				</>
			)}

			{/* TODO: Hide in phase 1 */}
			{/* {jackpot.length > 0 && (
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
			)} */}
		</div>
	)
}

export default HotGameSlot
