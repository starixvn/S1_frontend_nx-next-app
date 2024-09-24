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

const Pagination = (props: IPaginationProps) => {
	const { totalPage, currentPage, onPageChange } = props
	const config: ReactPaginateProps = {
		className: 'pagination',
		nextLabel: '>',
		previousLabel: '<',
		pageRangeDisplayed: 5,
		marginPagesDisplayed: 1,
		renderOnZeroPageCount: null as ReactPaginateProps['renderOnZeroPageCount'],
		breakLinkClassName: 'pagination-item',
		activeLinkClassName: 'active',
		pageCount: totalPage,
		forcePage: currentPage - 1,
		onPageChange,
	}

	return <ReactPagination {...config} />
}

export default Pagination
