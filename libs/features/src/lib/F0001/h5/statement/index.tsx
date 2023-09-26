import React from 'react'
import StatementHeader from '@nx-next-app/features/F0001/h5/statement/header'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'
import StatementItem from '@nx-next-app/features/F0001/h5/statement/statementItem'
import { uniqueId } from 'lodash-es'
import { Loading, Select } from '@nx-next-app/components/H0001'
import { useTranslation } from 'next-i18next'

const Statement = () => {
	const { t } = useTranslation()
	const { displayColumns, totalPage, currentPage, loading, onPageChange } =
		useStatement()

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<StatementHeader />
			<main className='main history'>
				{displayColumns.length === 0 ? (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_Nodata')}</div>
					</div>
				) : (
					<>
						<Select
							options={Array.from({ length: totalPage }, (_, index) => ({
								value: index + 1,
								label: index + 1,
							}))}
							placeholder='-'
							value={currentPage}
							onChange={value => onPageChange({ selected: value as number })}
						/>
						<div className='recent active'>
							<div className='infoList'>
								{displayColumns.map(item => (
									<StatementItem key={uniqueId()} {...item} />
								))}
							</div>
						</div>
					</>
				)}
			</main>
		</>
	)
}

export default Statement
