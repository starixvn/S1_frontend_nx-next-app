import { Loading } from '@nx-next-app/components/D0001'
import { WrapperWithdrawl } from '@nx-next-app/features/F0001/desktop/withdrawal/styles'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { KycStatusEnum } from '@nx-next-app/features/F0001/types'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import LeftMenu from '../leftMenu'
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
			<div className='wrapper-profile'>
				<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
				{loading ? (
					<Loading />
				) : (
					<WrapperWithdrawl>
						<div className='rightModule'>
							<div className='infoModule'>
								<div className='inside-title'>
									<div className='group-icon-title'>
										<i className='icon icon-money-send' />
										{t('Label_General_Withdrawal')}
									</div>
									<div className='btnGroup'>
										<button
											onClick={restoreAll}
											className='btn-secondary custom-btn-title'
										>
											<i className='icon icon-redo' />
											<span>{t('Label_Withdrawal_RestoreAll')}</span>
										</button>
									</div>
								</div>
								<div className='inside-body'>
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
							</div>
							<RecentHistory />
						</div>
					</WrapperWithdrawl>
				)}
			</div>
		</main>
	)
}

export default index
