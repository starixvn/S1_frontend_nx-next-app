/* eslint-disable no-console */

import Select, { ISelectProps } from '..'

const SelectWithFilter = () => {
	const options: ISelectProps['options'] = [
		{
			value: 2,
			label: 'label 2',
		},
		{
			value: 3,
			label: 'label 3',
		},
		{
			value: 4,
			label: 'label 4',
		},
		{
			value: 13,
			label: 'label 13',
		},
		{
			value: 15,
			label: 'label 15',
		},
		{
			value: 61,
			label: 'label 61',
		},
		{
			value: 74,
			label: 'label 74',
		},
		{
			value: 72,
			label: 'label 72',
		},
	]

	return (
		<Select
			showSearch
			options={options}
			placeholder='test'
			prefixIcon={<i className='icon icon-coin-dollar txt-blue' />}
			onChange={v => console.log({ v })}
		/>
	)
}

export { SelectWithFilter }
