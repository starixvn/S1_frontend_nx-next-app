import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useGetDepositInfoRecentListQuery,
	useSetDepositCancelMutation,
	useUploadReceiptMutation,
} from '@nx-next-app/service'

/**
 * 處理近期存款紀錄的狀態管理
 */
const useDepositRecentHistory = () => {
	const { modal } = useGlobalModal()
	const [uploadReceipt, { isLoading: isUploadReceiptLoading }] =
		useUploadReceiptMutation()

	const {
		data: { data: depositInfoRecentList = [] } = {},
		refetch: refetchDepositInfoRecentList,
	} = useGetDepositInfoRecentListQuery()

	const [setDepositCancel, { isLoading: isSetDepositCancelLoading }] =
		useSetDepositCancelMutation()

	// * 上傳指定存款單之收據圖片
	const onUploadReceipt = async ({
		transId,
		receipt,
	}: {
		transId?: string
		receipt: string
	}) => {
		try {
			if (transId) {
				await uploadReceipt({ transId, receipt }).unwrap()
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// * 取消存款單
	const onCancelDepositSlip = async (transId: string) => {
		await setDepositCancel({ transId }).unwrap()
	}

	const loading = isUploadReceiptLoading || isSetDepositCancelLoading

	return {
		loading,
		depositInfoRecentList,
		refetchDepositInfoRecentList,
		onUploadReceipt,
		onCancelDepositSlip,
	}
}

export { useDepositRecentHistory }
