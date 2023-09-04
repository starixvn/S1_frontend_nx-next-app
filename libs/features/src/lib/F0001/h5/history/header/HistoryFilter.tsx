import React from 'react'
import DatePicker from 'react-datepicker'
import { useHistory } from '@nx-next-app/features/F0001/providers'
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
					<DatePicker
						selected={startDate}
						onChange={(date: Date) => onStartDateChange(date)}
					/>
				</div>
				<i className='icon icon-icon32px_1' />
				<div className='inputBox'>
					<i className='icon icon-calendar' />
					<DatePicker
						selected={endDate}
						onChange={(date: Date) => onEndDateChange(date)}
					/>
				</div>
				<div className='btn-group' onClick={onSearch}>
					<button>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</div>
	)
}

export default HistoryFilter
