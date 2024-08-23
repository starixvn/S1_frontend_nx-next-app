import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import LotteryConditions from './LotteryConditions'
import LotteryHistory from './LotteryHistory'
import LotteryResults from './LotteryResults'

const LotteryBottomSection = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const { t } = useTranslation()
	const tabs = [
		{ label: t('Label_General_Conditions'), content: <LotteryConditions /> },
		{ label: t('Label_General_History'), content: <LotteryHistory /> },
		{ label: t('Label_Event_MyResults'), content: <LotteryResults /> },
	]

	return (
		<div className='tab-group'>
			<ul className='nav nav-tabs'>
				{tabs.map(({ label }, index) => (
					<li key={label} className='nav-item'>
						<a
							onClick={() => setTabIndex(index)}
							className={`nav-link ${index === tabIndex ? 'active' : ''}`}
						>
							{label}
						</a>
					</li>
				))}
			</ul>
			<div className='tab-content'>
				{tabs.map(({ label, content }, index) => (
					<div
						key={label}
						className={index === tabIndex ? undefined : 'd-none'}
					>
						{content}
					</div>
				))}
			</div>
		</div>
	)
}

export default LotteryBottomSection
