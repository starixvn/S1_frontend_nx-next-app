import React, { ReactNode } from 'react'
import { uniqueId } from 'lodash'

export interface ITableColumns<T> {
	title: string | React.ReactNode
	dataIndex: keyof T
	key: string
	render?: ({ item, index }: { item: T; index: number }) => React.ReactNode
}

export interface ITableProps<T> {
	dataSource: T[]
	columns: ITableColumns<T>[]
	className?: string
}

const Table = <T,>({ dataSource, columns, className }: ITableProps<T>) => {
	return (
		<div className={`list ${className}`}>
			<div className='listHeader'>
				{columns.map(column => (
					<div key={column.key}>{column.title}</div>
				))}
			</div>
			<div className='listBody'>
				{dataSource.map((item, index) => (
					<div key={uniqueId()}>
						{columns.map(column => (
							<div key={column.key}>
								{
									(column.render
										? column.render({ item, index })
										: item[column.dataIndex]) as ReactNode
								}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Table
