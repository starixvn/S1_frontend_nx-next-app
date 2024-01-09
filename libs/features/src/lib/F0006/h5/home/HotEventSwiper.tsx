import dayjs from 'dayjs'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { Carousel } from '@nx-next-app/components/H0006'
import { useTranslation } from 'next-i18next'
import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useAuth } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { isUrl } from '@nx-next-app/utils'
import Image from 'next/future/image'

const HotEventSwiper = () => {
	const { t } = useTranslation()
	const { hotEventData, formatHdp } = useHome()
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { onEnterPage } = useMenu()

	const config = {
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		centeredSlides: true,
		navigation: false,
		rebuildOnUpdate: true,
		pagination: false,
		containerClass: 'upcomingmatches',
	}

	return (
		<>
			<div className='moduleTitle'>{t('Label_General_UpcomingMatches')}</div>
			<Carousel {...config}>
				{hotEventData?.map(eventData => {
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
					} = eventData

					const date = dayjs(battleTime).format(dateFormat)
					const time = dayjs(battleTime).format(timeFormat)

					const homeTeamHandicap = formatHdp(handicap)
					const awayTeamHandicap = formatHdp(handicap * -1)
					return (
						<div key={`${sportLeaguesTitle}-${matchId}`}>
							<div className='teamNew'>
								{isUrl(backgroundPic) && (
									<Image
										src={backgroundPic}
										alt='hotevent-bg-img'
										width={360}
										height={219}
										// 不能加這行 style ，元件會壞去
										// style={{ width: 360, height: 219 }}
									/>
								)}
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
									<div
										className='btn-group'
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
										<button className='title'>
											{t('Label_General_BetNow')}
										</button>
									</div>
									<div className='teamR'>
										<div>
											{isUrl(awayTeamPic) && (
												<Image
													src={awayTeamPic}
													alt={awayTeamName}
													width={653}
													height={944}
												/>
											)}
										</div>
										<div>{awayTeamName}</div>
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
					)
				})}
			</Carousel>
		</>
	)
}

export { HotEventSwiper }
