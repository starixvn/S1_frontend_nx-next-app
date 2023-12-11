/* eslint-disable no-console */

import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import Select, { ISelectProps } from '..'

// * control component
const SelectDemoWithControlValueDemo = () => {
	const { t } = useTranslation()
	const [value, setValue] = useState<string | number | undefined>()

	const options: ISelectProps['options'] = [
		{
			value: 2,
			label: t('Currency_2'),
		},
		{
			value: 3,
			label: t('Currency_3'),
		},
		{
			value: 4,
			label: t('Currency_4'),
		},
		{
			value: 13,
			label: t('Currency_13'),
		},
		{
			value: 15,
			label: t('Currency_15'),
		},
		{
			value: 61,
			label: t('Currency_61'),
		},
		{
			value: 74,
			label: t('Currency_74'),
		},
		{
			value: 72,
			label: t('Currency_72'),
		},
		{
			value: 999,
			label: t('Currency_999'),
		},
	]

	return (
		<Select
			value={value}
			options={options}
			placeholder='test'
			prefixIcon={<i className='icon icon-coin-dollar txt-blue' />}
			onChange={value => setValue(value)}
		/>
	)
}

export { SelectDemoWithControlValueDemo }
