import { Select } from '@nx-next-app/components/D0006'
import { useHistory } from '@nx-next-app/features/F0006/providers/history-context'
import DateSelector from 'libs/web/src/components/D0006/dateSelector'
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
			<div>
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
			<div className='inputBox-blue'>
				<i className='txt-blue'>{t('Label_History_From')}</i>
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
					<i className='icon icon-calendar' />
				</div>
			</div>

			<div className='inputBox-blue'>
				<i className='txt-blue'>{t('Label_History_To')}</i>
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
