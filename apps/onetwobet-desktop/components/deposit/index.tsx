import { Loading } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useCheckUserInfo, useDepositContext } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect } from 'react'
import LeftMenu from '../leftMenu'
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

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const Deposit = ({ options, withdrawalBlockSetting }: IDepositProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const { loading } = useDepositContext()
	const { checkUserInfo } = useCheckUserInfo()

	const { showReferralButton } = options

	useEffect(() => {
		checkUserInfo({
			onInfoRequired: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
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
								<span className='icon icon-icon32px_deposit'>
									{t('Label_General_Deposit')}
								</span>
								<div>{t('Label_Deposit_SubTitle')}</div>

								{showReferralButton && (
									<Link href={paths.referral.root} passHref>
										<a className='icon icon-friend'>
											<span>{t('Label_Deposit_ReferFriendsRewards')}</span>
										</a>
									</Link>
								)}
							</div>

							<DepositForm />
							<DepositImportant />
						</div>
						<DepositRecentHistory />
					</div>
				)}
			</section>
		</main>
	)
}

export default Deposit
