import { useInView } from '@nx-next-app/hooks'
import {
	IBasicMsg,
	IGetMsgListResponse,
	useDelMsgMutation,
	useGetMsgListQuery,
	useSetMsgReadMutation,
} from '@nx-next-app/service'
import { filter, isEmpty, some } from 'lodash-es'
import { useEffect, useState } from 'react'

interface PersonMessageProps {
	mode: 'PaginationMode' | 'InfiniteScrollMode'
	id?: number
	pageNumber?: number
	errorCallback?: (message: string) => void
}

const usePersonalMessage = (props: PersonMessageProps) => {
	const { mode, id, pageNumber = 1, errorCallback } = props
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [selectedMessage, setSelectedMessage] = useState<IBasicMsg[]>([])

	// * 如果不帶 pageSize 是送五筆
	// * 因會有筆數太少不在畫面的錯誤導致 isInView 失效 故會帶超過畫面得筆數
	const DEFAULT_PAGE = 10
	const [pageSize, setPageSize] = useState(pageNumber * DEFAULT_PAGE)
	const { ref: msgListRef, isInView } = useInView({})

	const {
		isLoading,
		data: {
			data: msgList = [],
			totalPages = 0,
			rowCount = 0,
		} = {} as IGetMsgListResponse,
		refetch,
	} = useGetMsgListQuery(
		mode === 'PaginationMode'
			? { pageNumber: currentPage }
			: { pageNumber: 1, pageSize }
	)
	const [setMsgRead] = useSetMsgReadMutation()
	const [delMsg] = useDelMsgMutation()

	useEffect(() => {
		if (mode === 'PaginationMode' && isInView) {
			if (pageSize >= rowCount) {
				return
			}
			setPageSize(prev => prev + 5)
		}
	}, [isInView, mode])

	useEffect(() => {
		if (mode === 'InfiniteScrollMode' && id && pageNumber) {
			setCurrentPage(Number(pageNumber))
		}
	}, [id, pageNumber, mode])

	const handleReadSelectedMsg = async () => {
		if (isEmpty(selectedMessage)) return

		try {
			await setMsgRead({ setList: selectedMessage }).unwrap()
			setSelectedMessage([])
		} catch (error) {
			if (errorCallback) {
				errorCallback((error as Error).message)
			}
		}
	}

	const handleDeleteMessage = async () => {
		if (isEmpty(selectedMessage)) return

		try {
			await delMsg({ deleteList: selectedMessage }).unwrap()
			setSelectedMessage([])
			// * 整頁被清除回到第一頁
			if (
				mode === 'PaginationMode' &&
				selectedMessage.length === msgList.length
			) {
				setCurrentPage(1)
			}
		} catch (error) {
			if (errorCallback) {
				errorCallback((error as Error).message)
			}
		}
	}

	const handleToggleAll = () => {
		if (isEmpty(msgList)) return

		msgList.length === selectedMessage.length
			? setSelectedMessage([])
			: setSelectedMessage(
					msgList.map(item => ({
						msgId: item.id,
						isBatch: item.isBatch,
					}))
			  )
	}

	const handleToggle = (id: number, isBatch: boolean) => {
		some(selectedMessage, { msgId: id })
			? setSelectedMessage(prev => filter(prev, ({ msgId }) => msgId !== id))
			: setSelectedMessage(prev => [...prev, { msgId: id, isBatch }])
	}

	const onPageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	return {
		isLoading,
		msgList,
		selectedMessage,
		refetch,
		handleReadSelectedMsg,
		handleDeleteMessage,
		handleToggle,
		handleToggleAll,
		paginationMode: {
			currentPage,
			totalPages,
			onPageChange,
		},
		infiniteScrollMode: {
			msgListRef,
		},
	}
}

export { usePersonalMessage }
