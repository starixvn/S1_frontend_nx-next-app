import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { filter, isEmpty, some } from 'lodash-es'
import { useInView } from '@nx-next-app/hooks'
import {
	IBasicMsg,
	IGetMsgListResponse,
	useGetMsgListQuery,
	useSetMsgReadMutation,
	useDelMsgMutation,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

type IMessageModeType = 'PaginationMode' | 'InfiniteScrollMode'

const useMessageFetcher = ({ mode }: { mode: IMessageModeType }) => {
	const router = useRouter()
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [selectedMessage, setSelectedMessage] = useState<IBasicMsg[]>([])
	const { msgId, popUpPageNumber } = router.query

	// * 如果不帶 pageSize 是送五筆
	// * 因會有筆數太少不在畫面的錯誤導致 isInView 失效 故會帶超過畫面得筆數
	const DEFAULT_PAGE = 10
	const [pageSize, setPageSize] = useState(
		Number(popUpPageNumber || 1) * DEFAULT_PAGE
	)

	const { ref: msgListRef, isInView } = useInView({})

	const messageMode = {
		mode,
		msgListArgs:
			mode === 'PaginationMode'
				? { pageNumber: currentPage }
				: { pageNumber: 1, pageSize },
	}

	const {
		data: {
			data: msgList = [],
			totalPages = 0,
			rowCount = 0,
		} = {} as IGetMsgListResponse,
		refetch,
	} = useGetMsgListQuery(messageMode.msgListArgs)

	const [setMsgRead] = useSetMsgReadMutation()

	const [delMsg, { isLoading: isDelMsgLoading }] = useDelMsgMutation()

	const onReadSelectedMsg = async () => {
		if (isEmpty(selectedMessage)) return

		try {
			await setMsgRead({ setList: selectedMessage }).unwrap()
			setSelectedMessage([])
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onToggleCheckedAll = () => {
		if (isEmpty(msgList)) return

		if (msgList.length === selectedMessage.length) {
			setSelectedMessage([])
		} else {
			const messageList = msgList.map(({ id, isBatch }) => ({
				msgId: id,
				isBatch,
			}))

			setSelectedMessage(messageList)
		}
	}

	const onPageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	const onClickCheckBox = (id: number, isBatch: boolean) => {
		if (!some(selectedMessage, { msgId: id })) {
			setSelectedMessage(prev => [...prev, { msgId: id, isBatch }])
		} else {
			setSelectedMessage(prev => filter(prev, ({ msgId }) => msgId !== id))
		}
	}

	const onDeleteMessage = () => {
		if (isEmpty(selectedMessage)) return

		const deleteMessage = async () => {
			try {
				await delMsg({ deleteList: selectedMessage }).unwrap()
				setSelectedMessage([])
				closeModal()

				// * 整頁被清除回到第一頁
				if (
					messageMode.mode === 'PaginationMode' &&
					selectedMessage.length === msgList.length
				) {
					setCurrentPage(1)
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		modal.confirm(
			[
				t('Label_General_AreYouSureDelete'),
				t('Label_General_CantBeRestore'),
			] as string[],
			{ onOK: deleteMessage }
		)
	}

	// * 這裡不能綁 getListMsgLoading & setMsgReadLoading
	// * 因這裡綁的 providesTags 比較複雜 會相互影響造成 infinite loop 和 無法展開 context 的問題
	const isLoading = isDelMsgLoading

	useEffect(() => {
		if (messageMode.mode !== 'InfiniteScrollMode') return

		if (isInView) {
			if (pageSize >= rowCount) {
				return
			}
			setPageSize(prev => prev + 5)
		}
	}, [isInView, messageMode.mode])

	useEffect(() => {
		if (messageMode.mode !== 'PaginationMode') return

		if (msgId && popUpPageNumber) {
			setCurrentPage(Number(popUpPageNumber))
		}
	}, [msgId, popUpPageNumber, messageMode.mode])

	const messageModeResponse = {
		paginationMode: {
			currentPage,
			totalPages,
			onPageChange,
		},
		infiniteScrollMode: {
			msgListRef,
		},
		isLoading,
		msgId,
		selectedMessage,
		msgList,
		refetch,
		onReadSelectedMsg,
		onToggleCheckedAll,
		onClickCheckBox,
		onDeleteMessage,
	}

	return { messageModeResponse }
}

export { useMessageFetcher }
