import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { IHotEventData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const Item = ({ data }: { data: IHotEventData }) => {
	const { t } = useTranslation()
	const { formatHdp } = useHome()
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

	const searchParams = new URLSearchParams({
		tpId,
		matchId: matchId ? String(matchId) : '',
		gameId,
	})

	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<div className='hotmatch-item '>
				<div className='hotmatch-item-title '>
					<p>{sportLeaguesTitle}</p>
					<div>
						{date}
						<div>{time}</div>
					</div>
				</div>
				<div className='hotmatch-item-center'>
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
				<Link href={`${paths.sports.root}/?${searchParams.toString()}`}>
					<button className='bet-btn'>{t('Label_General_BetNow')}</button>
				</Link>
			</div>
		</div>
	)
}

const HotEventSwiper = () => {
	const { hotEventData } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoHotEventData = useMemo(() => hotEventData, [hotEventData])

	const config = {
		slidesPerView: 4.1,
		spaceBetween: 10,
		shouldSwiperUpdate,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	useEffect(() => {
		setShouldSwiperUpdate(true)
		setTimeout(() => setShouldSwiperUpdate(false), 5000)
	}, [memoHotEventData])

	if (!hotEventData) return null
	const rows = hotEventData?.map(eventData => (
		<Item
			key={`${eventData.sportLeaguesTitle}-${eventData.matchId}`}
			data={eventData}
		/>
	))

	return rows.length > 0 ? (
		<div
			className='hotmatchswiper'
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<DynamicSwiper {...config}>{rows}</DynamicSwiper>
		</div>
	) : null
}

export { HotEventSwiper }
