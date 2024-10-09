import { Header, Loading } from '@12b-h5/components/common'
import { paths } from '@nx-next-app/constants'
import { useTransferFunds } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { AutoTransfer } from './AutoTransfer'
import { History } from './History'
import { Transfer } from './Transfer'
import TransferNotes from './TransferNotes'
import { WalletList } from './WalletList'

const TransferFunds = () => {
	const { t } = useTranslation()
	const { loading, isTransferLoading } = useTransferFunds()
	// * 手機版的動畫與桌機版不同，不需將 loading 邏輯分開
	if (loading || isTransferLoading) return <Loading />

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{
							href: paths.transferFunds.root,
							label: t('Label_General_Transfer'),
						},
						{
							href: paths.transferHistory.root,
							label: t('Label_General_TransferHistory'),
						},
					]}
				/>
			</Header>
			<main className='main'>
				<AutoTransfer />
				<WalletList />
				<Transfer />
				<History />
				<TransferNotes />
			</main>
		</>
	)
}

export default TransferFunds
