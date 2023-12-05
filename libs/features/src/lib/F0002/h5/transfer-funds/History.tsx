import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { numFormatToDigits, transferDirection } from '@nx-next-app/utils'
import { paths, TranferHistoryStatusEnum } from '@nx-next-app/constants'
import { useTransferFunds } from '@nx-next-app/features/F0002/providers'
import TransferItem from '../history/historyItems/TransferItem'

const History = () => {
	const { t } = useTranslation()

	const [showHistory, setShowHistory] = useState<boolean>(false)

	const { timezone, transferHistory, getConvertedTime } = useTransferFunds()

	return (
		<>
			<div className='btn-group'>
				<button
					type='button'
					className='recentBtn'
					onClick={() => {
						setShowHistory(!showHistory)
					}}
				>
					{t('Label_General_RecentTransactions')}
					<i
						className={classNames('icon icon-keyboard_arrow_down', {
							active: showHistory,
						})}
					/>
				</button>
			</div>
			<div className={classNames('recent', { active: showHistory })}>
				{transferHistory.map(
					({
						memo,
						amount,
						tpName,
						status,
						transId,
						direction,
						createTime,
						isAdjustment,
					}) => {
						const statusText =
							status === TranferHistoryStatusEnum.success
								? t('Label_General_Success')
								: t('Label_General_Fail')

						const { startWallet, endWallet } = transferDirection({
							tpName,
							direction,
							isAdjustment,
							displayMainWallet: t('Label_History_MainWallet'),
							displayAdjustment: t('Label_History_Adjustment'),
						})

						return (
							<div className='infoList' key={transId}>
								<div className='info transfer'>
									<ul>
										<li>
											<span className='title'>{`${t(
												'Label_History_Date'
											)} (${timezone})`}</span>
											<span>
												{getConvertedTime(createTime).format('DD/MM/YYYY')}
											</span>
										</li>
										<li>
											<span className='title'>
												{t('Label_General_Time')} ({timezone})
											</span>
											<span>
												{getConvertedTime(createTime).format('hh:mm:ss A')}
											</span>
										</li>
										<li>
											<span className='title'>ID</span>
											<span>{transId}</span>
										</li>
										<li>
											<span className='title'>{t('Label_History_Status')}</span>
											<span>{statusText}</span>
										</li>
										<li>
											<span className='title'>{t('Label_History_Amount')}</span>
											<span>{numFormatToDigits(amount)}</span>
										</li>
										<li>
											<span className='title'>
												{t('Label_History_Direction')}
											</span>
											<span>
												<span>{startWallet}</span>
												<i className='icon icon-keyboard_arrow_right1' />
												<span>{endWallet}</span>
											</span>
										</li>
										<li>
											<span className='title'>{t('Label_History_Memo')}</span>
											<span>{memo}</span>
										</li>
									</ul>
								</div>
							</div>
						)
					}
				)}

				<div className='infoList'>
					{transferHistory.map(item => (
						<TransferItem {...item} />
					))}
				</div>

				<div className='btn-group'>
					<Link href={paths.transferHistory.root} passHref>
						<a className='orange recentBtn'>
							{t('Label_General_AllTranscations')}
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export { History }
