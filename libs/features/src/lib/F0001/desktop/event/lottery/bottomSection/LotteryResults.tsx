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
				<div className='result-head'>
					<div>{t('Label_Event_Round')}</div>
					<div>{t('Label_General_Day')}</div>
					<div>{t('Label_Event_Prize')}</div>
					<div>{t('Label_General_Share')}</div>
				</div>
				{history?.map(data => (
					<div key={data.roundId} className='result-item'>
						<div>{data.roundId}</div>
						<div>
							{dayjs(data.startDate).format('YYYY/M/D')}
							{' - '}
							{dayjs(data.endDate).format('YYYY/M/D')}
						</div>
						<div>{t(PRIZE_CATEGORY_I18N_KEYS[data.lotteryPrizeCategory])}</div>
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
			{/* pagination */}
			{/* <div className='pagination'>
				<a href=''>❮</a>
				<a href='' className='active'>
					1
				</a>
				<a href=''>2</a>
				<a href=''>3</a>
				<a href=''>4</a>
				<a href=''>5</a>
				<a href=''>6</a>
				<a href=''>7</a>
				<a href=''>❯</a>
			</div> */}
		</div>
	)
}

export default LotteryResults
