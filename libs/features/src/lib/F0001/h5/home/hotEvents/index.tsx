import { dateFormat, paths, timeFormat } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { HotMatchContainer } from '@nx-next-app/features/F0001/h5/home/hotEvents/styles'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { TpCategory } from 'libs/web/src/service/siteApi/type'
import { getIsTpMaintain } from 'libs/web/src/utils/tools'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const config = {
	spaceBetween: 10,
	shouldSwiperUpdate: true,
	slidesPerView: 1.12,
	containerClass: 'hotmatch-swiper-container',
}

const HotEvents = () => {
	const { t } = useTranslation()
	const { hotEventData, formatHdp, hotGameData } = useHome()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { push } = useRouter()
	const { onEnterPage } = useMenu()
	const [isMaintenance, setIsMaintenance] = useState(false)
	const { tpMaintainList } = useGlobalData()

	const sportGames = hotGameData?.filter(element => {
		return element.tpCategory === TpCategory.Sports
	})

	useEffect(() => {
		if (
			sportGames &&
			sportGames.length > 0 &&
			hotEventData &&
			hotEventData.length > 0
		) {
			const game = sportGames.find(
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

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	return (
		// 巴西有加 br className，因為僅有巴西需要去除 Aston Villa 贊助球隊
		<HotMatchContainer
			className={classNames({
				br: isBRL,
			})}
		>
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
								{isMaintenance && (
									// Jimmy Help me
									<div></div>
								)}
								<div className='match-item'>
									<div className='match-item-title'>
										<p>{sportLeaguesTitle}</p>
									</div>
									<div className='match-item-center'>
										<div className='team-content'>
											<div className='team-item'>
												<img src={homeTeamPic} alt={homeTeamName} />
												<div>{homeTeamName}</div>
											</div>
											<div className='odds'>
												<span>{homeTeamHandicap}</span>
												<span>{homeOdds}</span>
											</div>
										</div>
										<div className='team-content'>
											<div className='team-item'>
												<img src={awayTeamPic} alt={awayTeamName} />
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
											className='bet-btn'
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
							</div>
						)
					})}
				</DynamicSwiper>
			</div>
		</HotMatchContainer>
	)
}

export default HotEvents
