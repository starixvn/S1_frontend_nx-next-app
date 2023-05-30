/* eslint-disable no-console */
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Select, { ISelectProps } from '..'

// * 只用在該頁面的話即只存放在該頁面資料夾中
export const FLAG_PREFIX_ICON_BY_CURRENCIES: { [key: number]: string } = {
	2: 'ch',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	61: 'in',
	72: 'kh',
	74: 'bd',
}

const BasicWithIcon = () => {
	const { t } = useTranslation()

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
	].map(item => ({
		// * 再使用之前將資料處理好再往下傳
		...item,
		prefixOptionIcon: (
			<div
				className={classNames(
					'flag',
					FLAG_PREFIX_ICON_BY_CURRENCIES[item.value]
				)}
			/>
		),
	}))
	return (
		<Select
			options={options}
			placeholder='test'
			prefixIcon={<i className='icon icon-coin-dollar txt-blue' />}
			onChange={v => console.log({ v })}
		/>
	)
}

export default BasicWithIcon
