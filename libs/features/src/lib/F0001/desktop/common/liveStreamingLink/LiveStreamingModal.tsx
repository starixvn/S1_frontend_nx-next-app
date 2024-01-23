import React from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { ILiveStreamingData } from '@nx-next-app/service'

const LiveStreamingModal = ({
	liveStreamingList,
}: {
	liveStreamingList: ILiveStreamingData[]
}) => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { push } = useRouter()
	const { t } = useTranslation()
	const { onEnterPage } = useMenu()
	const { closeModal } = useGlobalModal()
	const { LANG_TO_CURRENCY } = useStaticData()

	const getClassNameByCurrencyId = () => {
		if (!LANG_TO_CURRENCY) {
			return ''
		}
		const currencyClassNames = {
			[LANG_TO_CURRENCY['vn']]: (_langId: string) =>
				_langId === 'en' ? 'vn-en' : 'vn',
			[LANG_TO_CURRENCY['th']]: (_langId: string) =>
				_langId === 'en' ? 'th-en' : 'th',
		}
		const getClassName = currencyClassNames[currencyId]
		if (getClassName) {
			return getClassName(langId)
		}
		return ''
	}

	const isWithinTwoHours = (startTime: string) =>
		dayjs().isBetween(
			dayjs(startTime),
			dayjs(startTime).add(2, 'hours'),
			null,
			'[]'
		)

	return (
		<div className={`livesportspop active ${getClassNameByCurrencyId()}`}>
			<div className='livesports-content'>
				<div>
					{liveStreamingList.map(
						({
							sportLeaguesTitle,
							homeTeamPic,
							homeTeamName,
							battleTime,
							awayTeamPic,
							awayTeamName,
							tpId,
							gameId,
							matchId,
						}) => (
							<div
								key={`${tpId}_${gameId}_${matchId}`}
								className={`livesports-item ${
									isWithinTwoHours(battleTime) ? '' : 'next'
								}`}
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
								<div className='top'>
									<div>{sportLeaguesTitle}</div>
									<div>
										{isWithinTwoHours(battleTime)
											? // LIVE字樣不翻譯
											  'LIVE'
											: t('Label_General_Next')}
									</div>
								</div>
								<div className='bottom'>
									<div className='bottom-team'>
										<div>
											<img src={homeTeamPic} alt={homeTeamName} />
										</div>
										<div>{homeTeamName}</div>
									</div>
									<div className='bottom-time'>
										<img
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/vs.png`}
											alt=''
										/>
										<div>
											<div>{dayjs(battleTime).format('DD MMM')}</div>
											<div>{dayjs(battleTime).format('hh:mm A')}</div>
										</div>
									</div>
									<div className='bottom-team'>
										<div>
											<img src={awayTeamPic} alt={awayTeamName} />
										</div>
										<div>{awayTeamName}</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>
			</div>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<img
				onClick={closeModal}
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/promosBackPopup/delet.png`}
				alt=''
				className='closepop'
			/>
		</div>
	)
}

export default LiveStreamingModal
