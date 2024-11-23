import { uniqueId } from 'lodash'
import React, { ReactNode } from 'react'

export interface ITableColumns<T> {
	title: string | React.ReactNode
	dataIndex: keyof T
	key: string
	render?: ({ item, index }: { item: T; index: number }) => React.ReactNode
}

export interface ITableProps<T> {
	dataSource: T[]
	columns: ITableColumns<T>[]
	mainClassName?: string
	headerClassName?: string
	bodyClassName?: string
	isShowBodyDivElement?: boolean
	footer?: () => ReactNode
}

const Table = <T,>({
	dataSource,
	columns,
	mainClassName,
	headerClassName,
	bodyClassName,
	isShowBodyDivElement = true,
	footer,
}: ITableProps<T>) => {
	const renderColumns = (item: T, index: number) =>
		columns.map(column => (
			<div className='td' key={column.key}>
				{
					(column.render
						? column.render({ item, index })
						: item[column.dataIndex]) as ReactNode
				}
			</div>
		))
	return (
		<div className={mainClassName}>
			<div className={headerClassName}>
				{columns.map(column => (
					<div className='custom-th' key={column.key}>
						{column.title}
					</div>
				))}
			</div>
			{isShowBodyDivElement ? (
				<>
					<div className={bodyClassName}>
						{dataSource.map((item, index) => (
							<div className='custom-td' key={uniqueId()}>
								{renderColumns(item, index)}
							</div>
						))}
					</div>
					{footer && footer()}
				</>
			) : (
				<>
					{dataSource.map((item, index) => (
						<div className='custom-td' key={uniqueId()}>
							{renderColumns(item, index)}
						</div>
					))}
					{footer && footer()}
				</>
			)}
		</div>
	)
}

export default Table
