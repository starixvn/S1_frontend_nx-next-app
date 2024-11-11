import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PRIZE_CATEGORY_I18N_KEYS } from '@nx-next-app/constants'
import { useGetCustLotteryHistoryWinnerListQuery } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const PrizeModal = dynamic(() => import('../modals/PrizeModal'), { ssr: false })

const LotteryResults = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { data: { data: history } = {} } =
		useGetCustLotteryHistoryWinnerListQuery(null)

	return (
		<div className='tab-content-result'>
			<div className='result-list'>
				{history?.map(data => (
					<div key={data.roundId} className='result-item'>
						<div>{data.roundId}</div>
						<div className='info'>
							<div className='date'>
								{dayjs(data.startDate).format('D MMM YYYY')}
								{' - '}
								{dayjs(data.endDate).format('D MMM YYYY')}
							</div>
							<div>
								{t(PRIZE_CATEGORY_I18N_KEYS[data.lotteryPrizeCategory])}
							</div>
						</div>
						<div className='share'>
							<div
								className='icon share'
								onClick={() =>
									modal.open(<PrizeModal data={data} />, {
										className: 'event-lottery-popup-mask',
									})
								}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default LotteryResults
