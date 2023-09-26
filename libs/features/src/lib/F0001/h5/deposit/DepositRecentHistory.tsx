import DepositItem from '@nx-next-app/features/F0001/h5/history/historyItems/DepositItem'
import { useDepositRecentHistory } from '@nx-next-app/data-access'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'

const DepositRecentHistory = () => {
	const { t } = useTranslation()
	const { value: isActive, toggle } = useBoolean()
	const { push } = useRouter()
	const { depositInfoRecentList } = useDepositRecentHistory()

	return (
		<>
			<div className='btn-group'>
				<button className='recentBtn' onClick={toggle}>
					{t('Label_General_RecentTransactions')}
					<i
						className={classNames('icon icon-keyboard_arrow_down', {
							active: isActive,
						})}
					/>
				</button>
			</div>

			<div
				className={classNames('recent', {
					active: isActive,
				})}
			>
				<div className='infoList'>
					{depositInfoRecentList.map(item => (
						<DepositItem key={item.transId} {...item} />
					))}
				</div>

				<div className='btn-group'>
					<a
						className='orange recentBtn'
						onClick={() => push(paths.depositHistory.root)}
					>
						All Transactions
					</a>
				</div>
			</div>
		</>
	)
}

export default DepositRecentHistory
