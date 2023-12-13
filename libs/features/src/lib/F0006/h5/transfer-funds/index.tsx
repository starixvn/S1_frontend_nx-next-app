import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { Header, Loading } from '@nx-next-app/components/H0006'
import { History } from './History'
import { Transfer } from './Transfer'
import { WalletList } from './WalletList'
import { AutoTransfer } from './AutoTransfer'
import { useTransferFunds } from '../../providers'

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
			</main>
		</>
	)
}

export default TransferFunds
