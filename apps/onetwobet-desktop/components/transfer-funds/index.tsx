import { Loading } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { useTransferFunds } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import TransferHistoryTable from '../table/historyTable/TransferHistoryTable'
import { AutoTransfer } from './AutoTransfer'
import { Transfer } from './Transfer'
import { WalletList } from './WalletList'

const TransferFunds = () => {
	const { t } = useTranslation()
	const {
		loading,
		isTransferLoading,
		transferHistory,
		handleGetTransferRecent,
	} = useTransferFunds()

	if (loading) return <Loading />

	return (
		<div className='rightModule'>
			<div className='rightModule'>
				<div className='infoModule'>
					<div className='inside-title'>
						<span className='icon icon-icon32px_Funds-transfer'>
							{t('Label_General_TransferFunds')}
						</span>
						<AutoTransfer />
					</div>

					{isTransferLoading ? (
						<Loading />
					) : (
						<>
							<WalletList />
							<Transfer />
						</>
					)}
				</div>
				{isTransferLoading ? (
					<Loading />
				) : (
					<>
						<TransferHistoryTable
							dataSource={transferHistory}
							onReload={handleGetTransferRecent}
						/>
						<Link href={paths.history.root} passHref>
							<a className='icon icon-books' />
						</Link>
					</>
				)}
			</div>
		</div>
	)
}
export default TransferFunds
