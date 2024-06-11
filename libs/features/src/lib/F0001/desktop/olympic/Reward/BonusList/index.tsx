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
			<div className='bouns-title'>{t('Label_Olympic_Select_Bonus')}</div>
			<div className='bouns'>
				<div className='bouns-content'>
					<BonusListItems currencyId={currencyId} />
				</div>
			</div>
		</>
	)
}

export default BonusList
