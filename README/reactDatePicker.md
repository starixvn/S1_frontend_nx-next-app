- 加入 inputBox 的樣式元件

```tsx
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const App = () => {
	const [startDate, setStartDate] = useState(new Date())

	return (
		<div className='inputBox-blue'>
			<ReactDatePicker
				selected={startDate}
				onChange={date => {
					setStartDate(date)
				}}
			/>

			<div className='iconModule'>
				<i className='icon icon-calendar' />
			</div>

			<div className='tip active txt-red'>Please fill in the birth date</div>
		</div>
	)
}
```
