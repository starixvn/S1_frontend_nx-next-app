import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { ILiveStreamingData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const LiveStreamingModal = ({
	liveStreamingList,
}: {
	liveStreamingList: ILiveStreamingData[]
}) => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()
	const { push } = useRouter()
	const { onEnterPage } = useMenu()
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const { LANG_TO_CURRENCY } = useStaticData()

	const getClassNameByCurrencyId = () => {
		if (!LANG_TO_CURRENCY) {
			return ''
		}
		const currencyClassNames = {
			[LANG_TO_CURRENCY['vn']]: (_langId: string) =>
				_langId === 'en' ? 'vnbg-en' : 'vnbg-vn',
			[LANG_TO_CURRENCY['th']]: (_langId: string) =>
				_langId === 'en' ? 'thbg-en' : 'thbg-th',
			[LANG_TO_CURRENCY['my']]: (_langId: string) => {
				switch (_langId) {
					case 'en':
						return 'mybg-en'
					case 'cs':
						return 'mybg-cs'
					default:
						return 'mybg-my'
				}
			},
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
		<div className='livesports'>
			<div>
				<img
					src={getBannerUrl(
						`/h5/img/4.0/livesports-${getClassNameByCurrencyId()}.png`
					)}
					alt=''
				/>
			</div>
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
							onClick={() => {
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
								closeModal()
							}}
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
									<img src={getBannerUrl('/h5/img/4.0/vs.png')} alt='' />
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
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<img
				onClick={closeModal}
				src={getBannerUrl('/h5/img/promosBackPopup/delet.png')}
				alt=''
				className='closepop'
			/>
		</div>
	)
}

export default LiveStreamingModal
