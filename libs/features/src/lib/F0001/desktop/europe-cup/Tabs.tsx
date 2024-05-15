import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import Prediction from './Prediction'
import Schedule from './Schedule'
import { useEuropeCup } from '../../hooks/useEuropeCup'

const Tabs = () => {
	const { t } = useTranslation()
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)

	const europeCupProps = useEuropeCup()

	const tabs = [
		{
			label: 'Prediction',
			component: <Prediction europeCupProps={europeCupProps} />,
		},
		{
			label: 'Schedule',
			component: <Schedule europeCupProps={europeCupProps} />,
		},
	]

	return (
		<>
			<div className='euro-tab'>
				{tabs.map(({ label }, index) => (
					<button
						key={label}
						onClick={() => setSelectedTabIndex(index)}
						className={classNames({ active: selectedTabIndex === index })}
					>
						{t(`Label_EuropeCup_${label}`)}
					</button>
				))}
			</div>
			{tabs[selectedTabIndex].component}
		</>
	)
}

export default Tabs
