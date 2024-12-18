/* eslint-disable @typescript-eslint/no-empty-function */
import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { dateFormat, timeFormat } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { GameIconContainer } from '@nx-next-app/features/F0001/desktop/home/gameIcon/styles'
import { HotMatchContainer } from '@nx-next-app/features/F0001/desktop/home/hotMatch/styles'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { IHotEventData, IHotGame } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { getIsTpMaintain } from 'libs/web/src/utils/tools'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const LoginModal = dynamic(
  () => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
  {
    ssr: false,
  }
)

const Item = ({
	data,
	isMaintenance,
}: {
	data: IHotEventData
	isMaintenance: boolean
}) => {
	const { t } = useTranslation()
	const { formatHdp } = useHome()
	const {
		userInfo: { langId },
	} = useAuth()
	const { onEnterPage } = useMenu()
	const {
		sportLeaguesTitle,
		homeTeamPic,
		homeTeamName,
		awayTeamPic,
		awayTeamName,
		battleTime,
		tpId,
		matchId,
		gameId,
		awayOdds = 0,
		homeOdds = 0,
		handicap = 0,
	} = data

	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)
  const { modal } = useGlobalModal()

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<GameIconContainer
				className={`spacing-top-0 ${isMaintenance ? 'maintain' : ''}`}
				$isMaintain={isMaintenance}
			>
				<div className='match-item '>
					{isMaintenance && (
						<div className='um-container'>
							<div className='txt-maintain'>
								{t('Label_General_UnderMaintenance')}
							</div>
						</div>
					)}
					<div className='match-item-title '>
						<p>{sportLeaguesTitle}</p>
					</div>
					<div className='match-item-center'>
						<div className='team-content'>
							<div className='team-item'>
								<img src={homeTeamPic} alt='' />
								<div>{homeTeamName}</div>
							</div>
							<div className='odds'>
								<span>{homeTeamHandicap}</span>
								<span>{homeOdds}</span>
							</div>
						</div>
						<div className='team-content'>
							<div className='team-item'>
								<img src={awayTeamPic} alt='' />
								<div>{awayTeamName}</div>
							</div>
							<div className='odds'>
								<span>{awayTeamHandicap}</span>
								<span>{awayOdds}</span>
							</div>
						</div>
					</div>
					<div className='match-footer'>
						<div className='match-date'>
							{date}
							<div>{time}</div>
						</div>
						<button
							onClick={() => {
								onEnterPage(
									{
										langId,
										tpId: Number(data.tpId),
										gameId,
										matchid: matchId.toString(),
										tpGameType: 0,
									},
									{ loginCallback: () => modal.open(<LoginModal />) }
								)
							}}
							className='bet-btn'
						>
							{t('Label_General_BetNow')}
						</button>
					</div>
				</div>
			</GameIconContainer>
		</div>
	)
}

const HotEvents = ({ gameData }: { gameData: IHotGame[] }) => {
	const { hotEventData } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)
	const [isMaintenance, setIsMaintenance] = useState(false)
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoHotEventData = useMemo(() => hotEventData, [hotEventData])
	const { tpMaintainList } = useGlobalData()

	const config = {
		slidesPerView: 2.8,
		breakpoints: {
			1400: {
				slidesPerView: 3.8,
			},
		},
		spaceBetween: 24,
		shouldSwiperUpdate,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.3 }}
				className='swiper-button-prev icon icon-chevron_left'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.3 }}
				className='swiper-button-next icon icon-chevron_right'
			/>
		),
	}

	useEffect(() => {
		if (
			gameData &&
			gameData.length > 0 &&
			hotEventData &&
			hotEventData.length > 0
		) {
			const game = gameData.find(
				game => game.tpId === Number(hotEventData[0]?.tpId)
			)
			const { tpId, tpGameType } = game || {}
			setIsMaintenance(
				getIsTpMaintain({
					tpMaintainList,
					tpId,
					tpGameType,
				})
			)
		}
	}, [tpMaintainList, hotEventData, gameData])

	useEffect(() => {
		setShouldSwiperUpdate(true)
		setTimeout(() => setShouldSwiperUpdate(false), 5000)
	}, [memoHotEventData])

	if (!hotEventData) return null
	const rows = hotEventData?.map(eventData => (
		<Item
			key={`${eventData.sportLeaguesTitle}-${eventData.matchId}`}
			data={eventData}
			isMaintenance={isMaintenance}
		/>
	))

	return rows.length > 0 ? (
		<HotMatchContainer
			className='content-container'
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<DynamicSwiper {...config}>{rows}</DynamicSwiper>
		</HotMatchContainer>
	) : null
}

export default HotEvents
