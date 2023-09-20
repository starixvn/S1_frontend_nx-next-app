import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import TransferHistoryTable from '@nx-next-app/components/D0001/table/historyTable/TransferHistoryTable'
import { Loading } from '@nx-next-app/components/D0001'
import { Transfer } from './Transfer'
import { WalletList } from './WalletList'
import { AutoTransfer } from './AutoTransfer'
import { useTransferFunds } from '../../providers'

const TransferFunds = () => {
	const { t } = useTranslation()
	const { loading, transferHistory, handleGetTransferRecent } =
		useTransferFunds()

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

					{loading ? (
						<Loading />
					) : (
						<>
							<WalletList />
							<Transfer />
						</>
					)}
				</div>

				<TransferHistoryTable
					dataSource={transferHistory}
					onReload={handleGetTransferRecent}
				/>
				<Link href={paths.history.root} passHref>
					<a className='icon icon-books' />
				</Link>
			</div>
		</div>
	)
}
export default TransferFunds
