import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface ITurnoverModalProps {
	turnover: number
	rollover: number
	percentage: number
}

const TurnoverModal = ({
	turnover,
	rollover,
	percentage,
}: ITurnoverModalProps) => {
	const { t } = useTranslation()

	const { closeModal } = useGlobalModal()

	const {
		userInfo: { currencyName },
	} = useAuth()

	return (
		<div className='pop'>
			<div className='popTit'>
				<div className='icon icon-close' onClick={closeModal} />
				{t('Label_General_ImportantNote')}
			</div>
			<div className='popTxt'>
				<div className='account'>
					<div className='info'>
						<div>{t('Label_TransferFunds_TurnoverAccmulateHint')}</div>
						<div className='title'>
							{t('Label_TransferFunds_TurnoverAccumulated')}
						</div>
						<div>
							<span className='text-org'>
								{currencyName} ${numFormatToDigits(turnover)} /{' '}
								{t('Label_General_Req')}. {currencyName}{' '}
								{numFormatToDigits(rollover)}
							</span>
						</div>
					</div>
					<div className='progressBarModule'>
						<div className='percentage'>{percentage} %</div>
						<div className='bar'>
							<div className='progress' style={{ width: `${percentage}%` }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { TurnoverModal }
