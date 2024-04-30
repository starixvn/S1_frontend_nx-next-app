import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Prediction from './Prediction'
import Schedule from './Schedule'

const tabs = [
	{ label: 'Prediction', component: <Prediction /> },
	{ label: 'Schedule', component: <Schedule /> },
]

const Tabs = () => {
	const { t } = useTranslation()
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	return (
		<>
			<div className='euro-tab'>
				{tabs.map(({ label }, index) => (
					<button
						key={label}
						onClick={() => setSelectedTabIndex(index)}
						className={selectedTabIndex === index ? 'active' : undefined}
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
