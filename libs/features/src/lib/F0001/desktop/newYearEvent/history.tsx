import { ICustDrawPrizeData } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNewYearEvent } from '../../hooks'

const History = () => {
	const { t } = useTranslation()
	const [history, setHistory] = useState<ICustDrawPrizeData[]>()
	const { eggTicket, getDrawPrizeList } = useNewYearEvent()

	const getPrizeList = async () => {
		const result = await getDrawPrizeList({
			// eventId.dragonEgg
			eventId: 15,
		})
		if ('data' in result && result.errorCode === 0) {
			const { data } = result
			setHistory(data)
		}
	}

	useEffect(() => {
		getPrizeList()
	}, [eggTicket])

	if (history && history?.length > 0) {
		return (
			<div className='event-history'>
				<div className='event-title'>{t('lbl_DragonEgg_RewardHistory')}</div>
				<div className='event-history-table'>
					<div className='top-title'>
						<div>{t('Label_History_Date')}</div>
						<div>{t('lbl_DragonEgg_EventRewards').toUpperCase()}</div>
					</div>
					<div className='content'>
						{history?.map(({ drawTime, prizeName }, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<div key={`${i}-${drawTime}-${prizeName}`}>
								<div>{dayjs(drawTime).format('MM/DD HH:mm:ss')}</div>
								<div>{prizeName}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
	return null
}

export default History
