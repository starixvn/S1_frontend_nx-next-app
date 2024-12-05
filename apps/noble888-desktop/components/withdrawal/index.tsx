import { LeftMenu } from '@apps/noble888-desktop/components/index'
import { Loading } from '@nx-next-app/components/D0001'
import { KycStatusEnum, useWithdrawal } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { ImportNotice } from './common/ImportNotice'
import { KycPanel } from './common/KycPanel'
import { WalletInfo } from './common/WalletInfo'
import { RecentHistory } from './common/history/RecentHistory'
import { WalletPanel } from './common/walletPanel'

interface IWithdrawalProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const index = ({ withdrawalBlockSetting }: IWithdrawalProps) => {
	const { t } = useTranslation()
	const { restoreAll, loading, kycStatus } = useWithdrawal()

	return (
		<main>
			<section className='inside'>
				<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
				{loading ? (
					<Loading />
				) : (
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
				)}
			</section>
		</main>
	)
}

export default index
