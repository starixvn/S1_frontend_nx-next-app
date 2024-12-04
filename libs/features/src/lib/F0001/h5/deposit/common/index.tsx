import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperDepositH5 } from '@nx-next-app/features/F0001/h5/deposit/styles'
import { useGetMainWalletInfoQuery } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import DepositAutoRemember from './DepositAutoRemember'
import DepositImportant from './DepositImportant'
import DepositRecentHistory from './DepositRecentHistory'
import DepositForm from './depositForm'

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
			<WrapperDepositH5>
				<main className='main deposit'>
					<div className='mainWallet'>
						<div className='account inputBox-blue'>
							<div className='group-icon'>
								<i className='icon icon-empty-wallet' />
								{t('Label_General_Balance')}
							</div>

							<div className='money'>{balanceText}</div>
						</div>
					</div>

					<DepositAutoRemember />

					<DepositForm />

					<DepositRecentHistory />

					<DepositImportant />
				</main>
			</WrapperDepositH5>
		</>
	)
}

export default Deposit
