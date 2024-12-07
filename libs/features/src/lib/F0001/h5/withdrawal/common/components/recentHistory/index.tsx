import { paths } from '@nx-next-app/constants'
import { WrapperInfoList } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import { NoData } from '@nx-next-app/features/F0001/h5/deposit/common/NoData'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useToggle } from 'usehooks-ts'

import { HistoryItem } from './HistoryItem'

const RecentHistory = () => {
	const [isOpen, toggleOpen] = useToggle(false)
	const { t } = useTranslation()
	const { withdrawalRecentInfo } = useWithdrawal()

	return (
		<>
			<div className='btnGroup'>
				<button className='recentBtn btn-primary' onClick={toggleOpen}>
					{t('Label_Withdrawal_RecentTransactions')}
					<i
						className={classNames('icon icon-keyboard_arrow_down', {
							active: isOpen,
						})}
					/>
				</button>
			</div>
			<WrapperInfoList>
				<div className={classNames('recent', { active: isOpen })}>
					{withdrawalRecentInfo.length > 0 ? (
						<>
							<div className='infoList'>
								{withdrawalRecentInfo.map(item => (
									<HistoryItem item={item} />
								))}
							</div>
							<div className='btnGroup'>
								<Link href={paths.withdrawalHistory.root}>
									<a className='btn-primary recentBtn'>
										{t('Label_Withdrawal_AllTransactions')}
									</a>
								</Link>
							</div>
						</>
					) : (
						<NoData />
					)}
				</div>
			</WrapperInfoList>
		</>
	)
}

export { RecentHistory }
