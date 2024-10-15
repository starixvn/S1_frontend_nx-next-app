import {
	dateFormat,
	gmtFormat,
	paths,
	timeFormat,
} from '@nx-next-app/constants'
import { IHotEventData } from '@nx-next-app/service'
import { formatHdp } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const HotMatchtem = ({ data }: { data: IHotEventData }) => {
	const { t } = useTranslation()
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
	const gmt = dayjs(battleTime).format(gmtFormat)

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<div className='match-item'>
				<div className='match-time'>
					<div className='date-time'>
						{date} {time} {`GMT(${gmt})`}
					</div>
					<div className='venue'>{sportLeaguesTitle}</div>
				</div>
				<div className='match-detail'>
					<div className='team-item'>
						<div className='team-emblem'>
							<img src={homeTeamPic} alt='' />
						</div>
						<div className='team-name'>{homeTeamName}</div>
						<div className='handicap'>{`(${homeTeamHandicap})`}</div>
					</div>
					<div className='vs'>VS</div>
					<div className='team-item'>
						<div className='team-emblem'>
							<img src={awayTeamPic} alt='' />
						</div>
						<div className='team-name'>{awayTeamName}</div>
						<div className='handicap'>{`(${awayTeamHandicap})`}</div>
					</div>
				</div>
				<div className='match-odds'>
					<div className='team-odds'>
						<div className='text'>FT.HDP</div>
						<div className='number'>
							<span>{homeOdds}</span>
						</div>
					</div>
					<div className='team-odds'>
						<div className='text'>FT.HDP</div>
						<div className='number'>
							<span>{awayOdds}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='btnGroup'>
				<Link href={`${paths.sports.root}/?${searchParams.toString()}`}>
					<button className='primary'>
						{t('Label_General_BetNow').toUpperCase()}
					</button>
				</Link>
			</div>
		</div>
	)
}

export default HotMatchtem
