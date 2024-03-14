import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { IHotEventData } from '@nx-next-app/service'
import { isUrl } from '@nx-next-app/utils'
import { Carousel } from '@nx-next-app/components/D0006'
import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import Link from 'next/link'
import { uniqueId } from 'lodash-es'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { getPathParams } from '../../utils'

const Item = ({ data }: { data: IHotEventData }) => {
	const { t } = useTranslation()
	const { formatHdp } = useHome()
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

	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<div className='hotevent'>
				{isUrl(backgroundPic) && (
					<img src={backgroundPic} alt='hotevent-bg-img' />
				)}

				<div className='team'>
					<div className='gamename'>{sportLeaguesTitle}</div>
					<div>
						<div className='teamL'>
							<div>
								{isUrl(homeTeamPic) && (
									<img src={homeTeamPic} alt={homeTeamName} />
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
									<img src={awayTeamPic} alt={awayTeamName} />
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
	const { hotEventData } = useHome()

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
