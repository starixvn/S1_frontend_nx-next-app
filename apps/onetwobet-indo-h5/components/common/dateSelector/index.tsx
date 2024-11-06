import DatePicker from 'react-datepicker'

const DateSelector = ({
	selected,
	onChange,
	...restProps
}: {
	selected: Date | null
	onChange: (newDate: Date | null) => void
	maxDate?: Date
	placeholderText?: string
	closeOnScroll?: boolean
	showDisabledMonthNavigation?: boolean
	showYearDropdown?: boolean
	selectsStart?: boolean
	selectsEnd?: boolean
	startDate?: Date | null
	endDate?: Date | null
	minDate?: Date | null
}) => {
	function range(start: number, end: number, step: number): number[] {
		const result = []
		for (let i = start; i <= end; i += step) {
			result.push(i)
		}
		return result
	}
	const years = range(
		new Date().getFullYear() - 100,
		new Date().getFullYear() + 1,
		1
	)
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	return (
		<DatePicker
			selected={selected}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled,
			}) => (
				<div
					style={{
						margin: 10,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<button
						style={{ padding: '0 10px', fontWeight: 'bold', color: 'black' }}
						onClick={decreaseMonth}
						disabled={prevMonthButtonDisabled}
						type='button'
					>
						{'<'}
					</button>
					<select
						value={date.getFullYear()}
						onChange={({ target: { value } }) => changeYear(value as any)}
					>
						{years.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						value={months[date.getUTCMonth()]}
						onChange={({ target: { value } }) =>
							changeMonth(months.indexOf(value))
						}
					>
						{months.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<button
						style={{ padding: '0 10px', fontWeight: 'bold', color: 'black' }}
						onClick={increaseMonth}
						disabled={nextMonthButtonDisabled}
						type='button'
					>
						{'>'}
					</button>
				</div>
			)}
			onChange={(date: Date) => onChange(date)}
			{...restProps}
		/>
	)
}

export default DateSelector
