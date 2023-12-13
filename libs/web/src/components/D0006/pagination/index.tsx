import React from 'react'
import dynamic from 'next/dynamic'
import { ReactPaginateProps } from 'react-paginate'

export const ReactPagination = dynamic(() => import('react-paginate'), {
	ssr: false,
})

export interface IPaginationProps {
	totalPage: number
	currentPage: number
	onPageChange: (selectedItem: { selected: number }) => void
}

const defaultReactPaginateProps = {
	className: 'pagination',
	nextLabel: '>',
	previousLabel: '<',
	pageRangeDisplayed: 5,
	marginPagesDisplayed: 1,
	renderOnZeroPageCount: null as ReactPaginateProps['renderOnZeroPageCount'],
	breakLinkClassName: 'pagination-item',
	activeLinkClassName: 'active',
}

const Pagination = ({
	totalPage,
	currentPage,
	onPageChange,
	...rest
}: IPaginationProps) => {
	const config: ReactPaginateProps = {
		...defaultReactPaginateProps,
		pageCount: totalPage,
		forcePage: currentPage - 1,
		onPageChange,
		...rest,
	}

	return <ReactPagination {...config} />
}

export default Pagination
