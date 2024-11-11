import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

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
			<div className='Success active'>
				<div className='icon icon-icon32px_notification' />
				<div className='title'>{t('Label_General_Information')}</div>

				<div className='txt-lightgray'>
					{t('Label_TransferFunds_TurnoverAccmulateHint')}
				</div>
				<div className='progressBarModule'>
					<div className='bounsName'>
						{t('Label_TransferFunds_TurnoverAccumulated')}
					</div>
					<div className='turnover'>
						<span>
							{currencyName} {numFormatToDigits(turnover)}
						</span>{' '}
						/ ({t('Label_General_Req')}. {currencyName}{' '}
						{numFormatToDigits(rollover)})
					</div>
					<div className='progressBar'>
						<div className='bar'>
							<div className='progress' style={{ width: `${percentage}%` }} />
						</div>
						<div className='percentage'>{percentage} %</div>
					</div>
				</div>
				<div className='btnGroup'>
					<button className='btn-check' type='button' onClick={closeModal}>
						OK
					</button>
				</div>
			</div>
		</div>
	)
}

export { TurnoverModal }
