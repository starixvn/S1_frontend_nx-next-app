import React from 'react'
import { useTranslation } from 'next-i18next'
import BonusListItems from './BonusListItems'

interface IBonusListProps {
	currencyId: number
}
const BonusList = ({ currencyId }: IBonusListProps) => {
	const { t } = useTranslation()

	return (
		<>
			<div className='tasks-title'>{t('Label_Olympic_Select_Bonus')}</div>
			<div className='bouns'>
				<BonusListItems currencyId={currencyId} />
			</div>
		</>
	)
}

export default BonusList
