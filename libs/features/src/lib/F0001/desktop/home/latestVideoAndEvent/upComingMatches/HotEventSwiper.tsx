import { useContext } from 'react'
import dayjs from 'dayjs'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { IHotEventData, useGetHotEventListQuery } from '@nx-next-app/service'
import { isUrl } from '@nx-next-app/utils'
import { Carousel } from '@nx-next-app/components/D0001'
import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import Link from 'next/link'
import { uniqueId } from 'lodash-es'
import dynamic from 'next/dynamic'
import { HomeContext } from '../../HomeContext'
import { getPathParams } from '../../utils'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const Item = ({ data }: { data: IHotEventData }) => {
	const { t } = useTranslation()
	const {
		backgroundPic,
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

	const params = getPathParams({
		urlRouter: paths.sports.root,
		tpId,
		matchId,
		gameId,
	})

	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
	}
	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<div className='hotevent'>
				{isUrl(backgroundPic) && (
					<Image
						src={backgroundPic}
						alt='hotevent-bg-img'
						width={300}
						height={183}
					/>
				)}

				<div className='team'>
					<div className='gamename'>{sportLeaguesTitle}</div>
					<div>
						<div className='teamL'>
							<div>
								{isUrl(homeTeamPic) && (
									<Image
										src={homeTeamPic}
										alt={homeTeamName}
										width={653}
										height={944}
									/>
								)}
							</div>
							<div>{homeTeamName}</div>

							<div>{homeTeamHandicap}</div>
						</div>
						<div className='btnGroup'>
							<Link href={`${paths.sports.root}${params}`}>
								<button className='orange'>{t('Label_General_BetNow')}</button>
							</Link>
						</div>
						<div className='teamR'>
							<div>
								{/* <img src={awayTeamPic} alt={awayTeamName} /> */}
								{isUrl(awayTeamPic) && (
									<Image
										src={awayTeamPic}
										alt={awayTeamName}
										width={653}
										height={944}
									/>
								)}
							</div>
							<div> {awayTeamName}</div>
							<div>{awayTeamHandicap}</div>
						</div>
					</div>
					<div className='odds'>
						<div>
							<div>{homeOdds}</div>
							<div>{t('Label_General_HomeTeam')}</div>
						</div>
						<div>
							<div>{date}</div>
							<div>{time}</div>
						</div>
						<div>
							<div>{awayOdds}</div>
							<div>{t('Label_General_AwayTeam')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const HotEventSwiper = () => {
	const { hotEventData: OriginHotEvent } = useContext(HomeContext)
	const {
		userInfo: { langId },
	} = useAuth()

	const { data: { data: hotEventData = OriginHotEvent } = {} } =
		useGetHotEventListQuery(
			{ langId },
			{
				pollingInterval: 60000,
				skip: !langId,
			}
		)

	const config = {
		slidesPerView: 2,
		spaceBetween: 5,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		centeredSlides: false,
		pagination: false,
		navigation: false,
		rebuildOnUpdate: true,
		containerClass: 'swiper-container matchesSwiper',
	}

	return (
		<Carousel {...config}>
			{hotEventData?.map(eventData => (
				<Item
					key={`${eventData.sportLeaguesTitle}-${uniqueId()}`}
					data={eventData}
				/>
			))}
		</Carousel>
	)
}

export { HotEventSwiper }
