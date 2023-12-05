import { useTranslation } from 'next-i18next'
import { Loading, Select } from '@nx-next-app/components/D0001'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'
import StatementTable from '@nx-next-app/features/F0001/desktop/statement/StatementTable'
import Breadcrumb from '@nx-next-app/components/D0001/breadcrumb'
import Pagination from '@nx-next-app/components/D0001/pagination'

const Statement = () => {
	const { t } = useTranslation()
	const {
		QUICK_PICK_LIST,
		activePeriod,
		activeTab,
		displayColumns,
		breadcrumbs,
		totalPage,
		currentPage,
		loading,
		onPageChange,
		onQuickPickChange,
		onTabChange,
		onSearch,
	} = useStatement()

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_History'>
						{t('Label_General_Statement')}
					</span>
				</div>
				<Breadcrumb
					items={breadcrumbs}
					activeItem={activeTab}
					onClick={onTabChange as (value: string | number | null) => void}
				/>
				<div className='quickSelect'>
					<div>
						<Select
							options={QUICK_PICK_LIST}
							isTranslation
							placeholder='-'
							value={activePeriod}
							defaultValue={activePeriod}
							prefixText={t('Label_History_QuickPick') as string}
							onChange={value => onQuickPickChange(value as number, false)}
						/>
					</div>
					<div className='btnGroup' onClick={onSearch}>
						<button className='btn-check'> {t('Label_General_Submit')}</button>
					</div>
				</div>

				{loading ? <Loading /> : <StatementTable />}

				{displayColumns.length === 0 && (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				)}
				{displayColumns.length > 0 && !loading && (
					<Pagination
						totalPage={totalPage}
						currentPage={currentPage}
						onPageChange={onPageChange}
					/>
				)}
			</div>
		</div>
	)
}

export default Statement
