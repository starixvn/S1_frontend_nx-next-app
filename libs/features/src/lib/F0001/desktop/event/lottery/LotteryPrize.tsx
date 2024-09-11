import {
	paths,
	PRIZE_CATEGORY_I18N_KEYS,
	STICKER_IDS_TO_ZODIAC_SIGNS,
} from '@nx-next-app/constants'
import { ICustLotteryHistoryWinnerData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

interface LotteryPrizeProps {
	data: ICustLotteryHistoryWinnerData
	onClose?: () => void
	allowClickToCopy?: boolean
}

const LotteryPrize = ({
	data,
	onClose,
	allowClickToCopy,
}: LotteryPrizeProps) => {
	const { t } = useTranslation()

	const searchParams = new URLSearchParams()
	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined) searchParams.append(key, String(value))
	})

	const copyUrl = () =>
		navigator.clipboard.writeText(
			`${window.origin}${paths.event.lottery.prize}?${searchParams.toString()}`
		)

	return (
		<div
			className={`event-lottery-popup copy ${
				data.jackpot ? STICKER_IDS_TO_ZODIAC_SIGNS[data.stickerId] : 'trophy'
			}`}
		>
			{onClose && <div className='icon icon-close' onClick={onClose} />}
			<div className='popup-content'>
				<div className='wrapper'>
					<div className='logo' />
					<div className='title'>{t('Label_Event_YouWin')}</div>
					<div className='info-group'>
						<div className='title'>
							{t(PRIZE_CATEGORY_I18N_KEYS[data.lotteryPrizeCategory])}
						</div>
						<div>
							{t('Label_Event_Round')} {data.roundId}
						</div>
						<div>
							{dayjs(data.startDate).format('YYYY/M/D')}
							{' - '}
							{dayjs(data.endDate).format('YYYY/M/D')}
						</div>
						<div>{data.ticketNo}</div>
					</div>
				</div>
			</div>
			{allowClickToCopy && (
				<button onClick={copyUrl} className='copy'>
					{t('Label_General_CopyLink')}
				</button>
			)}
		</div>
	)
}

export default LotteryPrize
