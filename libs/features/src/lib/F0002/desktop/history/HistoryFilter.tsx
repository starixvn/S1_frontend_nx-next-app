import React from 'react'
import { Select } from '@nx-next-app/components/D0002'
import { useTranslation } from 'next-i18next'
import { useHistory } from '@nx-next-app/features/F0002/providers/history-context'
import DateSelector from 'libs/web/src/components/D0002/dateSelector'

const HistoryFilter = () => {
	const {
		startDate,
		endDate,
		activeTab,
		QUICK_PICK_LIST,
		onQuickPickChange,
		onStartDateChange,
		onEndDateChange,
		onSearch,
	} = useHistory()
	const { t } = useTranslation()

	return (
		<div className='quickSelect'>
			<div>
				<Select
					options={QUICK_PICK_LIST}
					isTranslation
					placeholder='-'
					value={activeTab}
					defaultValue={activeTab}
					prefixText={t('Label_History_QuickPick') as string}
					onChange={value => onQuickPickChange(value)}
				/>
			</div>
			<div className='inputBox-blue'>
				<i className='txt-blue'>{t('Label_History_From')}</i>
				<DateSelector
					selected={startDate}
					onChange={(date: Date | null) => onStartDateChange(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
				<div className='iconModule'>
					<i className='icon icon-calendar' />
				</div>
			</div>

			<div className='inputBox-blue'>
				<i className='txt-blue'>{t('Label_History_To')}</i>
				<DateSelector
					selected={endDate}
					onChange={(date: Date | null) => onEndDateChange(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
				<div className='iconModule'>
					<i className='icon icon-calendar' />
				</div>
			</div>

			<div className='btnGroup'>
				<button className='btn-check' onClick={onSearch}>
					{t('Label_General_Submit')}
				</button>
			</div>
		</div>
	)
}

export default HistoryFilter
