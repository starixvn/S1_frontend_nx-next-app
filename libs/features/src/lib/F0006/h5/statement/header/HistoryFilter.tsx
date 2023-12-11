import React from 'react'
import { useHistory } from '@nx-next-app/features/F0006/providers'
import { useTranslation } from 'next-i18next'
import DateSelector from '@nx-next-app/components/H0001/dateSelector'

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
					<button>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</div>
	)
}

export default HistoryFilter
