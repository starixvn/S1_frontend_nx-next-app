import { Loading, Select } from '@nx-next-app/components/D0001'
import Breadcrumb from '@nx-next-app/components/D0001/breadcrumb'
import Pagination from '@nx-next-app/components/D0001/pagination'
import StatementTable from '@nx-next-app/features/F0001/desktop/statement/StatementTable'
import { WrapperStament } from '@nx-next-app/features/F0001/desktop/statement/styles'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'
import { useTranslation } from 'next-i18next'

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
			<WrapperStament>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-file-text-fill' />
							{t('Label_General_Statement')}
						</div>
					</div>
					<div className='inside-body'>
						<Breadcrumb
							items={breadcrumbs}
							activeItem={activeTab}
							onClick={onTabChange as (value: string | number | null) => void}
						/>
						<div className='quickSelect'>
							<Select
								options={QUICK_PICK_LIST}
								isTranslation
								placeholder='-'
								value={activePeriod}
								defaultValue={activePeriod}
								prefixText={t('Label_History_QuickPick') as string}
								onChange={value => onQuickPickChange(value as number, false)}
							/>
							<div className='btnGroup' onClick={onSearch}>
								<button className='btn-primary'>
									{' '}
									{t('Label_General_Submit')}
								</button>
							</div>
						</div>

						<div className='wrapper-table'>
							{loading ? <Loading /> : <StatementTable />}

							{displayColumns.length === 0 && (
								<div className='custom-nodata'>
									<i className='icon icon-file-damage-fill' />
									<div>{t('Label_General_NoData')}</div>
								</div>
							)}
						</div>
						{displayColumns.length > 0 && !loading && (
							<Pagination
								totalPage={totalPage}
								currentPage={currentPage}
								onPageChange={onPageChange}
							/>
						)}
					</div>
				</div>
			</WrapperStament>
		</div>
	)
}

export default Statement
