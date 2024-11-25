import { Select } from '@nx-next-app/components/D0001'
import { useHistory } from '@nx-next-app/features/F0001/providers/history-context'
import DateSelector from 'libs/web/src/components/D0001/dateSelector'
import { useTranslation } from 'next-i18next'

const HistoryFilter = () => {
	const {
		startDate,
		endDate,
		activePeriod,
		QUICK_PICK_LIST,
		onQuickPickChange,
		onStartDateChange,
		onEndDateChange,
		onSearch,
	} = useHistory()
	const { t } = useTranslation()

	return (
		<div className='quickSelect'>
			<div className='inputBox-select input-spacing'>
				<Select
					options={QUICK_PICK_LIST}
					isTranslation
					placeholder='-'
					value={activePeriod}
					defaultValue={activePeriod}
					prefixText={t('Label_History_QuickPick') as string}
					onChange={value => onQuickPickChange(value)}
				/>
			</div>
			<div className='inputBox-blue input-spacing'>
				<span className='txt-blue'>{t('Label_History_From')}</span>
				<div className='rdt'>
					<DateSelector
						selected={startDate}
						onChange={(date: Date | null) => onStartDateChange(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
					/>
				</div>
				<div className='iconModule'>
					<i className='icon icon-calendar-2-line' />
				</div>
			</div>

			<div className='inputBox-blue input-spacing'>
				<span className='txt-blue'>{t('Label_History_To')}</span>
				<div className='rdt'>
					<DateSelector
						selected={endDate}
						onChange={(date: Date | null) => onEndDateChange(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
					/>
				</div>
				<div className='iconModule'>
					<i className='icon icon-calendar-2-line' />
				</div>
			</div>

			<div className='btnGroup'>
				<button className='btn-primary' onClick={onSearch}>
					{t('Label_General_Submit')}
				</button>
			</div>
		</div>
	)
}

export default HistoryFilter
