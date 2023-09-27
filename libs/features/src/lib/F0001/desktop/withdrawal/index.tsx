import { useTranslation } from 'next-i18next'
import { Loading } from '@nx-next-app/components/D0001'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { KycStatusEnum } from '@nx-next-app/features/F0001/types'
import { ImportNotice } from './ImportNotice'
import { WalletInfo } from './WalletInfo'
import LeftMenu from '../leftMenu'
import { RecentHistory } from './history/RecentHistory'
import { WalletPanel } from './walletPanel'
import { KycPanel } from './KycPanel'

const index = () => {
	const { t } = useTranslation()
	const { restoreAll, loading, kycStatus } = useWithdrawal()

	if (loading) return <Loading />

	return (
		<main>
			<section className='inside'>
				<LeftMenu />
				<div className='rightModule'>
					<div className='infoModule'>
						<div className='inside-title'>
							<span className='icon icon-icon32px_Withdraw'>
								{t('Label_General_Withdrawal')}
							</span>
							<button onClick={restoreAll} className='icon icon-history'>
								<span>{t('Label_Withdrawal_RestoreAll')}</span>
							</button>
						</div>
						{kycStatus !== KycStatusEnum.Normal ? (
							<KycPanel />
						) : (
							<>
								<div className='infoModuleLeft'>
									<WalletInfo />
									<WalletPanel />
								</div>
								<ImportNotice />
							</>
						)}
					</div>
					<RecentHistory />
				</div>
			</section>
		</main>
	)
}

export default index
