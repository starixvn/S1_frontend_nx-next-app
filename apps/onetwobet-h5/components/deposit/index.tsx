import { Header } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useCheckUserInfo } from '@nx-next-app/operations'
import { useGetMainWalletInfoQuery } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import DepositAutoRemember from './DepositAutoRemember'
import DepositImportant from './DepositImportant'
import DepositRecentHistory from './DepositRecentHistory'
import DepositForm from './depositForm'

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const Deposit = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
		auth: { isLogin },
	} = useAuth()
	const { modal } = useGlobalModal()
	const { checkUserInfo } = useCheckUserInfo()

	const { data: { data: mainWalletInfo } = {} } = useGetMainWalletInfoQuery(
		null,
		{ skip: !isLogin }
	)

	const balanceText = `${currencyName} $${numberFormat(
		mainWalletInfo?.balance || 0,
		currencyId
	)}`

	useEffect(() => {
		checkUserInfo({
			onInfoRequired: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
	}, [])

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.deposit.root, label: t('Label_General_Deposit') },
						{
							href: paths.depositHistory.root,
							label: t('Label_General_DepositHistory'),
						},
					]}
				/>
			</Header>
			<main className='main deposit'>
				<div className='mainWallet'>
					<div className='account'>
						<div className='icon icon-icon32px_wallet'>
							{t('Label_General_Balance')}
						</div>
						<div>{balanceText}</div>
					</div>
				</div>

				<DepositAutoRemember />

				<DepositForm />

				<DepositRecentHistory />

				<DepositImportant />
			</main>
		</>
	)
}

export default Deposit
