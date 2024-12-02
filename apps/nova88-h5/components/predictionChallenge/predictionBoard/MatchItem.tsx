import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	dateFormat,
	gmtFormat,
	paths,
	timeFormat,
} from '@nx-next-app/constants'
import { usePredictionChallengeContext } from '@nx-next-app/operations'
import { TPromotionPredictionData } from '@nx-next-app/service'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

type TPredictForm = {
	homeTeamScore: number
	awayTeamScore: number
}

const MatchItem = ({ data }: { data: TPromotionPredictionData }) => {
	const router = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { onPredictScore } = usePredictionChallengeContext()
	const {
		isPredict,
		sportLeaguesTitle,
		battleTime,
		homeTeamPic,
		homeTeamName,
		awayTeamPic,
		awayTeamName,
		matchId,
		custHomeScore,
		custAwayScore,
	} = data
	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)
	const gmt = dayjs(battleTime).format(gmtFormat)
	const { handleSubmit, register } = useForm<TPredictForm>()

	const onSubmit: SubmitHandler<TPredictForm> = async formData => {
		const { homeTeamScore, awayTeamScore } = formData
		await onPredictScore(
			{ matchId, homeTeamScore, awayTeamScore },
			{
				loginCallback: () => {
					router.push(
						`${paths.login.root}?from=${paths.predictionChallenge.root}`
					)
				},
				successCallback: () => {
					modal.info(t('Label_Prediction_Challenge_Success'))
				},
				errorCallback: message => {
					modal.error(message)
				},
			}
		)
	}

	return (
		<div className='swiper-slide'>
			<div className='match-card'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='card-content'>
						<div className='card-top'>
							<div className='match'>{sportLeaguesTitle}</div>
							<div className='time'>
								<span>{date}</span>
								<span>{`${time} ${gmt}`}</span>
							</div>
						</div>
						<div className='card-predict'>
							<div className='team'>
								<div className='team-badge'>
									<div className='team-img'>
										<img src={homeTeamPic} alt='homeTeamPic' />
									</div>
								</div>
								<div className='team-name'>{homeTeamName}</div>
								<div className='number-box'>
									{isPredict ? (
										<div className='number'>{custHomeScore}</div>
									) : (
										<input
											{...register('homeTeamScore', {
												required: {
													value: true,
													message: '',
												},
											})}
											type='number'
											placeholder={t(
												'Label_Prediction_Challenge_ScorePrediction'
											)}
											onWheel={e => (e.target as HTMLInputElement).blur()}
										/>
									)}
								</div>
							</div>
							<div
								className={classNames('center-txt', {
									active: isPredict,
								})}
							>
								VS
							</div>
							<div className='team'>
								<div className='team-badge'>
									<div className='team-img'>
										<img src={awayTeamPic} alt='awayTeamPic' />
									</div>
								</div>
								<div className='team-name'>{awayTeamName}</div>
								<div className='number-box'>
									{isPredict ? (
										<div className='number'>{custAwayScore}</div>
									) : (
										<input
											{...register('awayTeamScore', {
												required: {
													value: true,
													message: '',
												},
											})}
											type='number'
											placeholder={t(
												'Label_Prediction_Challenge_ScorePrediction'
											)}
											onWheel={e => (e.target as HTMLInputElement).blur()}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					<button
						className={classNames('btn-submit', {
							active: isPredict,
						})}
						type='submit'
						disabled={isPredict}
					>
						{isPredict
							? t('Label_Prediction_Challenge_Predicted')
							: t('Label_General_Submit')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default MatchItem
