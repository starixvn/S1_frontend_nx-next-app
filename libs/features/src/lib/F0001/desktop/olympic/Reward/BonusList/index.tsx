import React from 'react'
import { useTranslation } from 'next-i18next'
import BonusListItems from './BonusListItems'

const BonusList = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='bouns-title'>{t('Label_Olympic_Select_Bonus')}</div>
			<div className='bouns'>
				<div className='bouns-content'>
					<BonusListItems />
				</div>
			</div>
		</>
	)
}

export default BonusList
