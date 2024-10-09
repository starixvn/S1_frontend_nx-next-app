import { Loading } from '@12b-h5/components/common'
import Select from '@12b-h5/components/common/select'
import { useStatement } from '@nx-next-app/operations'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
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
