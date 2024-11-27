import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { dateFormat, gmtFormat, timeFormat } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const PredictionChallengeTermsModal = dynamic(
	() => import('../modal/PredictionChallengeTermsModal'),
	{ ssr: false }
)

const PredictionResult = () => {
	const {
		userInfo: { currencyName },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { predictResult } = usePredictionChallengeContext()

	const {
		bonusCode = '',
		bonus = 0,
		winners = [],
		homeTeamName = '',
		awayTeamName = '',
		battleTime = '',
	} = predictResult ?? {}

	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)
	const gmt = dayjs(battleTime).format(gmtFormat)
	const winnerList = [...winners, '-', '-', '-', '-', '-'].slice(0, 5)

	const onOpenTermsConditionsModal = () => {
		modal.open(<PredictionChallengeTermsModal bonusCode={bonusCode} />, {
			className: 'prediction-result',
		})
	}

	return (
		<div className='prediction-result'>
			<div className='result-title'>{t('Label_LeaderBoard_Result')}</div>
			<div className='result-content'>
				<div className='result-top'>
					<div className='sub-caption'>
						{predictResult && (
							<>
								<div className='time'>{`${date} ${time} ${gmt}`}</div>
								<div className='title'>{`${homeTeamName} VS ${awayTeamName}`}</div>
							</>
						)}
					</div>
					<button onClick={onOpenTermsConditionsModal}>
						{t('Label_TermsConditions')}
					</button>
				</div>
				<div className='result-bottom'>
					<div className='prize-money'>
						<span>{t('Label_Event_Prize')}</span>
						<span className='amount'>{`${currencyName} ${bonus}`}</span>
					</div>
					<div className='user-content'>
						<div className='title'>
							{t('Label_Prediction_Challenge_Winner_Title')}
						</div>
						<div className='user-list'>
							<ul>
								{winnerList.map((winner, index) => (
									// eslint-disable-next-line react/no-array-index-key
									<li key={`${winner}-${index}`}>{winner}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PredictionResult
