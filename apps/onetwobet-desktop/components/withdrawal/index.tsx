import { Loading } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useCheckUserInfo, useWithdrawal } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { CurrenciesEnum, KycStatusEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LeftMenu from '../leftMenu'
import { ImportNotice } from './common/ImportNotice'
import { KycPanel } from './common/KycPanel'
import { WalletInfo } from './common/WalletInfo'
import { RecentHistory } from './common/history/RecentHistory'
import { WalletPanel } from './common/walletPanel'

interface IWithdrawalProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const index = ({ withdrawalBlockSetting }: IWithdrawalProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { userInfo } = useAuth()
	const { currencyId } = userInfo
	const { push } = useRouter()
	const { restoreAll, loading, kycStatus, checkKyc } = useWithdrawal()
	const { checkUserInfo } = useCheckUserInfo()

	useEffect(() => {
		checkUserInfo({
			onInfoRequired: () =>
				modal.open(<UpdateProfileModal prevPage={paths.withdrawal.root} />),
			optionalPhoneVerifiedCallback: () => {
				// INR 才回傳 PhoneVerifiedCallback
				if (currencyId === CurrenciesEnum.INR) {
					return () =>
						modal.confirm(t('Label_Withdrawal_PhoneVerificationHint'), {
							title: t('Label_General_Withdrawal'),
							icon: 'icon icon-icon32px_Profile',
							okText: t('Label_Profile_VertifyNow'),
							cancelText: t('Label_Profile_Later'),
							onOK: () => push(paths.profile.root),
						})
				}
				return undefined
			},
		})
		checkKyc()
	}, [])

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
