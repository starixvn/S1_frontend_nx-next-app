import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useDepositContext } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { Loading } from '@nx-next-app/components/D0001'
import LeftMenu from '@nx-next-app/features/F0001/desktop/leftMenu'
import DepositImportant from './DepositImportant'
import DepositRecentHistory from './DepositRecentHistory'
import DepositForm from './depositForm'

const Deposit = () => {
	const { loading } = useDepositContext()
	const { t } = useTranslation()

	if (loading) return <Loading />

	return (
		<main>
			<section className='inside'>
				<LeftMenu />
				<div className='rightModule'>
					<div className='infoModule'>
						<div className='inside-title'>
							<span className='icon icon-icon32px_deposit'>
								{t('Label_General_Deposit')}
							</span>
							<div>{t('Label_Deposit_SubTitle')}</div>
							<Link href={paths.referral.root} passHref>
								<a className='icon icon-friend'>
									<span>{t('Label_Deposit_ReferFriendsRewards')}</span>
								</a>
							</Link>
						</div>

						<DepositForm />
						<DepositImportant />
					</div>
					<DepositRecentHistory />
				</div>
			</section>
		</main>
	)
}

export default Deposit
