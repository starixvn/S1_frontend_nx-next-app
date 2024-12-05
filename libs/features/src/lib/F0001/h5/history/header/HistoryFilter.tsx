import DateSelector from '@nx-next-app/components/H0001/dateSelector'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const HistoryFilter = () => {
	const { startDate, endDate, onStartDateChange, onEndDateChange, onSearch } =
		useHistory()
	const { t } = useTranslation()

	return (
		<div className='functionList'>
			<div className='infoModule parts'>
				<div className='inputBox-blue'>
					<i className='icon icon-calendar-2-line' />
					<DateSelector
						selected={startDate}
						onChange={(date: Date | null) => onStartDateChange(date)}
					/>
				</div>
				<div className='inputBox-blue'>
					<i className='icon icon-calendar-2-line' />
					<DateSelector
						selected={endDate}
						onChange={(date: Date | null) => onEndDateChange(date)}
					/>
				</div>
				<div className='btnGroup' onClick={onSearch}>
					<button className='btn-primary'>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</div>
	)
}

export default HistoryFilter
