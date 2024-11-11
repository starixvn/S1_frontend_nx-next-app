import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/operations'
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
			<div className='btn-group'>
				<button className='recentBtn' onClick={toggleOpen}>
					{t('Label_Withdrawal_RecentTransactions')}
					<i
						className={classNames('icon icon-keyboard_arrow_down', {
							active: isOpen,
						})}
					/>
				</button>
			</div>
			<div className={classNames('recent', { active: isOpen })}>
				{withdrawalRecentInfo.length > 0 ? (
					<>
						<div className='infoList'>
							{withdrawalRecentInfo.map(item => (
								<HistoryItem item={item} />
							))}
						</div>
						<div className='btn-group'>
							<Link href={paths.withdrawalHistory.root}>
								<a className='secondary recentBtn'>
									{t('Label_Withdrawal_AllTransactions')}
								</a>
							</Link>
						</div>
					</>
				) : (
					<div className='nodata icon icon-nodata'>
						<div className='txt-white'>{t('Label_General_NoData')}</div>
					</div>
				)}
			</div>
		</>
	)
}

export { RecentHistory }
