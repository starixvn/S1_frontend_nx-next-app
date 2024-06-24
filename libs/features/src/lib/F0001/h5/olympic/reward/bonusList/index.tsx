import React from 'react'
import { useTranslation } from 'next-i18next'
import BonusListItems from './BonusListItems'

const BonusList = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='tasks-title'>{t('Label_Olympic_Select_Bonus')}</div>
			<div className='bouns'>
				<BonusListItems />
			</div>
		</>
	)
}

export default BonusList
