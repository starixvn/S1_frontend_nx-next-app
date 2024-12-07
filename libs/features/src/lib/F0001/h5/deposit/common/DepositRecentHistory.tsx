import { paths } from '@nx-next-app/constants'
import { useDepositRecentHistory } from '@nx-next-app/data-access'
import { WrapperInfoList } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import DepositItem from '@nx-next-app/features/F0001/h5/history/historyItems/DepositItem'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'

const DepositRecentHistory = () => {
	const { t } = useTranslation()
	const { value: isActive, toggle } = useBoolean()
	const { push } = useRouter()
	const { depositInfoRecentList } = useDepositRecentHistory()

	return (
		<WrapperInfoList>
			<div className='btnGroup'>
				<button className='btn-primary btn-recent-history' onClick={toggle}>
					{t('Label_General_RecentTransactions')}
					<i
						className={classNames('icon', {
							'icon-chevron_down': !isActive,
							'icon-chevron_up': isActive,
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

				<div className='btnGroup recentBtn' style={{ marginBottom: '1.6rem' }}>
					<a
						className='btn-secondary'
						onClick={() => push(paths.depositHistory.root)}
					>
						<i
							className='icon icon-book-read-fill'
							style={{ marginRight: '1vw' }}
						/>
						{t('Label_General_AllTranscations')}
					</a>
				</div>
			</div>
		</WrapperInfoList>
	)
}

export default DepositRecentHistory
