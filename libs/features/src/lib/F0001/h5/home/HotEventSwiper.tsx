import dayjs from 'dayjs'
import classNames from 'classnames'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const config = {
	spaceBetween: 10,
	shouldSwiperUpdate: true,
	slidesPerView: 1.05,
	containerClass: 'hotmatch-swiper-container',
}

const HotEventSwiper = () => {
	const { t } = useTranslation()
	const { hotEventData, formatHdp } = useHome()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { push } = useRouter()
	const { onEnterPage } = useMenu()

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	return (
		// 巴西有加 br className，因為僅有巴西需要去除 Aston Villa 贊助球隊
		<div
			className={classNames('home-hotmatch', {
				br: isBRL,
			})}
		>
			<div className='home-hotmatch-wrapper'>
				<div className='top'>
					<div>{t('Label_General_Sports').toUpperCase()}</div>
				</div>
			</div>
			<div className='home-hotmatch-swiper'>
				<DynamicSwiper {...config}>
					{hotEventData?.map(eventData => {
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
						} = eventData

						const date = dayjs(battleTime).format(dateFormat)
						const time = dayjs(battleTime).format(timeFormat)

						const homeTeamHandicap = formatHdp(handicap)
						const awayTeamHandicap = formatHdp(handicap * -1)
						return (
							<div key={`${matchId}-${battleTime}`}>
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
					})}
				</DynamicSwiper>
			</div>
		</div>
	)
}

export default HotEventSwiper
