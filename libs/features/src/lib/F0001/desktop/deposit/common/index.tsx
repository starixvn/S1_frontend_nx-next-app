import { Loading } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { useDepositContext } from '@nx-next-app/data-access'
import { WrapperDeposit } from '@nx-next-app/features/F0001/desktop/deposit/styles'
import LeftMenu from '@nx-next-app/features/F0001/desktop/leftMenu'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import DepositImportant from './DepositImportant'
import DepositRecentHistory from './DepositRecentHistory'
import DepositForm from './depositForm'

interface IDepositProps {
	options: {
		// * 是否顯示 referral 按鈕
		showReferralButton: boolean
	}
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const Deposit = ({ options, withdrawalBlockSetting }: IDepositProps) => {
	const { t } = useTranslation()
	const { loading } = useDepositContext()
	const { showReferralButton } = options

	return (
		<main>
			<div className='wrapper-profile'>
				<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
				{loading ? (
					<Loading />
				) : (
					<WrapperDeposit>
						<div className='rightModule'>
							<div className='infoModule'>
								<div className='inside-title'>
									<div className='group-icon-title'>
										<i className='icon icon-bank-fill' />
										{t('Label_General_Deposit')}
									</div>
									<div className='btnGroup'>
										{showReferralButton && (
											<Link href={paths.referral.root} passHref>
												<a className='btn-secondary'>
													<i className='icon icon-service-fill' />
													<span
														style={{
															marginLeft: '.4rem',
															textTransform: 'capitalize',
														}}
													>
														{t('Label_Deposit_ReferFriendsRewards')}
													</span>
												</a>
											</Link>
										)}
									</div>
								</div>
								<div className='inside-body'>
									<DepositForm />
									<DepositImportant />
									<DepositRecentHistory />
								</div>
							</div>
						</div>
					</WrapperDeposit>
				)}
			</div>
		</main>
	)
}

export default Deposit
