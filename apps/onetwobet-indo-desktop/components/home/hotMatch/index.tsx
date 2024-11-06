import { Carousel } from '@12b-indo-desktop/components/common'
import { useHome } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { ReactIdSwiperProps } from 'react-id-swiper'
import HotMatchtem from './HotMatchtem'

const HotMatch = () => {
	const { t } = useTranslation()
	const { hotEventData = [] } = useHome()
	const [showNavigation, setShowNavigation] = useState(false)
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoHotEventData = useMemo(() => hotEventData, [hotEventData])

	const config: ReactIdSwiperProps = {
		slidesPerView: 1,
		autoplay: false,
		loop: false,
		shouldSwiperUpdate,
		rebuildOnUpdate: false,
		pagination: false,
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
		const timeout = setTimeout(() => setShouldSwiperUpdate(false), 5000)
		return () => clearTimeout(timeout)
	}, [memoHotEventData])

	if (hotEventData.length === 0) {
		return null
	}

	return (
		<div className='home-hotmatch'>
			<div className='title'>
				{t('Label_General_UpcomingMatches').toUpperCase()}
			</div>
			<div
				className='hotmatch-swiper'
				onMouseOver={() => setShowNavigation(true)}
				onMouseOut={() => setShowNavigation(false)}
				onFocus={() => 0}
				onBlur={() => 0}
			>
				<Carousel {...config}>
					{hotEventData?.map(eventData => (
						<HotMatchtem
							key={`${eventData.sportLeaguesTitle}-${eventData.matchId}`}
							data={eventData}
						/>
					))}
				</Carousel>
			</div>
		</div>
	)
}

export default HotMatch
