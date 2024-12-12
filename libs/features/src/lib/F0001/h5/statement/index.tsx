import { Loading, Select } from '@nx-next-app/components/H0001'
import { NoData } from '@nx-next-app/features/F0001/h5/common/NoData'
import StatementHeader from '@nx-next-app/features/F0001/h5/statement/header'
import StatementItem from '@nx-next-app/features/F0001/h5/statement/statementItem'
import {
	StatementContainer,
	StatementWrapperInfoList,
} from '@nx-next-app/features/F0001/h5/statement/styles'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const Statement = () => {
	const { t } = useTranslation()
	const { displayColumns, totalPage, currentPage, loading, onPageChange } =
		useStatement()

	if (loading) {
		return <Loading />
	}

	return (
		<StatementContainer>
			<StatementHeader />
			{displayColumns.length === 0 ? (
				<NoData customClass='no-border' />
			) : (
				<StatementWrapperInfoList>
					<div className='group-dropdown'>
						<div className='inputBox-blue'>
							<div className='dropdown'>
								<Select
									options={Array.from({ length: totalPage }, (_, index) => ({
										value: index,
										label: index + 1,
									}))}
									placeholder='-'
									value={currentPage - 1}
									onChange={value =>
										onPageChange({ selected: value as number })
									}
								/>
							</div>
						</div>
					</div>

					<div className='recent active'>
						<div className='infoList'>
							{displayColumns.map(item => (
								<StatementItem key={uniqueId()} {...item} />
							))}
						</div>
					</div>
				</StatementWrapperInfoList>
			)}
		</StatementContainer>
	)
}

export default Statement
