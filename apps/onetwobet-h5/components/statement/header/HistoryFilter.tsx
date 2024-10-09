import { DateSelector } from '@12b-h5/components/common'
import { useHistory } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const HistoryFilter = () => {
	const { startDate, endDate, onStartDateChange, onEndDateChange, onSearch } =
		useHistory()
	const { t } = useTranslation()

	return (
		<div className='functionList'>
			<div className='infoModule parts'>
				<div className='inputBox'>
					<i className='icon icon-calendar' />
					<DateSelector
						selected={startDate}
						onChange={(date: Date | null) => onStartDateChange(date)}
					/>
				</div>
				<i className='icon icon-icon32px_1' />
				<div className='inputBox'>
					<i className='icon icon-calendar' />
					<DateSelector
						selected={endDate}
						onChange={(date: Date | null) => onEndDateChange(date)}
					/>
				</div>
				<div className='btn-group' onClick={onSearch}>
					<button className='primary'>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</div>
	)
}

export default HistoryFilter
