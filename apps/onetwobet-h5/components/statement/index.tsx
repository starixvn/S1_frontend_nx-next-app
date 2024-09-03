import { Loading } from '@nx-next-app/components/H0001'
import { useStatement } from '@nx-next-app/operations'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Select from '../common/select'
import StatementHeader from './header'
import StatementItem from './statementItem'

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
						<div>{t('Label_General_NoData')}</div>
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
