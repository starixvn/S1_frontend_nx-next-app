import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useGetMainWalletInfoQuery } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import DepositAutoRemember from './DepositAutoRemember'
import DepositImportant from './DepositImportant'
import DepositForm from './depositForm'
import DepositRecentHistory from './DepositRecentHistory'

const Deposit = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
	} = useAuth()

	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()
	const { data: { data: mainWalletInfo } = {} } = useGetMainWalletInfoQuery(
		null,
		{ skip: !isLogin }
	)

	const balanceText = `${currencyName} $${numberFormat(
		mainWalletInfo?.balance || 0,
		currencyId
	)}`

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
