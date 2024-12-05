import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { IHotEventData } from '@nx-next-app/service'
import { formatHdp } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const HotMatchItem = ({ data }: { data: IHotEventData }) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { onEnterPage } = useMenu()
	const { push } = useRouter()
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

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	return (
		<div className='swiper-slide'>
			<div className='home-hotmatch-item'>
				<div className='title'>
					<p>{sportLeaguesTitle}</p>
					<div>
						{date}
						<div>{time}</div>
					</div>
				</div>
				<div className='team'>
					<div className='team-content'>
						<div className='team-content-item'>
							<img src={homeTeamPic} alt={homeTeamName} />
							<div>{homeTeamName}</div>
						</div>
						<div className='odds'>
							<span>{homeTeamHandicap}</span>
							<span>{homeOdds}</span>
						</div>
					</div>
					<div className='team-content'>
						<div className='team-content-item'>
							<img src={awayTeamPic} alt={awayTeamName} />
							<div>{awayTeamName}</div>
						</div>
						<div className='odds'>
							<span>{awayTeamHandicap}</span>
							<span>{awayOdds}</span>
						</div>
					</div>
				</div>
				<button
					className='btn-bet'
					onClick={() =>
						onEnterPage(
							{
								tpId: Number(tpId),
								gameId,
								matchid: String(matchId),
								langId,
								// 原本的就這樣寫
								tpGameType: 1,
							},
							{ loginCallback: () => push(paths.login.root) }
						)
					}
				>
					{t('Label_General_BetNow')}
				</button>
			</div>
		</div>
	)
}

export default HotMatchItem
